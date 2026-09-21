# Logger and PII sanitizer

Shared logging helpers for MFE / integration apps. This directory owns logger
creation, live PII sanitization, and metadata policies used when trusted
BrowserLogger entries are replayed during log export.

## Architecture

There are two sanitization boundaries:

1. **Live collection.** `PiiLoggerMiddlewares` sanitizes logger parameters and
   free text before storing entries in `recent.log` or history. This is the hot
   path and must remain cheap.
2. **ZIP export.** `sanitizeLogZip` sanitizes the completed archive immediately
   before download or CPR submission. Host BrowserLogger entries receive a
   structured policy replay; other supported text is scanned as free text;
   nested ZIPs are processed recursively.

The shared sanitizer is deterministic. It does not replace the Elastic NER
design described by the [source PII requirement](https://wiki_domain/spaces/~jeba.thanaraj/pages/849170605/PII+Identification+and+Redaction+-+Implementation+Reference),
and it does not attempt to identify arbitrary names or addresses in prose.

### Files

| File | Role |
| --- | --- |
| `logger.ts` | Logger factory, SharedWorker transport helpers, and default middleware setup |
| `PiiLoggerMiddlewares.ts` | Live sanitization and serialization boundary |
| `piiSanitizer.ts` | Structured-value and free-text sanitization |
| `logSanitizationPolicy.ts` | Registered path-scoped metadata policies for trusted replay |

ZIP sanitization lives in
`apps/micro-core/src/app/services/BrowserLogger/sanitizeLogZip.ts` and is used
by BrowserLogger download and CPR client-log packaging. Focused sanitizer tests
are in `ringcentral-js-widgets/core/test/features/piiSanitizer.test.tsx`.

## Sanitization contract

Every scalar receives one of three treatments:

| Treatment | Use | Output |
| --- | --- | --- |
| Preserve | Non-PII and approved operational values | Original value |
| Correlatable redaction | IDs, phones, emails, usernames, tokens, authorization codes, JWTs, and network addresses | Safe preview where useful plus an exact-value equality reference |
| Fully hidden | Passwords, credentials, cookies, client/API secrets, SSNs, valid cards, and addresses | `[Secret:v2]` or `[Restricted:v2]`, with no preview or reference |

Equality references are generated synchronously with a per-installation HMAC
key. The exact logged string is hashed; values are not normalized first.
References are stable within a browser profile and app origin, but are not
intended to match across devices.

Structured sanitization is shape-preserving:

- Objects, arrays, keys, nesting, array positions, and safe schema values stay
  intact.
- A sensitive parent key never collapses its object or array. Secret scopes
  recurse while fully hiding scalar descendants.
- PII container arrays such as `phoneNumbers` recurse field by field, so phone
  values are redacted without hiding readable operational fields such as
  `phoneType` and `usageType`.
- Generic `id` values are redacted only in a known PII context. Request, trace,
  and correlation IDs remain readable.
- PII-bearing keys are renamed with v2 markers after policy classification;
  collisions receive deterministic suffixes rather than overwriting data.
- Registered metadata policies preserve diagnostic schemas such as Salesforce
  configuration labels while still sanitizing runtime values.

Structured request/response bodies support JSON and URL-encoded forms. Bounded
multipart bodies are parsed part by part, including field names and headers;
large or binary bodies become `[Binary:v2]`. Secret query values are hidden,
while only bounded pagination values and explicit safe enums are preserved.

## ZIP export

`sanitizeLogZip` walks the final archive after optional attachments and nested
archives have been merged.

| Entry | Treatment |
| --- | --- |
| Trusted `recent.log` and direct `history/*.log` | Parse ` MSG: ` JSON and replay structured policies |
| Allowlisted text | Run deterministic free-text sanitization |
| Nested `.zip` | Sanitize recursively without trusted policy, up to depth 3 |
| Opaque or unsupported content | Retain bytes, sanitize the path, and disclose it in the manifest |

Archive paths use Windows-safe `__PII_V2_<TYPE>[_<REF>]__` markers rather than
content markers. Processing is sequential with event-loop yields. Corrupt,
encrypted, or too-deep nested archives are retained under an
`*.unsanitized-<reason>.zip` name and recorded as failures. The root archive
contains `pii-sanitization-manifest.json` with policy status, file counts,
match counts, duration, opaque entries, and failures. It also contains a brief
`pii-v2-AGENTS.md` marker guide; nested archives do not receive that guide.

## Decisions

- Emit v2 markers only. Preserve only canonical, class-valid markers; malformed
  marker-shaped text is scanned normally.
- Keep object shape and diagnostic context even under sensitive-looking parent
  keys.
- Use exact-value, per-installation references. Do not defer hashing to export
  or retain raw PII for later correlation.
- Preserve punctuation and useful formatting in phone, email, and identifier
  previews. Do not expose full email domains, card last-four digits, or network
  address portions.
- Keep registered metadata exemptions narrow and app-owned through normal code
  review.
- Retain customer-selected opaque attachments rather than silently dropping
  them; the manifest makes their unsanitized status explicit.
- ZIP is the supported archive format. Use sequential processing, the existing
  aggregate attachment check, and a depth cap of 3; do not add a general archive
  policy system without evidence that these limits are insufficient.
- Keep DEFLATE level 9 until measured data shows compression is a bottleneck.
- Sentry uses the shared sanitizer but demotes correlatable v2 markers to
  `[Secret:v2]` before upload; Sentry is not an equality-correlation channel.

## Known limitations and residual risks

- Deterministic client rules do not reliably detect arbitrary names or postal
  addresses in free-form prose. This is accepted for manually submitted support
  input; structured application data remains the primary target.
- Opaque files cannot be inspected and remain byte-for-byte unchanged. Their
  presence is disclosed, but their contents may contain PII.
- Corrupt, encrypted, or over-depth nested ZIPs are retained unsanitized so the
  customer attachment is not silently lost.
- Equality references are installation-local. Cross-device correlation depends
  on approved previews and authorized customer/server data.
- Logs produced in a SharedWorker before the first window connection may use an
  ephemeral reference key. No raw-PII buffer is retained to repair those logs.
- ZIP rewriting is an in-browser, in-memory operation. A representative large
  archive benchmark is still needed before promising a tighter performance
  limit.

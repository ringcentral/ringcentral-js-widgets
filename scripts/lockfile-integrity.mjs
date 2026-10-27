#!/usr/bin/env node
/**
 * Keep package-lock.json installable from both internal registries and public
 * npm.
 *
 * - Every `resolved` URL must point at public npm, never an internal registry.
 * - Some packages (e.g. @ringcentral/spring-ui) are published internally as a
 *   different build under the same version as on public npm, so the tarball
 *   integrity differs. An SRI string may hold several hashes and npm accepts a
 *   tarball matching any of them, so `@ringcentral/*` entries store both.
 *
 * Usage:
 *   node scripts/lockfile-integrity.mjs fix    # rewrite URLs, add missing hashes
 *   node scripts/lockfile-integrity.mjs check  # fail if either is wrong
 *   node scripts/lockfile-integrity.mjs urls [--staged]
 *     # offline: fail if a `resolved` URL isn't public npm; --staged checks the
 *     # version staged in git, as the husky pre-commit hook does
 *
 * Env:
 *   PUBLIC_REGISTRY  public npm registry (or a pure mirror of it), defaults to
 *                    https://registry.npmjs.org/
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCOPE_PATTERN = /^@ringcentral\//;
const LOCKFILE_REGISTRY = 'https://registry.npmjs.org/';
// <registry>/<name>/-/<file>.tgz, where name may be scoped
const TARBALL_PATTERN = /^https?:\/\/.+?\/((?:@[^/]+\/)?[^/@]+\/-\/[^/]+\.tgz)$/;
const LOCKFILE = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../package-lock.json',
);

const withSlash = (url) => (url.endsWith('/') ? url : `${url}/`);

const PUBLIC_REGISTRY = withSlash(
  process.env.PUBLIC_REGISTRY || 'https://registry.npmjs.org/',
);

function getConfiguredRegistry() {
  try {
    return withSlash(execSync('npm config get registry').toString().trim());
  } catch {
    return PUBLIC_REGISTRY;
  }
}

async function getIntegrity(registry, name, version) {
  const url = `${registry}${name.replace('/', '%2f')}/${version}`;
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GET ${url} failed with ${res.status}`);
  }
  const manifest = await res.json();
  return manifest.dist?.integrity ?? null;
}

function getEntries(lock) {
  const entries = [];
  for (const [key, entry] of Object.entries(lock.packages)) {
    if (!key.includes('node_modules/') || entry.link || !entry.version) continue;
    // `name` is only set for aliases (`npm:pkg@x`), which point at the real package
    const name = entry.name ?? key.split('node_modules/').pop();
    if (!SCOPE_PATTERN.test(name)) continue;
    entries.push({ key, name, entry });
  }
  return entries;
}

function readLockfile(staged) {
  const text = staged
    ? execSync('git show :package-lock.json', { maxBuffer: 1024 ** 3 }).toString()
    : fs.readFileSync(LOCKFILE, 'utf8');
  return JSON.parse(text);
}

function checkUrls(staged) {
  const lock = readLockfile(staged);
  const errors = [];
  for (const [key, { resolved }] of Object.entries(lock.packages)) {
    if (/^https?:/.test(resolved ?? '') && !resolved.startsWith(LOCKFILE_REGISTRY)) {
      errors.push(`${key} resolves to ${new URL(resolved).host}, expected ${LOCKFILE_REGISTRY}`);
    }
  }
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    console.error(
      `package-lock.json has ${errors.length} URL(s) outside public npm. ` +
        'Run `npm run lockfile:fix`, then `git add package-lock.json`.',
    );
    process.exit(1);
  }
}

async function main() {
  const mode = process.argv[2];
  if (mode === 'urls') {
    checkUrls(process.argv.includes('--staged'));
    return;
  }
  if (mode !== 'fix' && mode !== 'check') {
    console.error('Usage: lockfile-integrity.mjs <fix|check|urls [--staged]>');
    process.exit(1);
  }
  const registries = [PUBLIC_REGISTRY];
  if (mode === 'fix') {
    const configured = getConfiguredRegistry();
    if (configured !== PUBLIC_REGISTRY) registries.push(configured);
  }

  const lock = JSON.parse(fs.readFileSync(LOCKFILE, 'utf8'));
  const entries = getEntries(lock);
  const cache = new Map();
  const lookup = (registry, name, version) => {
    const id = `${registry} ${name}@${version}`;
    if (!cache.has(id)) cache.set(id, getIntegrity(registry, name, version));
    return cache.get(id);
  };

  const errors = [];
  let changed = 0;
  for (const [key, entry] of Object.entries(lock.packages)) {
    const { resolved } = entry;
    if (!/^https?:/.test(resolved ?? '') || resolved.startsWith(LOCKFILE_REGISTRY)) {
      continue;
    }
    const match = TARBALL_PATTERN.exec(resolved);
    if (mode === 'check' || !match) {
      errors.push(`${key} resolves to ${resolved}, expected ${LOCKFILE_REGISTRY}`);
      continue;
    }
    entry.resolved = LOCKFILE_REGISTRY + match[1];
    changed += 1;
    console.log(`updated ${key} resolved`);
  }

  for (const { key, name, entry } of entries) {
    const id = `${name}@${entry.version}`;
    const [publicHash, ...otherHashes] = await Promise.all(
      registries.map((registry) => lookup(registry, name, entry.version)),
    );
    if (!publicHash) {
      errors.push(`${id} is not published on ${PUBLIC_REGISTRY}`);
      continue;
    }
    const hashes = (entry.integrity ?? '').split(/\s+/).filter(Boolean);
    if (mode === 'check') {
      if (!hashes.includes(publicHash)) {
        errors.push(`${key} is missing the public integrity of ${id}`);
      }
      continue;
    }
    const merged = [...hashes];
    for (const hash of [publicHash, ...otherHashes]) {
      if (hash && !merged.includes(hash)) merged.push(hash);
    }
    if (merged.length !== hashes.length) {
      entry.integrity = merged.join(' ');
      changed += 1;
      console.log(`updated ${key}`);
    }
  }

  if (mode === 'fix' && changed > 0) {
    fs.writeFileSync(LOCKFILE, `${JSON.stringify(lock, null, 2)}\n`);
  }
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    if (mode === 'check') {
      console.error('Run `npm run lockfile:fix` to fix them.');
    }
    process.exit(1);
  }
  console.log(mode === 'fix' ? `${changed} updates` : 'package-lock.json ok');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

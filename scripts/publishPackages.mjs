#!/usr/bin/env node
/**
 * Build and publish npm packages for a release tag.
 *
 *   1.0.0, 1.1.0-rc.0     -> every package in UNIFIED_PACKAGES at that version
 *   i18n@2.4.0            -> one package in INDEPENDENT_PACKAGES; the version
 *                            must equal its package.json version
 *
 * Usage:
 *   node scripts/publishPackages.mjs [tag] [--dry-run] [--only=name,name]
 *
 * The tag defaults to GITHUB_REF_NAME. Prerelease versions are published under
 * the `next` dist-tag. Versions that already exist on npm are skipped, so a
 * failed run can be re-run.
 *
 * Env:
 *   PUBLIC_REGISTRY  registry used to check what is already published and
 *                    that dependencies are installable, defaults to
 *                    https://registry.npmjs.org/
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCOPE = '@ringcentral-integration/';

// In dependency order, so a published package never points at a missing one.
// `dir` is the folder the package's gulp `release` task writes to under release/.
const UNIFIED_PACKAGES = [
  { name: 'utils', dir: 'utils' },
  { name: 'core', dir: 'core' },
  { name: 'i18n-dayjs', dir: 'i18n-dayjs' },
  { name: 'react-hooks', dir: 'react-hooks' },
  { name: 'commons', dir: 'ringcentral-integration' },
  { name: 'widgets', dir: 'ringcentral-widgets' },
  { name: 'next-core', dir: 'next-core' },
  { name: 'next-integration', dir: 'next-integration' },
  { name: 'next-micro', dir: 'next-micro' },
  { name: 'next-widgets', dir: 'next-widgets' },
  { name: 'rjsf-juno', dir: 'rjsf-juno' },
  { name: 'rjsf-spring', dir: 'rjsf-spring' },
  { name: 'micro-core', dir: 'micro-core' },
  { name: 'micro-auth', dir: 'micro-auth' },
  { name: 'micro-contacts', dir: 'micro-contacts' },
  { name: 'micro-coworker', dir: 'micro-coworker' },
  { name: 'micro-meeting', dir: 'micro-meeting' },
  { name: 'micro-message', dir: 'micro-message' },
  { name: 'micro-phone', dir: 'micro-phone' },
  { name: 'micro-setting', dir: 'micro-setting' },
  { name: 'next-builder', dir: 'next-builder' },
];

const INDEPENDENT_PACKAGES = [
  { name: 'i18n', dir: 'i18n', source: 'packages/i18n' },
  { name: 'locale-loader', dir: 'locale-loader', source: 'packages/locale-loader' },
  { name: 'phone-number', dir: 'phone-number', source: 'packages/phone-number' },
];

const withSlash = (url) => (url.endsWith('/') ? url : `${url}/`);
const PUBLISH_REGISTRY = 'https://registry.npmjs.org/';
const PUBLIC_REGISTRY = withSlash(process.env.PUBLIC_REGISTRY || PUBLISH_REGISTRY);

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

function parseArgs(argv) {
  const args = { dryRun: false, only: null, tag: process.env.GITHUB_REF_NAME };
  for (const arg of argv) {
    if (arg === '--dry-run') args.dryRun = true;
    else if (arg.startsWith('--only=')) args.only = arg.slice(7).split(',');
    else args.tag = arg;
  }
  if (!args.tag) throw new Error('No release tag given');
  return args;
}

function resolveRelease(tag) {
  if (/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(tag)) {
    return { version: tag, packages: UNIFIED_PACKAGES };
  }
  const match = /^([a-z0-9-]+)@(\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?)$/.exec(tag);
  const pkg = match && INDEPENDENT_PACKAGES.find(({ name }) => name === match[1]);
  if (!pkg) throw new Error(`Unknown release tag: ${tag}`);
  const sourceVersion = readJson(path.join(ROOT, pkg.source, 'package.json')).version;
  if (sourceVersion !== match[2]) {
    throw new Error(
      `Tag ${tag} does not match ${pkg.source}/package.json version ${sourceVersion}`,
    );
  }
  return { version: match[2], packages: [pkg] };
}

function run(command, args, options = {}) {
  console.log(`$ ${command} ${args.join(' ')}`);
  execFileSync(command, args, { stdio: 'inherit', cwd: ROOT, ...options });
}

async function isPublished(name, version) {
  const res = await fetch(`${PUBLIC_REGISTRY}${name.replace('/', '%2f')}/${version}`);
  if (res.status === 404) return false;
  if (!res.ok) throw new Error(`Checking ${name}@${version} failed with ${res.status}`);
  return true;
}

const resolvable = new Map();
function isResolvable(name, range) {
  const id = `${name}@${range}`;
  if (!resolvable.has(id)) {
    try {
      const out = execFileSync(
        'npm',
        ['view', id, 'version', '--json', `--registry=${PUBLIC_REGISTRY}`],
        { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] },
      ).toString();
      resolvable.set(id, out.trim() !== '');
    } catch {
      resolvable.set(id, false);
    }
  }
  return resolvable.get(id);
}

// Unified packages are always released together, so point them at this
// release (an explicit `^1.0.0` would also reject `1.0.0-rc.0`). Workspace
// ranges ("*", "**") on independent packages resolve to whatever is newest on
// npm, so pin them to the current version; their explicit ranges are kept.
function pinWorkspaceRanges(packageInfo, version) {
  const unified = new Set(UNIFIED_PACKAGES.map(({ name }) => SCOPE + name));
  const independent = new Map(
    INDEPENDENT_PACKAGES.map(({ name, source }) => [
      SCOPE + name,
      readJson(path.join(ROOT, source, 'package.json')).version,
    ]),
  );
  for (const field of ['dependencies', 'peerDependencies']) {
    const deps = packageInfo[field];
    if (!deps) continue;
    for (const [name, range] of Object.entries(deps)) {
      if (unified.has(name)) {
        deps[name] = `^${version}`;
        continue;
      }
      if (!name.startsWith(SCOPE) || !/^(\*+|workspace:.*)?$/.test(range)) continue;
      if (independent.has(name)) deps[name] = `^${independent.get(name)}`;
      else throw new Error(`${packageInfo.name} has unpinned ${field} ${name}@${range}`);
    }
  }
}

// Everything outside this release must already be installable from public npm,
// e.g. an internal-only @ringcentral/* build would break every consumer.
function findUninstallable(packageInfo, releasing) {
  const problems = [];
  for (const field of ['dependencies', 'peerDependencies']) {
    for (const [name, range] of Object.entries(packageInfo[field] ?? {})) {
      if (!/^@ringcentral(-integration)?\//.test(name) || releasing.has(name)) continue;
      if (!isResolvable(name, range)) {
        problems.push(`${packageInfo.name}: ${field} ${name}@${range} is not on ${PUBLIC_REGISTRY}`);
      }
    }
  }
  return problems;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { version, packages: allPackages } = resolveRelease(args.tag);
  const packages = args.only
    ? allPackages.filter(({ name }) => args.only.includes(name))
    : allPackages;
  const distTag = version.includes('-') ? 'next' : 'latest';
  const releasing = new Set(allPackages.map(({ name }) => SCOPE + name));
  console.log(
    `Releasing ${packages.length} package(s) at ${version} (dist-tag ${distTag})${args.dryRun ? ' [dry run]' : ''}`,
  );

  const prepared = [];
  for (const pkg of packages) {
    const fullName = SCOPE + pkg.name;
    if (await isPublished(fullName, version)) {
      console.log(`${fullName}@${version} is already published, skipping`);
      continue;
    }
    run('npm', ['run', 'release', '-w', fullName]);
    const manifestPath = path.join(ROOT, 'release', pkg.dir, 'package.json');
    const packageInfo = readJson(manifestPath);
    if (packageInfo.name !== fullName) {
      throw new Error(`${manifestPath} is for ${packageInfo.name}, expected ${fullName}`);
    }
    packageInfo.version = version;
    pinWorkspaceRanges(packageInfo, version);
    fs.writeFileSync(manifestPath, `${JSON.stringify(packageInfo, null, 2)}\n`);
    prepared.push({ ...pkg, fullName, packageInfo });
  }

  // Check everything before publishing anything, so a bad range can't leave
  // the release half published.
  const problems = prepared.flatMap(({ packageInfo }) =>
    findUninstallable(packageInfo, releasing),
  );
  if (problems.length > 0) {
    throw new Error(`Dependencies not installable from public npm:\n${problems.join('\n')}`);
  }

  for (const { dir, fullName } of prepared) {
    const publishArgs = [
      'publish',
      '--access=public',
      `--tag=${distTag}`,
      `--registry=${PUBLISH_REGISTRY}`,
    ];
    if (args.dryRun) publishArgs.push('--dry-run');
    run('npm', publishArgs, { cwd: path.join(ROOT, 'release', dir) });
    console.log(`${args.dryRun ? 'Checked' : 'Published'} ${fullName}@${version}`);
  }
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});

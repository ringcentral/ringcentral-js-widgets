(() => {
  if (
    !localStorage.getItem('<%= disableRcSharedWorkerKey %>') &&
    window.SharedWorker &&
    !/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  ) {
    // source: https://github.com/ringcentral/ringcentral-mfe/blob/main/packages/shared/src/satisfiesVersion.ts
    const satisfiesVersion = (version, range) => {
      const compareVersions = (v1, v2) => {
        const n1 = validateAndParse(v1);
        const n2 = validateAndParse(v2);
        const p1 = n1.pop();
        const p2 = n2.pop();
        const r = compareSegments(n1, n2);
        if (r !== 0) return r;
        if (p1 && p2) {
          return compareSegments(p1.split('.'), p2.split('.'));
        } else if (p1 || p2) {
          return p1 ? -1 : 1;
        }
        return 0;
      };
      const compare = (v1, v2, operator) => {
        assertValidOperator(operator);
        const res = compareVersions(v1, v2);
        return operatorResMap[operator].includes(res);
      };
      const satisfies = (version, range) => {
        if (range.includes('||')) {
          return range.split('||').some((r) => satisfies(version, r));
        } else if (range.includes(' ')) {
          return range
            .trim()
            .replace(/\s{2,}/g, ' ')
            .split(' ')
            .every((r) => satisfies(version, r));
        }
        const m = range.match(/^([<>=~^]+)/);
        const op = m ? m[1] : '=';
        if (op !== '^' && op !== '~') return compare(version, range, op);
        const [v1, v2, v3, , vp] = validateAndParse(version);
        const [r1, r2, r3, , rp] = validateAndParse(range);
        const v = [v1, v2, v3];
        const r = [
          r1,
          r2 !== null && r2 !== void 0 ? r2 : 'x',
          r3 !== null && r3 !== void 0 ? r3 : 'x',
        ];
        if (rp) {
          if (!vp) return false;
          if (compareSegments(v, r) !== 0) return false;
          if (compareSegments(vp.split('.'), rp.split('.')) === -1)
            return false;
        }
        const nonZero = r.findIndex((v) => v !== '0') + 1;
        const i = op === '~' ? 2 : nonZero > 1 ? nonZero : 1;
        if (compareSegments(v.slice(0, i), r.slice(0, i)) !== 0) return false;
        if (compareSegments(v.slice(i), r.slice(i)) === -1) return false;
        return true;
      };
      const semver =
        /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
      const validateAndParse = (version) => {
        if (typeof version !== 'string') {
          throw new TypeError('Invalid argument expected string');
        }
        const match = version.match(semver);
        if (!match) {
          throw new Error(
            'Invalid argument not valid semver version received:' + version,
          );
        }
        match.shift();
        return match;
      };
      const isWildcard = (s) => s === '*' || s === 'x' || s === 'X';
      const tryParse = (v) => {
        const n = parseInt(v, 10);
        return isNaN(n) ? v : n;
      };
      const forceType = (a, b) =>
        typeof a !== typeof b ? [String(a), String(b)] : [a, b];
      const compareStrings = (a, b) => {
        if (isWildcard(a) || isWildcard(b)) return 0;
        const [ap, bp] = forceType(tryParse(a), tryParse(b));
        if (ap > bp) return 1;
        if (ap < bp) return -1;
        return 0;
      };
      const compareSegments = (a, b) => {
        for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
          const r = compareStrings(a[i] || '0', b[i] || '0');
          if (r !== 0) return r;
        }
        return 0;
      };
      const operatorResMap = {
        '>': [1],
        '>=': [0, 1],
        '=': [0],
        '<=': [-1, 0],
        '<': [-1],
      };
      const allowedOperators = Object.keys(operatorResMap);
      const assertValidOperator = (op) => {
        if (typeof op !== 'string') {
          throw new TypeError(
            'Invalid operator type, expected string but got ' + typeof op,
          );
        }
        if (allowedOperators.indexOf(op) === -1) {
          throw new Error(
            'Invalid operator, expected one of ' + allowedOperators.join('|'),
          );
        }
      };
      return satisfies(version, range);
    };

    const isSatisfied = (options, dependencyVersion) => {
      let matchResult = false;
      try {
        matchResult = options
          ? satisfiesVersion(options.version, dependencyVersion)
          : matchResult;
      } catch (e) {
        //
      }
      const result = !!(
        (options === null || options === void 0 ? void 0 : options.entry) &&
        (dependencyVersion === '*' || matchResult || options.forcedVersion)
      );
      return result;
    };
    // To ensure consistency, it is used for webpage and worker mfe info satisfies version.
    globalThis.__RC_MFE_SATISFY__ = isSatisfied;

    const url = '<%= workerUrl %>';
    const mfeConfig = '<%= mfeConfig %>';
    const _mfeConfig = JSON.parse(mfeConfig || '{}');
    const dependencies = JSON.parse(
      JSON.stringify(_mfeConfig.dependencies) || '{}',
    );
    const getWorkerName = (name) => {
      // prefix from `libs/next-micro/src/onUpdateEntry.ts`
      const storageKey = 'rc-mfe:storage:' + _mfeConfig.name;
      let localMfe = {};
      try {
        localMfe = JSON.parse(localStorage.getItem(storageKey) || '{}');
      } catch (e) {
        console.error('parse local mfe fail', e);
      }
      Object.keys(dependencies).forEach((key) => {
        const dependencyVersion = dependencies[key].dependencyVersion || '*';
        const options = localMfe[key];
        if (options && isSatisfied(options, dependencyVersion)) {
          dependencies[key].entry = options.entry;
          dependencies[key].version = options.entry;
          dependencies[key].forcedVersion = !!options.forcedVersion;
          dependencies[key].meta = options.meta;
        }
      });
      console.log('rc worker mfe:', dependencies);
      const depsString = btoa(JSON.stringify(dependencies));
      return name + '#' + depsString;
    };
    const name = getWorkerName('<%= chunkName %>');
    const worker = new SharedWorker(
      url,
      dependencies
        ? {
            name,
          }
        : {},
    );
    window['<%= nameSpace %>'] = {
      // !!! don't use js string template, it will be replaced by webpack script
      url: dependencies ? url + '?' + name : url,
      worker,
    };

    worker.addEventListener('error', (event) => {
      // eslint-disable-next-line no-console
      console.error('load <%= nameSpace %> worker fail', event);

      if (window.workerScriptsFail && window.workerScriptsFail.renderLoadFail) {
        window.workerScriptsFail.renderLoadFail();
      }
    });
  }
})();

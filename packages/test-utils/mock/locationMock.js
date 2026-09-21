const originalLocationImplRef = { current: null };

function cloneUrlRecord(urlRecord) {
  if (!urlRecord) {
    return urlRecord;
  }

  return {
    ...urlRecord,
    path: Array.isArray(urlRecord.path) ? [...urlRecord.path] : urlRecord.path,
  };
}

function getLocationImpl() {
  const implSymbol = Object.getOwnPropertySymbols(window.location).find(
    (symbol) => symbol.description === 'impl',
  );

  return implSymbol ? window.location[implSymbol] : null;
}

function hasUsableLocationImpl(impl) {
  return !!(impl && impl._relevantDocument && impl._relevantDocument._URL);
}

function createUrlRecord(url, baseHref) {
  const resolved = new URL(url, baseHref);
  const scheme = resolved.protocol.replace(/:$/, '');
  const host =
    resolved.hostname === '' && scheme === 'about' ? null : resolved.hostname;

  return {
    scheme,
    username: resolved.username,
    password: resolved.password,
    host,
    port: resolved.port ? Number(resolved.port) : null,
    path:
      scheme === 'about'
        ? resolved.pathname.replace(/^\//, '')
        : resolved.pathname === '/'
        ? ['']
        : resolved.pathname.split('/').slice(1),
    query: resolved.search ? resolved.search.slice(1) : null,
    fragment: resolved.hash ? resolved.hash.slice(1) : null,
  };
}

function normalizeUrlRecord(url, impl) {
  if (typeof url === 'string') {
    return createUrlRecord(url, impl._relevantDocument.URL);
  }

  if (url && typeof url.href === 'string' && !('path' in url)) {
    return createUrlRecord(url.href, impl._relevantDocument.URL);
  }

  return url;
}

function setDocumentUrl(impl, url) {
  impl._relevantDocument._URL = normalizeUrlRecord(url, impl);
}

function normalizeFallbackUrl(url, baseHref) {
  if (typeof url === 'string') {
    return new URL(url, baseHref).href;
  }

  if (url && typeof url.href === 'string') {
    return new URL(url.href, baseHref).href;
  }

  return baseHref;
}

function mockWindowLocation(href = 'http://localhost/') {
  if (typeof window === 'undefined') {
    throw new Error('window is not available');
  }

  const impl = getLocationImpl();
  if (!hasUsableLocationImpl(impl)) {
    const location = window.location;
    if (!originalLocationImplRef.current) {
      originalLocationImplRef.current = {
        type: 'fallback',
        location,
        href: location.href,
        reload: location.reload,
      };
    }

    const reload = jest.isMockFunction(location.reload)
      ? location.reload
      : jest.fn();

    if (!jest.isMockFunction(location.reload)) {
      location.reload = reload;
    }

    const navigate = jest.fn((url) => {
      location.href = normalizeFallbackUrl(url, location.href);
    });
    const setterNavigate = jest.fn((url) => {
      location.href = normalizeFallbackUrl(url, location.href);
    });

    location.href = href;
    reload.mockClear();
    navigate.mockClear();
    setterNavigate.mockClear();

    return {
      reload,
      navigate,
      setterNavigate,
    };
  }

  if (!originalLocationImplRef.current) {
    originalLocationImplRef.current = {
      type: 'impl',
      impl,
      reload: impl.reload,
      navigate: impl._locationObjectNavigate,
      setterNavigate: impl._locationObjectSetterNavigate,
      documentUrlRecord: cloneUrlRecord(impl._relevantDocument._URL),
    };
  }

  const reload = jest.fn();
  const navigate = jest.fn((url) => {
    setDocumentUrl(impl, url);
  });
  const setterNavigate = jest.fn((url) => {
    setDocumentUrl(impl, url);
  });

  impl.reload = reload;
  impl._locationObjectNavigate = navigate;
  impl._locationObjectSetterNavigate = setterNavigate;

  window.location.href = href;
  navigate.mockClear();
  setterNavigate.mockClear();

  return {
    reload,
    navigate,
    setterNavigate,
  };
}

function restoreWindowLocation() {
  const original = originalLocationImplRef.current;
  if (!original) {
    return;
  }

  if (original.type === 'fallback') {
    original.location.reload = original.reload;
    original.location.href = original.href;
    originalLocationImplRef.current = null;
    return;
  }

  original.impl.reload = original.reload;
  original.impl._locationObjectNavigate = original.navigate;
  original.impl._locationObjectSetterNavigate = original.setterNavigate;
  setDocumentUrl(original.impl, cloneUrlRecord(original.documentUrlRecord));
  originalLocationImplRef.current = null;
}

module.exports = {
  mockWindowLocation,
  restoreWindowLocation,
};

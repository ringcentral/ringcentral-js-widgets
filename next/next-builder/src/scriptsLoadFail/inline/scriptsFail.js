(() => {
  // init workerScriptsFail instance for all scripts related methods
  window.workerScriptsFail = {};
  const DEFAULT_LOCALE = 'en-us';

  function detectBrowserLocale(defaultLocale = DEFAULT_LOCALE) {
    if (typeof navigator !== 'undefined') {
      if (navigator.languages && navigator.languages.length) {
        return navigator.languages[0];
      }
      if (navigator.language) {
        return navigator.language;
      }
    }
    return defaultLocale;
  }

  function getCurrentLocale() {
    const currentLocale = detectBrowserLocale().toLocaleLowerCase();

    // those logic from apps/next-msteams/src/app/lib/getExpectLocale.ts
    // apps/next-msteams/src/app/lib/timezone/locale.ts
    // which can be refactor to reuse same logic when our webpack ready
    if (currentLocale.indexOf('es-') > -1 && currentLocale !== 'es-es') {
      return 'es-419';
    }

    if (currentLocale.indexOf('fr-') > -1 && currentLocale !== 'fr-ca') {
      return 'fr-fr';
    }

    return currentLocale;
  }

  // i18n-replace
  const i18n = {
    'de-de': {
      title: 'Netzwerk nicht verfügbar',
      content:
        'Überprüfen Sie den Netzwerkstatus und aktualisieren Sie die App.',
      refresh: 'Aktualisieren',
    },
    'en-au': {
      title: 'Network unavailable',
      content: 'Please confirm your network status and refresh app.',
      refresh: 'Refresh',
    },
    'en-gb': {
      title: 'Network unavailable',
      content: 'Please confirm your network status and refresh app.',
      refresh: 'Refresh',
    },
    'en-us': {
      title: 'Network unavailable',
      content: 'Please confirm your network status and refresh app.',
      refresh: 'Refresh',
    },
    'es-419': {
      title: 'Red no disponible',
      content: 'Confirme su estado de red y actualice la aplicación.',
      refresh: 'Actualizar',
    },
    'es-es': {
      title: 'Red no disponible',
      content: 'Confirme el estado de su red y actualice la aplicación',
      refresh: 'Actualizar',
    },
    'fi-fi': {
      title: 'Verkko ei ole käytettävissä',
      content: 'Vahvista verkon tila ja päivitä sovellus.',
      refresh: 'Päivitä',
    },
    'fr-ca': {
      title: 'Réseau non disponible',
      content:
        'Veuillez confirmer l’état de votre réseau et actualiser l’application.',
      refresh: 'Actualiser',
    },
    'fr-fr': {
      title: 'Réseau indisponible',
      content:
        'Veuillez vérifier l’état de votre réseau et actualiser l’application.',
      refresh: 'Actualiser',
    },
    'it-it': {
      title: 'Rete non disponibile',
      content: "Conferma lo stato della tua rete e aggiorna l'app.",
      refresh: 'Aggiorna',
    },
    'ja-jp': {
      title: 'ネットワークが利用できません',
      content: 'ネットワークの状態を確認し、アプリを更新してください。',
      refresh: '更新',
    },
    'ko-kr': {
      title: '네트워크를 사용할 수 없음',
      content: '네트워크 상태를 확인하고 앱을 새로 고치세요.',
      refresh: '새로 고침',
    },
    'nl-nl': {
      title: 'Netwerk niet beschikbaar',
      content: 'Controleer de netwerkstatus en vernieuw in de app.',
      refresh: 'Vernieuwen',
    },
    'pt-br': {
      title: 'Rede indisponível',
      content: 'Verifique o status da rede e atualize o aplicativo.',
      refresh: 'Atualizar',
    },
    'pt-pt': {
      title: 'Rede indisponível',
      content: 'Confirme o estado da sua rede e atualize a aplicação.',
      refresh: 'Atualizar',
    },
    'zh-cn': {
      title: '网络不可用',
      content: '请确认网络状态并刷新应用。',
      refresh: '刷新',
    },
    'zh-hk': {
      title: '無法使用網路',
      content: '請確認您的網路狀態並重新整理應用程式。',
      refresh: '重新整理',
    },
    'zh-tw': {
      title: '無法使用網路',
      content: '請確認您的網路狀態並重新整理應用程式。',
      refresh: '重新整理',
    },
  }; // i18n-replace-end

  function renderLoadFail() {
    const root =
      document.querySelector('#app') || document.querySelector('<%= root %>');
    if (!root) {
      // eslint-disable-next-line no-console
      console.log('root not exist, skip renderLoadFail');
      return;
    }

    const browserLocale = getCurrentLocale();
    // eslint-disable-next-line no-console
    console.log('Render script load fail, user browser locale', browserLocale);

    const i18nString = i18n[browserLocale] || i18n[DEFAULT_LOCALE];
    const reloadBlock = document.createElement('div');
    reloadBlock.className = 'reload';

    const title = document.createElement('h2');
    title.textContent = i18nString.title;

    const description = document.createElement('span');
    description.textContent = i18nString.content;

    const button = document.createElement('button');
    button.classList.add('theme-color');
    button.textContent = i18nString.refresh;
    button.addEventListener('click', () => {
      const workerLoadFail = window.workerScriptsFail.workerLoadFail;
      // this worker reload method be inject by workerScriptsFail client.js
      if (workerLoadFail) {
        workerLoadFail();
      }
      location.reload();
    });

    reloadBlock.appendChild(title);
    reloadBlock.appendChild(description);
    reloadBlock.appendChild(button);

    const styleString = `.reload,body,html{height:100%}body{margin:0}.reload{font-size: 0.85em;display:flex;justify-content:center;align-items:center;flex-direction:column;text-align:center;padding:1em;font-family:lato;box-sizing:border-box}.reload h2{max-width:500px}.reload button{margin-top:2em;padding:1em 2em;border-radius:8px;background-color:var(--primary-color);color:#fff;border:0;cursor:pointer}.reload button:hover{opacity:.8}`;
    const style = document.createElement('style');

    style.innerHTML = styleString;

    document.head.appendChild(style);
    root.replaceWith(reloadBlock);
  }

  const handleScriptError = async (event) => {
    if (event.type !== 'error') return;

    const target = event.target;
    if (!target || target.nodeName !== 'SCRIPT') return;

    const targetSrc = target.src;
    if (!targetSrc) return;

    const url = new URL(targetSrc);
    const sameOrigin = location.origin === url.origin;

    if (!sameOrigin) return;
    const ignoreRule = '<%= ignoreRule %>';
    if (ignoreRule && new RegExp(ignoreRule).test(targetSrc)) return;

    renderLoadFail();
  };

  window.addEventListener('error', handleScriptError, true);
  window.workerScriptsFail.renderLoadFail = renderLoadFail;
})();

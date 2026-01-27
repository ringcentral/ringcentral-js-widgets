import i18n from './i18n';

// get params from URL
const urlParams = new URLSearchParams(location.search);
const locale = urlParams.get('locale') || i18n.currentLocale;
const viewport = document.querySelector('#viewport')!;

i18n._load(locale).then(() => {
  const title = i18n.getString('title', locale);
  const description = i18n.getString('description', locale);

  const content = /* html */ `
    <h1>${title}</h1>
    <p>${description}</p>
    `;

  viewport.innerHTML = content;
});

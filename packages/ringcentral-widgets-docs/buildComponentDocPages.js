const fs = require('fs');
const path = require('path');
const reactDocs = require('react-docgen');
const ejs = require('ejs');

const componentsDir = path.resolve(__dirname, '../ringcentral-widgets/components');
const componentDocPagesDir = path.resolve(__dirname, 'src/app/pages/Components');
const componentRoutesPath = path.resolve(__dirname, 'src/app/pages/ComponentRoutes.js');
const templatesPath = path.resolve(__dirname, 'src/templates');
const jsonDataPath = path.resolve(__dirname, 'src/app/componentsData.json');

function getComponentsList() {
  const components = [];
  const componentDirNames = fs.readdirSync(componentsDir);
  componentDirNames.forEach((componentName) => {
    try {
      const componentPath = path.resolve(componentsDir, componentName);
      if (!fs.statSync(componentPath).isDirectory()) {
        return;
      }
      const indexPath = path.resolve(componentPath, 'index.js');
      if (!fs.existsSync(indexPath)) {
        return;
      }
      const indexFile = fs.readFileSync(indexPath);
      const componentInfo = reactDocs.parse(indexFile);
      componentInfo.name = componentName;
      components.push(componentInfo);
    } catch (error) {
      console.log(componentName);
      console.log(error);
    }
  });
  return components;
}

function getValueFromPropType(type) {
  if (type.name === 'string') {
    return "'test string'";
  }
  if (type.name === 'bool') {
    return 'false';
  }
  if (type.name === 'func') {
    return '() => null';
  }
  if (type.name === 'node') {
    return '(<span>Node</span>)';
  }
  if (type.name === 'number') {
    return '0';
  }
  if (type.name === 'object') {
    return '{}';
  }
  if (type.name === 'enum') {
    return type.value && type.value[0] && type.value[0].value;
  }
  if (type.name === 'array') {
    return '[]';
  }
  if (type.name === 'custom') {
    return undefined;
  }
  if (type.name === 'shape') {
    const prop = {};
    Object.keys(type.value).forEach((key) => {
      if (!type.value[key].required) {
        return;
      }
      prop[key] = getValueFromPropType(type.value[key]);
    });
    return JSON.stringify(prop, null, 2).replace(/"/g, '').replace(/\\n/g, '\n');
  }
  if (type.name === 'arrayOf') {
    const prop = [];
    const value = getValueFromPropType(type.value);
    if (value) {
      prop.push(value);
    }
    return JSON.stringify(prop, null, 2)
               .replace(/":/g, ':')
               .replace(/\s"/g, ' ')
               .replace(/\\n/g, '\n')
               .replace(/^\[\n\s+/, '[')
               .replace(/\s*\n\]$/, ']')
               .replace(/"]/, ']');
  }
  return undefined;
}

function getPropsFromPropTypes(propTypes) {
  const props = {};
  if (!propTypes) {
    return props;
  }
  Object.keys(propTypes).forEach((propName) => {
    const propType = propTypes[propName];
    if (!propType.required) {
      return;
    }
    props[propName] = getValueFromPropType(propType.type);
  });
  return props;
}

function getComponentDocRenderData(componentData) {
  const component = {};
  component.props = getPropsFromPropTypes(componentData.props);
  let childrenText = 'Children Node';
  if (component.props.onClick) {
    component.props.onClick = "() => alert('clicked')";
    childrenText = 'Click Me';
  }
  if (component.props.children) {
    component.children = `(<span>${childrenText}</span>)`;
    delete component.props.children;
  }
  if (component.props.currentLocale) {
    component.props.currentLocale = "'en-US'";
  }
  if (component.props.countryCode) {
    component.props.countryCode = "'US'";
  }
  if (component.props.areaCode) {
    component.props.areaCode = "'650'";
  }
  component.name = componentData.name;
  component.description = componentData.description;
  return component;
}

function createComponentDocPage(componentData) {
  const name = componentData.name;
  const componentPageDir = path.resolve(componentDocPagesDir, name);
  if (fs.existsSync(componentPageDir)) {
    return;
  }
  fs.mkdirSync(componentPageDir);
  const component = getComponentDocRenderData(componentData);
  const indexTemplatePath = path.resolve(templatesPath, 'ComponentPage/index.ejs');
  const indexTemplate = fs.readFileSync(indexTemplatePath, { encoding: 'utf8' });
  const indexStr = ejs.render(indexTemplate, { component });
  const indexPath = path.resolve(componentPageDir, 'index.js');
  fs.writeFileSync(indexPath, indexStr);
  const demoTemplatePath = path.resolve(templatesPath, 'ComponentPage/Demo.ejs');
  const demoTemplate = fs.readFileSync(demoTemplatePath, { encoding: 'utf8' });
  const demoStr = ejs.render(demoTemplate, { component });
  const demoPath = path.resolve(componentPageDir, 'Demo.js');
  fs.writeFileSync(demoPath, demoStr);
}

function createComponentDocPages(components) {
  components.forEach((componentData) => {
    createComponentDocPage(componentData);
  });
}

function createComponentRoutesFile() {
  const componentPageNames = fs.readdirSync(componentDocPagesDir);
  const components = [];
  componentPageNames.forEach((componentName) => {
    const componentPagePath = path.resolve(componentDocPagesDir, componentName);
    if (!fs.statSync(componentPagePath).isDirectory()) {
      return;
    }
    const indexPath = path.resolve(componentPagePath, 'index.js');
    if (!fs.existsSync(indexPath)) {
      return;
    }
    components.push(componentName);
  });
  const routesTemplatePath = path.resolve(templatesPath, 'ComponentRoutes.ejs');
  const routesTemplate = fs.readFileSync(routesTemplatePath, { encoding: 'utf8' });
  // console.log(routesTemplate);
  const routesPageStr = ejs.render(routesTemplate, { components });
  fs.writeFileSync(componentRoutesPath, routesPageStr);
}

function listRemovedComponents(existedComponents) {
  const componentPageNames = fs.readdirSync(componentDocPagesDir);
  const existedComponentMap = {};
  existedComponents.forEach((component) => {
    existedComponentMap[component.name] = true;
  });
  const removedComponents = [];
  console.log('Component removed:');
  componentPageNames.forEach((componentName) => {
    if (existedComponentMap[componentName]) {
      return;
    }
    removedComponents.push(componentName);
    console.log(componentName);
  });
}

const components = getComponentsList();
fs.writeFileSync(jsonDataPath, JSON.stringify(components, null, 2));
// listRemovedComponents(components);
createComponentDocPages(components);
createComponentRoutesFile();

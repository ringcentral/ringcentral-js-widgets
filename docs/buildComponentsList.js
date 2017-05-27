const fs = require('fs');
const path = require('path');
const reactDocs = require('react-docgen');

const componentsDir = path.resolve(__dirname, '../src/components');


// const filePath = path.resolve(componentsDir, 'Button/index.js');
// const file = fs.readFileSync(filePath);
// const componentInfo = reactDocs.parse(file);

// console.log(JSON.stringify(componentInfo));
const componentDirs = fs.readdirSync(componentsDir);

const components = [];
componentDirs.forEach((componentName) => {
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
    // console.log(indexPath);
    const componentInfo = reactDocs.parse(indexFile);
    componentInfo.name = componentName;
    components.push(componentInfo);
  } catch (error) {
    console.log(componentName);
    console.log(error);
  }
});

const dataPath = path.resolve(__dirname, 'src/app/components.json');

fs.writeFileSync(dataPath, JSON.stringify(components, null, 2));

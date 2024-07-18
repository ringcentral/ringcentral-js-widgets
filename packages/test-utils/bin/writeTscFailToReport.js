const path = require('path');
const fs = require('fs-extra');

function writeTscFailToReport({ name, currentDir, error }) {
  const reportPath = path.resolve(currentDir, 'html-report/jest-report.html');
  const html = `
<!DOCTYPE html>
<html>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
  <meta
    name="viewport"
    content="width=device-width,initial-scale=1,user-scalable=0,minimum-scale=1,maximum-scale=1"
  />
  <title>Report</title>
  <style>
      pre {
        background: black;
        color: white;
        padding: 0.5rem;
        border-radius: 6px;
        white-space: pre-wrap;
      }
  </style>
  <body>
    <h1>${name}</h1>
    <h2 style="color: #1e84bc">Typescript check error</h2>
    <pre contenteditable>${error.stdout}</pre>
    <h3 style="color: #1e84bc">Run in local</h3>
    <pre contenteditable>yarn nx run ${name}:test --ci</pre>
    <h4 style="color: #1e84bc">or use tsc-check to ensure be pass</h4>
    <pre contenteditable>yarn tsc-check</pre>
  </body>
</html>
      `;

  fs.ensureFileSync(reportPath);
  fs.writeFileSync(reportPath, html);

  // eslint-disable-next-line no-console
  console.error(`🛑 tsc-check fail: ${reportPath}`);
}

exports.writeTscFailToReport = writeTscFailToReport;

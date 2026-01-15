/* eslint-disable no-console */
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';

/**
 * inject tailwind style for better debugging
 */
export const compileAndInjectTailwindStyles = async (
  projectRootPath = process.env.EXEC_ROOT_DIR || process.cwd(),
  scssFilePath = process.env.EXEC_GLOBAL_SCSS || './src/main.global.scss',
) => {
  const finalUrl = './node_modules/jest-preview/cli/server/tailwind.css';
  const sassRootPath = path.join(projectRootPath, scssFilePath);
  const tailwindConfigPath = path.join(projectRootPath, './tailwind.config.js');

  if (
    !(await fs.pathExists(sassRootPath)) ||
    !(await fs.pathExists(tailwindConfigPath))
  ) {
    console.log(
      `The file ${sassRootPath} does not exist. Skipping compiling and injecting Tailwind CSS.`,
    );
    return;
  }

  // because we always use that in debug mode, the debugger is later than the jest process, just compile in another process not block current jest process,
  execa.command(
    `node compileTailwindStyle.js ${projectRootPath} ${scssFilePath}`,
    {
      cwd: __dirname,
      stdio: 'inherit',
    },
  );

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = finalUrl;
  document.head.appendChild(link);

  // add some styles to make the jest preview work
  const style = document.createElement('style');
  style.textContent = `
    .sui-modal {
      opacity: 1 !important;
    }
    .sui-popover-popper {
      top: 100px !important;
      left: 200px !important;
      width: fit-content !important;
    }
    .sui-popper-paper {
      opacity: 1 !important;
      transform: scaleY(1) !important;
    }
  `;
  document.head.appendChild(style);
};

/* eslint-disable no-console, prefer-template  */

const msgPath = process.env.GIT_PARAMS;
const chalk = require('chalk');
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

chalk.level = 1;

const commitRE = /^(revert: )?(feat|fix|ui|docs|style|refactor|perf|test|chore|revert|merge|build)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      ) +
      `    ${chalk.green(`feat(layout): add page loading`)}\n` +
      `    ${chalk.green(`fix(login): min screen style error`)}\n\n` +
      chalk.red(`  See github.com/JarvisArt/umi-pro#-commit-规范 for more details.\n`),
  );
  process.exit(1);
}

const inquirer = require('inquirer')
const semver = require('semver')
const shell = require('shelljs')
const pkg = require('./package.json')

console.log('');
console.log('Welcome to servable release utility!');
console.log('----------------------------------------------------------------');
console.log('');

const questions = [
  {
    type: 'list',
    name: 'version',
    message: 'Which version will it be? (current is ' + pkg.version + ')',
    choices: [
      semver.inc(pkg.version, 'patch'),
      semver.inc(pkg.version, 'minor'),
      semver.inc(pkg.version, 'major'),
      semver.inc(pkg.version, 'premajor', 'rc'),
    ],
  },
  {
    type: 'list',
    name: 'dryRun',
    message: 'Do you want to release, or just see what would happen if you do?',
    choices: ['Just see', 'Release!'],
  },
];

inquirer.prompt(questions).then(function(answers) {
  const newVerison = answers.version
  const dryRun = answers.dryRun === 'Just see';

  pkg.version = newVerison;

  console.log('');
  if (dryRun) {
    console.log('Ok, here is what would happen:');
  } else {
    console.log('Doing actual release:');
  }
  console.log('');

  run(`npm version ${newVerison}`, dryRun) &&
  run('yarn build', dryRun) &&
  run('git push origin --tags', dryRun) &&
  run('npm publish', dryRun);
});

function run(cmd, dry) {
  console.log('Running `' + cmd + '`');
  if (!dry) {
    if (shell.exec(cmd, {silent: false}).code === 0) {
      console.log('... ok');
    } else {
      console.error('... fail!');
      return false;
    }
  }
  return true;
}

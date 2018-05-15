var path = require('path');
var fs = require('fs');
var argv = require('yargs')
  .usage('Usage: $0 [--bundle SLUG]')
  .describe('bundle', 'The single bundle to compile (based on slug)')
  .help('h').alias('h', 'help')
  .argv;

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

var nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .map(resolveApp);

// config after eject: we're in ./config/

var config = {
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),

  appIndexJs: resolveApp('src/index.js'),
  appCaseStudyJs: resolveApp('src/widget/CaseStudy'),

  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appServer: resolveApp('server'),

  appsRootSrc: resolveApp('apps'),
  marketplaceSrc: resolveApp('apps/marketplace'),
  oramsSrc: resolveApp('apps/orams'),
  sharedComponents: resolveApp('apps/shared'),

  appScss: resolveApp('scss'),
  pancakeSass: resolveApp('pancake/sass'),

  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp('node_modules'),
  nodePaths: nodePaths,
  entryPoints: {},
  entryPointMocks: {}
};

function filterObjectByBundle(subject, key) {
  return Object.keys(subject).filter(function (bundle) {
    return bundle === key;
  })
  .reduce(function (entries, bundle) {
    entries[bundle] = subject[bundle];
    return entries;
  }, {});
}

if (argv.bundle) {
  config.entryPoints = filterObjectByBundle(config.entryPoints, argv.bundle);
  config.entryPointMocks = filterObjectByBundle(config.entryPointMocks, argv.bundle);
}

module.exports = config;

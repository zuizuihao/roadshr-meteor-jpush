Package.describe({
  name: 'roadshr:meteor-jpush',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Cordova.depends({
  "cn.jpush.phonegap.JPushPlugin": "https://github.com/jpush/jpush-phonegap-plugin.git#3810209ca662fa92f7b9a345356944a2cc0811c4"
});

Package.onUse(function (api) {
  api.versionsFrom('1.3.2.4');
  api.use('ecmascript');
  api.export('JPushAPI', 'client');
  api.addFiles('meteor-jpush.js', 'client');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('roadshr:meteor-jpush');
  api.mainModule('meteor-jpush-tests.js');
});

Package.describe({
  name: 'vitalets:angular-xeditable',
  version: '0.1.9',
  summary: 'Edit in place for AngularJS.',
  git: 'https://github.com/vitalets/angular-xeditable',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0.1');

  api.use('angular:angular@1.0.8', ['client']);

  api.addFiles('dist/js/xeditable.js', ['client']);
  api.addFiles('dist/css/xeditable.css', ['client']);
});

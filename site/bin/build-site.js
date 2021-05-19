#!/usr/bin/env node
const { exec, execSync } = require('child_process');

exec('yarn build', function (err, stdout, stderr) {
  if (err) {
    console.error('====yarn build-doc err====', err);
  }
  console.error('====yarn build-doc stderr====', stderr);
  console.log('====yarn build-doc ', stdout);

  execSync('rm -fr public');
  execSync('mkdir -p public');
  execSync('rm -rf public/css');
  execSync('rm -rf public/js');
  execSync('mv dist/* public');
});

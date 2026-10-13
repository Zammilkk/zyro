const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const port = process.env.DEV_PORT || 5000;
const serveBin = path.resolve(__dirname, '../node_modules/serve/bin/serve.js');
const serveDir = fs.existsSync(path.resolve('.tmp/build/static'))
  ? '.tmp/build/static'
  : 'build';

const configArg = fs.existsSync(path.resolve('serve.json'))
  ? ['--config', path.relative(path.resolve(serveDir), path.resolve('serve.json'))]
  : [];

const proc = spawn(
  process.execPath,
  [serveBin, `--listen=${port}`, ...configArg, serveDir],
  {
    stdio: 'inherit',
  },
);

proc.on('exit', (code) => {
  process.exit(code || 0);
});

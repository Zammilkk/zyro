const { spawn } = require('child_process');
const path = require('path');

const port = process.env.DEV_PORT || 5000;
const serveBin = path.resolve(__dirname, '../node_modules/serve/bin/serve.js');

const proc = spawn(process.execPath, [serveBin, `--listen=${port}`, '--config', '../../../serve.json', '.tmp/build/static'], {
  stdio: 'inherit',
});

proc.on('exit', (code) => {
  process.exit(code || 0);
});

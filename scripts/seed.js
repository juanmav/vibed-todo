const path = require('path');
require('dotenv').config();
process.env.TS_NODE_COMPILER_OPTIONS = '{"module":"commonjs"}';
require('ts-node/register/transpile-only');
const { sequelize } = require('../lib/db');
const { Umzug, SequelizeStorage } = require('umzug');

const umzug = new Umzug({
  migrations: { glob: path.resolve(__dirname, '../seeders/*.js') },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, modelName: 'SequelizeData' }),
  logger: console,
});

umzug.up().then(() => {
  console.log('Seeds executed');
}).catch(err => {
  console.error(err);
  process.exitCode = 1;
}).finally(() => {
  sequelize.close();
});

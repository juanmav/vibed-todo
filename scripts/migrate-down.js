const path = require('path');
process.env.TS_NODE_COMPILER_OPTIONS = '{"module":"commonjs"}';
require('ts-node/register/transpile-only');
const { sequelize } = require('../lib/db');
const { Umzug, SequelizeStorage } = require('umzug');

const umzug = new Umzug({
  migrations: { glob: path.resolve(__dirname, '../migrations/*.js') },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

umzug.down({ to: 0 }).then(() => {
  console.log('Migrations reverted');
}).catch(err => {
  console.error(err);
  process.exitCode = 1;
}).finally(() => {
  sequelize.close();
});

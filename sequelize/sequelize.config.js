const yaml = require('js-yaml');
const { join } = require('path');
const { readFileSync } = require('fs');

const YAML_CONFIG_FILE = join(process.cwd(), 'env.yml');
const configuration = yaml.load(readFileSync(YAML_CONFIG_FILE, 'utf8'));
const databaseInfo = configuration.database;

module.exports = {
  development: {
    ...databaseInfo,
    dialect: 'mysql',
  },
  uat: {
    ...databaseInfo,
    dialect: 'mysql',
  },
  production: {
    ...databaseInfo,
    dialect: 'mysql',
  },
};

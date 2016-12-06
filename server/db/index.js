'use strict';
const db = require('./db');
const chalk = require('chalk');


//  This promise is used by main.js.
var syncedDbPromise = db.sync(
  // {force:true}
)

syncedDbPromise.then(function () {
  console.log(chalk.green('Sequelize models synced to PostgreSQL'));
});

module.exports = syncedDbPromise;


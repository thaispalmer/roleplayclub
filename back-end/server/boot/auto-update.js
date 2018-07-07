'use strict';

module.exports = function(app) {
  var db = app.dataSources.db;

  db.autoupdate(function(err) {
    if (err) throw err;
    console.log('\nAutoupdated tables.');
  });
};

const JsonDB = require("node-json-db").JsonDB;
const Config = require("node-json-db/dist/lib/JsonDBConfig").Config;

class DBManager {
  constructor() {
    console.log("DB-Manager");
  }

  createDB(dbName) {
    this.db = new JsonDB(new Config(dbName, true, true, "/"));
  }

  pushData(path, data, cond) {
    this.db.push(path, data, cond);
  }

  getData(path) {
    return this.db.getData(path);
  }
}

module.exports = { DBManager };
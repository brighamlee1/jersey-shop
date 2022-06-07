require("../config/db.connection");

module.exports = {
  auth: require("./auth_controller"),
  jersey: require("./jersey_controller"),
};

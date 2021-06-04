const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("events", {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    },
  },
  past: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  restaurants: Sequelize.ARRAY(Sequelize.TEXT),
  invitees: Sequelize.ARRAY(Sequelize.TEXT),
  host: Sequelize.INTEGER,
  booked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = Event;

/*

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  base_gps_lat: {
    type: Sequelize.DOUBLE,
  },
  base_gps_long: {
    type: Sequelize.DOUBLE,
  },
  maxInvitees: {
    type: Sequelize.INTEGER,
    defaultValue: 4,
  },
  startTime: {
      type: Sequelize.DATE,
      isDate: true
  },
  booked: {     // require maxInvitees to have accepted and chosen appropriate restaurants & menu item
      type: Sequelize.BOOLEAN,
      defaultValue: false
  }
});

module.exports = Event;

*/

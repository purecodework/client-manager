const Sequelize = require("sequelize");
const db = require("../utils/database");

const Client = db.define("client", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "name cannot be empty",
      },
    },
  },

  dateOfBirth: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
        msg: "dob must be a valide date",
      },
    },
  },

  mainLanguage: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "main language cannot be empty",
      },
    },
  },

  secondaryLanguage: {
    type: Sequelize.STRING,
  },

  fundingSource: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Funding source is required and cannot be empty",
      },
      isIn: {
        args: [["NDIS", "HCP", "CHSP", "DVA", "HACC"]],
        msg: "Funding source must be one of the following: NDIS, HCP, CHSP, DVA, HACC",
      },
    },
  },
});

module.exports = Client;

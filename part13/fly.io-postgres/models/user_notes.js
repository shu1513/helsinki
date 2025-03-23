const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class UserNotes extends Model {}

UserNotes.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  },
  notesId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "notes", key: "id" },
  },
}),
  {
    sequelize,
    underscored: true,
    timestamsp: false,
    modelName: "user_notes",
  };

model.exports = UserNotes;

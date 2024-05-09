import { DataTypes } from "sequelize";
import { sequelize } from "../services/connectDB";
import Bottle from "./Bottle";
import User from "./User";

const Rating = sequelize.define(
  'Rating',
  {
    rating: {
      type: DataTypes.TINYINT,
      field: 'rating',
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      field: "user_id",
    },
    bottleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "bottles",
        key: "id",
      },
      field: "bottle_id",
    },
  },
  {
    tableName: "ratings",
  }
)
Bottle.hasMany(Rating, {
  foreignKey: 'bottleId',
  as: 'ratings'
});

Rating.belongsTo(Bottle, {
  foreignKey: 'bottleId',
  as: 'bottle'
})
User.hasMany(Rating, {
  foreignKey: 'userId',
  as: 'ratings'
});

Rating.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

export default Rating;

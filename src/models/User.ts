import { DataTypes } from "sequelize"
import { sequelize } from "../services/connectDB"

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pseudo: {
      type: DataTypes.STRING,
      field: 'pseudo',
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      field:"role",
      allowNull: false
    }
  },
  {
    tableName: 'users',
  }
)

export default User;
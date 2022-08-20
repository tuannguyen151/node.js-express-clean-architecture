import { DataTypes, Model } from 'sequelize'
import sequelize from '../connection'

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },

    first_name: DataTypes.STRING(50),

    last_name: DataTypes.STRING(50),

    username: {
      type: DataTypes.STRING(255),
      unique: true
    },

    email: {
      type: DataTypes.STRING(255),
      unique: true
    },

    phone: {
      type: DataTypes.STRING(15),
      unique: true
    },

    password: DataTypes.STRING(255),

    email_verified_at: DataTypes.DATE,

    phone_verified_at: DataTypes.DATE,

    reset_password_token: DataTypes.STRING(255),

    reset_password_sent_at: DataTypes.DATE,

    status: {
      type: DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 1
    },

    created_at: DataTypes.DATE,

    updated_at: DataTypes.DATE,

    deleted_at: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'users',
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  }
)

export default User

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
          },

          first_name: Sequelize.DataTypes.STRING(50),

          last_name: Sequelize.DataTypes.STRING(50),

          username: {
            type: Sequelize.DataTypes.STRING(255),
            unique: true
          },

          email: {
            type: Sequelize.DataTypes.STRING(255),
            unique: true
          },

          phone: {
            type: Sequelize.DataTypes.STRING(15),
            unique: true
          },

          password: Sequelize.DataTypes.STRING(255),

          email_verified_at: Sequelize.DataTypes.DATE,

          phone_verified_at: Sequelize.DataTypes.DATE,

          reset_password_token: Sequelize.DataTypes.STRING(255),

          reset_password_sent_at: Sequelize.DataTypes.DATE,

          status: {
            type: Sequelize.DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 1
          },

          created_at: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
          },

          updated_at: {
            type: Sequelize.DataTypes.DATE,
            defaultValue: Sequelize.literal(
              'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
            )
          },

          deleted_at: Sequelize.DataTypes.DATE
        },
        { transaction }
      )

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.dropTable('users', { transaction })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}

import Sequelize from 'sequelize'
import Model from '../models'

const { or } = Sequelize.Op

const { User } = Model

const findOneBy = async ({ andParams = {}, orParams = [] }) => {
  const user = await User.findOne({ where: { ...andParams, [or]: orParams } })

  return user
}

export default {
  findOneBy
}

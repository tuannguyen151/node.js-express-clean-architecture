import config from '../../config'

const { createCommonError } = config

const throwErrorDemo = () => {
  throw createCommonError({ type: 'ERROR_TYPE', message: 'error message' })
}

export default async ({ id }) => {
  throwErrorDemo()

  return {
    id
  }
}

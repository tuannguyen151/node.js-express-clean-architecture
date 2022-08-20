export default async (dataGetterFunc, emitterFunc) => {
  try {
    const data = await dataGetterFunc()

    emitterFunc({
      data
    })
  } catch (e) {
    const errorType = e.type || 'SERVER_ERROR'

    emitterFunc({
      error: {
        type: errorType,
        description: e.message
      }
    })
  }
}

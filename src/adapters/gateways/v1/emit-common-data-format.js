export default async (
  dataGetterFunc,
  acknowledgementCallback,
  ...listEmitterFunc
) => {
  try {
    const data = await dataGetterFunc()

    listEmitterFunc.forEach((emitterFunc) => {
      emitterFunc({
        data
      })
    })
  } catch (e) {
    if (!acknowledgementCallback) throw e

    const errorType = e.type || 'SERVER_ERROR'

    acknowledgementCallback({
      error: {
        type: errorType,
        description: e.message
      }
    })
  }
}

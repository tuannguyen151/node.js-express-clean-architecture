import emitCommonDataFormat from './emit-common-data-format'

export default (ioNamespace) => {
  ioNamespace.on('connection', (socket) => {
    emitCommonDataFormat(
      () => 'private',
      undefined,
      (dataFormat) => socket.emit('private', dataFormat)
    )
  })
}

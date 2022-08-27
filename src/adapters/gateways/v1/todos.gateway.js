import todosUseCase from '../../../use-cases/todos'
import emitCommonDataFormat from './emit-common-data-format'

export default (ioNamespace) => {
  ioNamespace.on('connection', (socket) => {
    socket.join('room1')

    emitCommonDataFormat(
      () => todosUseCase.list(),
      null,
      (dataFormat) => socket.emit('todos:list', dataFormat)
    )

    socket.on('todos:create', ({ id }, acknowledgementCallback) => {
      emitCommonDataFormat(
        () => todosUseCase.create({ id }),
        acknowledgementCallback,
        (dataFormat) => socket.emit('todos:created', dataFormat),
        (dataFormat) => socket.to('room1').emit('todos:created', dataFormat)
      )
    })
  })
}

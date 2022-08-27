import todosGateway from '../../../../adapters/gateways/v1/todos.gateway'

export default (io) => {
  const todosNamespace = io.of('/v1/todos')

  todosGateway(todosNamespace)

  return todosNamespace
}

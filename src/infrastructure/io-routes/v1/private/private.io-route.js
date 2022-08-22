import privateGateway from '../../../../adapters/gateways/v1/private.gateway'

export default (io) => {
  const privateNamspace = io.of('/private')

  privateGateway(privateNamspace)

  return privateNamspace
}

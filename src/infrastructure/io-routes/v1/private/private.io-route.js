import privateGateway from '../../../../adapters/gateways/v1/private.gateway'

export default (io) => {
  const privateNamspace = io.of('/v1/private')

  privateGateway(privateNamspace)

  return privateNamspace
}

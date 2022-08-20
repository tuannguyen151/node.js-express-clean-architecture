import initPrivateIoNamespace from './private'
import initPublicIoNamespace from './public'

export default function initIoRoutes(io) {
  initPublicIoNamespace(io)
  initPrivateIoNamespace(io)
}

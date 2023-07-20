export default {
  MICROSERVICES: [
    {
      name: '/blogs',
      auth: false,
      // rateLimit: {
      //   windowMs: 15 * 60 * 1000,
      //   max: 5
      // },
      proxy: {
        target: 'http://192.168.0.19:8080',
        changeOrigin: true
      }
    },
    {
      name: '/users',
      auth: true,
      proxy: {
        target: 'http://192.168.0.19:8081',
        changeOrigin: true
      }
    }
  ]
}

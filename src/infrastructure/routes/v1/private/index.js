import express from 'express'
import * as fs from 'fs'

const router = express.Router()

fs.readdirSync(new URL('./', import.meta.url)).forEach(async (fileName) => {
  if (fileName !== 'index' && fileName.includes('.route')) {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const { default: routerImport } = await import(
      new URL(fileName, import.meta.url)
    )
    router.use(routerImport)
  }
})

export default router

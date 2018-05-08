require('dotenv/config')
const createApp = require('../server/create-app')

let server

before('Setup server', (done) => {
  const app = createApp()
  server = app.listen(process.env.PORT, () => {
    done()
  })
})
after('Teardown server', (done) => {
  server.close(() => {
    done()
  })
})

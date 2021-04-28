const app = require('./index')
const port = 3000

app.listen(process.env.PORT)
console.log(`listening on http://localhost:${port}`)
import * as koa from 'koa'
import * as cors from 'koa2-cors'
import * as bodyParser from 'koa-bodyparser'
import routes from './routes/index'

const app = new koa()
const PORT = 2333

app.use(cors({
  origin: () => 'http://localhost:8080',
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser())

app.use(async (ctx, next) => {
  console.log(`${ctx.request.path} : ${ctx.request.method}`)
  await next()
})

app.use(routes.routes())

app.listen(PORT, () => {
  console.log('服务启动成功！')
})

import * as koa from 'koa'
import * as cors from 'koa2-cors'
import * as bodyParser from 'koa-bodyparser'
import * as session from 'koa-session'
import * as redisStore from 'koa-redis'
import { login } from './middleware/login'
import { logout } from './middleware/logout'
import { validateLogin } from './middleware/validateLogin'
import { cookieSignedKey, cookieConfig } from './config'
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

app.keys = cookieSignedKey
const store = redisStore({})
app.use(session({ ...cookieConfig, store }, app))

app.use(async (ctx, next) => {
  console.log(`${ctx.request.path} : ${ctx.request.method}`)
  await next()
})

app.use(login)
app.use(validateLogin)
app.use(logout)

app.use(routes.routes())

app.listen(PORT, () => {
  console.log('服务启动成功！')
})

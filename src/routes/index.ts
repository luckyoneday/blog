import * as Router from 'koa-router'
import * as koaBody from 'koa-body'
import UserController from '../controllers/User'

const router = new Router()

router.post('/signUp', koaBody(), UserController.createUser)
router.post('/login', koaBody(), UserController.validatePassword)

export default router
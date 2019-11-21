import * as Router from "koa-router"
import UserController from "../controllers/User"

const router = new Router()

router.post("/signUp", UserController.signUp)

export default router

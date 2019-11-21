import * as Router from "koa-router"
import UserController from "../controllers/User"

const router = new Router()

router.post("/signUp", UserController.signUp)
router.post("/login", UserController.login)
router.get("/logout", UserController.logout)
router.get("/userInfo", UserController.getUserInfo)

export default router

import * as Router from "koa-router"
import UserController from "../controllers/User"
import DraftController from '../controllers/Draft'
import ArticleController from '../controllers/Article'

const router = new Router({prefix: '/api'})

// 用户相关
router.post("/signUp", UserController.signUp)
router.post("/login", UserController.login)
router.get("/logout", UserController.logout)
router.get("/userInfo", UserController.getUserInfo)
router.get("/verifyLogin", UserController.verifyLogin)

// 草稿相关
router.post("/draft/create", DraftController.createDraft)
router.post('/draft/update', DraftController.updateDraft)
router.post('/draft/delete', DraftController.deleteDraft)
router.get('/draft/detail', DraftController.getDraftDetail)
router.get('/draft/list', DraftController.getDraftList)

// 文章相关
router.post("/article/create", ArticleController.createArticle)
router.post('/article/update', ArticleController.updateArticle)
router.post('/article/delete', ArticleController.deleteArticle)
router.get('/article/detail', ArticleController.getArticleDetail)
router.get('/article/list', ArticleController.getArticleList)
router.get('/article/allList', ArticleController.getAllList)

export default router

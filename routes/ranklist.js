const ranklist = require('../controllers/ranklist.js')
const Router = require('koa-router')

const router = new Router({
  prefix: '/ranklist'
})

router.get('/list', ranklist.list)

module.exports = router

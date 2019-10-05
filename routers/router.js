const Router = require('koa-router')
const router = new Router()

// 设计主页
router.get("/", async (ctx) => {
  // 渲染文件，对于读写的I/O操作都是异步操作，所以需要加 await
  await ctx.render("index") // 渲染index.pug
} )

// 导出
module.exports = router
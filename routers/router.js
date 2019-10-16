const Router = require('koa-router')
// 拿到操作用户表的对象
const user = require('../controller/user')
const router = new Router()

// 设计主页
router.get("/", async (ctx) => {
  // 渲染文件，对于读写的I/O操作都是异步操作，所以需要加 await
  await ctx.render("index", {
    // session: {  // role 判断用户的登录状态
    //   role: ''
    // },
    title: "my-blog"
  }) // 渲染index.pug
} )

// 动态路由判断，主要用来处理用户的 登录 注册
router.get(/^\/user\/(?=reg|login)/, async (ctx) => {
  const show = /reg$/.test(ctx.path) // 将path 放到正则里匹配 true显示注册，false显示登录

  await ctx.render("register", {show})
})

// post 请求处理用户登录
router.post("/user/login", async (ctx) => {
  // post 数据需要解析，因此要依赖 koa-body 模块
  const data = ctx.request.body
  // 取出用户名，到数据库中查询，匹配到则表示登录成功

})

// post 请求处理用户注册
router.post("/user/reg", user.reg)

// 导出
module.exports = router
const Koa = require('koa')
const router = require('./routers/router')
const static = require('koa-static')
const views = require('koa-views')
const logger = require('koa-logger')
const { join } = require('path')

const app = new Koa()

// 注册日志模块
app.use(logger())

// 将当前所有静态资源的根目录修改成 "" 中的路径
app.use(static(join(__dirname, "public"))) 

// 配置视图模板，默认根路径为views，使用的模板设成pug
app.use(views(join(__dirname, "views"), {
  extension: "pug"
}))


// 注册路由信息
app.use(router.routes()).use(router.allowedMethods())

// 设置监听端口
app.listen(3000, () => {
  console.log("项目启动成功，监听在3000端口");
})
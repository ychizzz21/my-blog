// 连接数据库，导出对象 db, schema
const mongoose = require('mongoose')
const db = mongoose.createConnection("mongodb://localhost:27017/blogproject", {useNewUrlParser: true})

// 用原生 ES6 的promise代替mongoose的promise
mongoose.Promise = global.Promise

const Schema = mongoose.Schema

db.on("error", () => {
  console.log('连接数据库失败');
})

db.on("open", () => {
  console.log('连接数据库成功');
})













// 导出操作数据库的db对象
module.exports = {
  db,
  Schema
}
const { db } = require('../schema/config')
const userSchema = require('../schema/user')
const encrypt = require('../utils/encrypt')

// 通过db对象创建操作user库的对象
const UserControl = db.model("users", userSchema)

exports.reg = async ctx => {
  // 用户注册，点击提交之后运行下面代码
  const user = ctx.request.body // 用户注册时，post发过来的数据
  const username = user.username
  const password = user.password
  
  // 去user库查询当前用户名是否存在
  await new Promise((resolve, reject) => {
    // 由于I/O操作是异步操作，因此需要用await
    UserControl.find({
      username
    }, (err, data) => {
      // 回调函数
      // 如果查询出错
      if (err) return reject(err)
      // 查询没有出错，但是没有数据
      if (data.length !== 0) 
        // 查到数据，用户名已经存在
        return resolve("")
      
      // 用户名不存在，需要存到数据库
      const _user = new UserControl({ // 创建一个操作user库的实例
        username,
        password: encrypt(password)
      })

      _user.save((err, data) => {
        if (err) {
          reject(err)
        }else {
          resolve(data)
        }
      })
    })
  })
  .then(async data => {
    if (data) {
      // 注册成功
      await ctx.render("isOk", {
        status: "注册成功"
      })
    }else {
      // 用户名已存在
      await ctx.render("isOk", {
        status: "用户名已存在"
      })
    }
  })
  .catch(async err => {
    await ctx.render("isOk", {
      status: "注册失败，请重试"
    })
  })
}
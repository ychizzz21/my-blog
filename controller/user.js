const { db } = require('../schema/config')
const userSchema = require('../schema/user')
const encrypt = require('../utils/encrypt')

// 通过db对象创建操作user库的对象
const UserControl = db.model("users", userSchema)

// 用户注册
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

// 用户登录
exports.login = async ctx => {
  // 拿到post数据
  const user = ctx.request.body
  const username = user.username
  const password = user.password

  await new Promise((resolve, reject) => {
    UserControl.find({username}, (err, data) => {
      if (err) {
        // 返回错误信息
        return reject(err)
      }
      if (data.length === 0) {
        // data指的是用户的登录信息
        return reject("用户名不存在")
      }
      // 用户登录成功，对比密码
      if (data[0].password === encrypt(password)) {
        // 密码一致
        return resolve(data)
      }
      // 密码不一致
      resolve('')
    })
  })
  .then(async data => {
    if (!data) {
      // 如果resolve传了空值
      return ctx.render("isOk", {
        status: "密码不正确，登录失败"
      })
    }else{
      // resolve没传空值
      return ctx.render("isOk", {
        status: "登录成功"
      })
    }
  })
  .catch(async err => {
    await ctx.render("isOk", {
      status: "登录失败"
    })
  })
}

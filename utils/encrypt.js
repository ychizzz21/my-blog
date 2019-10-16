const crypto = require('crypto')



module.exports = function (pwd, key="ychizzz") {
  // 返回加密成功的数据
  const hmac = crypto.createHmac("sha256", key)
  hmac.update(pwd)

  const pwdHmac = hmac.digest("hex")

  return pwdHmac
}
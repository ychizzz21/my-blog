const { Schema } = require('./config')

const userSchema = new Schema({
  username: String,
  password: String
}, {vertionKey: false})










module.exports = userSchema

/*
 * @Author: your name
 * @Date: 2020-12-13 01:02:43
 * @LastEditors: xiasong
 * @LastEditTime: 2020-12-13 01:47:39
 * @Description:
 * @FilePath: \follow_topfullstack\expressLogInAndLogOut\models.js
 */

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/exxpress_auth", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 创建模型
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true }, // 加个 unique: true 表示唯一
  password: {
    type: String,
    set(val) {
      // 加密的第三方包  npm i bcrypt
      // 这里是同步的 所以用hashSync; hashSync(val,加密的次数)
      return require("bcrypt").hashSync(val, 10);
    },
  },
});
const User = mongoose.model("User", UserSchema);

// 删掉数据中所有的信息
// User.db.dropCollection('users')

module.exports = { User };

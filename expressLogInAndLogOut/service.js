/*
 * @Author: your name
 * @Date: 2020-12-13 00:25:32
 * @LastEditors: xiasong
 * @LastEditTime: 2020-12-13 02:16:38
 * @Description:
 * @FilePath: \follow_topfullstack\expressLogInAndLogOut\service.js
 */
const { User } = require("./models");
const express = require("express");
// 第三方包 npm i jsonwebtoken
const jwt = require("jsonwebtoken");

const app = express();

const SECRET = "aoahohgaodgoadokandgndo2n3r0";

// 解析 body 的 json 格式
app.use(express.json());

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// 注册
app.post("/api/register", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  res.send(user);
});

// 登录
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return res.status(442).send({
      message: "用户名不存在",
    });
  }

  // 比较数据库里面的秘密和客户端登录提交的密码
  const isPasswordValid = require("bcrypt").compareSync(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    return res.status(442).send({
      message: "密码无效",
    });
  }

  // 生成token

  // 签名
  const token = jwt.sign(
    {
      // 这里 数据库里面的 id 可能是一个对象，转一下类型
      id: String(user._id),
    },
    // 这里第二个参数是一个密钥 是自己独一无二的密钥
    // 应该是写在环境变量里面，别人不可知的
    // 全局保持唯一的
    SECRET
  );

  res.send({
    user,
    token,
  });
});

// 中间件
const auth = async (req, res, next) => {
  const raw = String(req.headers.authorization).split(" ").pop();
  const { id } = jwt.verify(raw, SECRET);
  // const user = await User.findById(id);
  // 用户请求过来的，为了在下面的 token 验证中拿到，所以放到 req 中
  req.user = await User.findById(id);
  next();
};

// 带token
// 第二个参数为 中间件
app.get("/api/profile", auth, async (req, res) => {
  /*
  这里验证很频繁 可以抽取出来 放到中间件中
   const raw = String(req.headers.authorization).split(" ").pop();
  // cosnt user = await User.findById()
  // const tokenData = jwt.verify(raw, SECRET);
  // console.log(tokenData);
  // tokenData ==> { id: '5fd50139e8f9eb0df497c162', iat: 1607795683 }
  // 可以拿到 id,那 id 去数据库中找对应的用户
  const { id } = jwt.verify(raw, SECRET);
 */

  res.send(req.user);
});

app.listen(3001, () => {
  console.log("App listening on http://localhost:3001");
});

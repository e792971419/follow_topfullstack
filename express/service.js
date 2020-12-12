const express = require("express");

const app = express();

app.use(express.json());

/**
 * win 安装mongodb https://www.bilibili.com/video/BV1xz4y1X7cE?p=6
 * npm i mongoose
 * 使用mongoose
 */

const mongoose = require("mongoose");
// 后面的参数在提示中有，把终端中的 提示 加到这里就行
mongoose.connect("mongodb://localhost:27017/express-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    title: String,
  })
);

// 这里是测试用的 往创建的 Product 中插入数据
// 这里执行一次就行
// Product.insertMany([
//   { title: "产品1" },
//   { title: "产品2" },
//   { title: "产品3" },
// ]);

// 挂载静态文件(静态问价托管)
/**
 * app.use(param1,express.static(param2))
 * param1 默认是根路径，但是可以指定要挂载的静态文件的路径
 *  - 就是 访问的时候 例如: /param1/index.html (默认是访问是 /index.html)(index.html是param2文件夹下面的资源)
 * param2 是要挂载的静态文件夹
 */
// app.use('/static', express.static('public'))

// 解决跨域问题
/**
 * 注意 下载cors 这包的时候 不能用 -S
 */
app.use(require("cors")());

app.use("/", express.static("public"));

// app.get('/', (req, res) => {
//     res.send([{
//         label: 'a',
//         value: 1
//     }])
// })

app.get("/about", (req, res) => {
  res.send("Page about");
});

app.get("/products", async (req, res) => {
  /**
   * skip(num)  从第num个开会
   * limit(num) 限制查num个
   * where({ key: value }) 表示查 什么字段 为什么值
   * sort({ key : 1(-1)}) 表示按照 key 的正序(1)或倒序(-1)的排序
   */
  //   const data = await Product.find().skip(1).limit(2);
  //   const data = await Product.find().where({ title: "产品2" });
  const data = await Product.find().sort({ _id: -1 });
  res.send(data);
});

app.get("/products/:id", async (req, res) => {
  const data = await Product.findById(req.params.id);
  res.send(data);
});

// 提交数据的时候用 post 请求 更安全
app.post("/products", async (req, res) => {
  // 这里直接写 req.body 是获取不到的 要在顶层写个 app.use(express.json())
  // 获取到服务端的数据
  const data = req.body;
  // 插入到model 里面
  const product = await Product.create(data);
  res.send(product);
});

// 修改
/**
 * 用 patch 或者 put
 * patch 是部分修改
 * put 是整个替换掉
 */
app.put("/products/:id", async (req, res) => {
  // 通过 id 找到对应的产品
  // 产找是在mongodb里面操作的是 异步的
  const product = await Product.findById(req.params.id);
  // 更新查到的产品中的某些信息
  product.title = req.body.title;
  // 储存更改后的的产品
  // 保存也是在 mongodb 中操作的,也是异步的
  await product.save();

  res.send(product);
});

// 删除
app.delete("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  await product.remove();
  res.send({
    success: true,
  });
});

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000 ");
});

/*
 * @Author: your name
 * @Date: 2020-12-13 02:19:47
 * @LastEditors: xiasong
 * @LastEditTime: 2020-12-13 03:04:27
 * @Description:
 * @FilePath: \follow_topfullstack\mongoRelation\db.js
 */

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mongo_relation", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  {
    //   这里加个参数 表示 转为 json 的时候展示虚拟键
    toJSON: { virtuals: true },
  }
);

// 添加虚拟字段
CategorySchema.virtual("posts", {
  ref: "Post", // 参考的 外面的 model
  localField: "_id", // 本地键 是指
  foreignField: "categories",
  justOne: false,
});
const Category = mongoose.model("Category", CategorySchema);

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    // 第二个参数是要管理的那个model
    category: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  })
);

/**
 * 这里不能这样直接写，因为 await 要在 async 后面写才行
 * const post = await Post.find()
 * console.log(post)
 */
const main = async () => {
  /* 
    await Post.insertMany([
      { title: "我的第1篇帖子", body: "内容1" },
      { title: "我的第2篇帖子", body: "内容2" },
    ]);

    await Category.insertMany([{ name: "nodehjs" }, { name: "vuejs" }]);
    console.log(await Category.find());
 */

  //   找到分类
  const cat1 = await Category.findOne({ name: "nodehjs" });
  const cat2 = await Category.findOne({ name: "vuejs" });
  //  找到帖子
  //   const post1 = await Post.findOne({ title: "我的第1篇帖子" });
  //   const post2 = await Post.findOne({ title: "我的第2篇帖子" });

  //   post1.categories = [cat1, cat2];
  //   post2.categories = [cat2];
  //   await post1.save();
  //   await post2.save();

  //   const category = await Category.find().populate("posts");
  //   console.log(JSON.stringify(category));
  // 或者
  //   .lean() 表示转化 为一个传json 格式的数据
  const category = await Category.find().populate("posts").lean();
  console.log(category[0]);
  //   const posts = await Post.find().populate("categories");
  //   const posts = await Post.find();
  //   console.log(posts);
};

main();

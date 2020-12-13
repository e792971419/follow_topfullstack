/*
 * @Author: your name
 * @Date: 2020-12-13 17:01:51
 * @LastEditors: xiasong
 * @LastEditTime: 2020-12-13 17:09:53
 * @Description:
 * @FilePath: \follow_topfullstack\nodemon_and_pm2\server.js
 */
const fastify = require("fastify")();

fastify.get("/", async () => {
  return {
    status: "ok11",
  };
});

fastify.listen(4001, () => {
  console.log("server listening on http://localhost:4001");
});

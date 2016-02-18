# 一个使用 AngularJS & NodeJS 实现的基于 token 的认证 demo

## 使用说明

1. npm install
2. node server

在启动 node server 前，需要先启动 mongodb server，本 demo 用的数据库为 auth，用到的 collection 有 users 和 todos，这些可以在 server/mongo.js 中修改

## 基本原理

1. 登录时，调用后台接口，如果用户名和密码验证通过，则后台生成 token（带expireTime）并返回，前端将 token 保存到 sessionStorage

2. 在发送http请求的地方，添加一个拦截器，对所有的 request 设置 headers.Authorization，值为 token，对所有的 responseError，判断 status 是否为401或403，进行相应跳转

3. 前端路由中，在需要访问的模块中添加 access: {requiredLogin: true}，并在 stateChangeStart 的时候判断，如果需要登录而又没有 token，则跳转到登录页

4. 后台路由中，同样对需要登录才能调用的 api 进行 token 的验证操作（后台接收到 request 时，先判断 headers 中有无 token，若没有，则返回 status 为403，若有，则进行解析，判断是否超时，若超时，返回401，若没有超时，用解析到的 token 中的 user 信息进行数据库操作）

5. 退出时，由前端删除 sessionStorage 中的 token，并跳转到登录页

## 目录结构

### 前端：public

 - css文件夹（公共css目录）
 - img文件夹（img目录）
 - lib文件夹（依赖库）
 - src文件夹（主代码，以模块划分）

src文件夹下包括：

 - app.js （前端主文件）
 - auth文件夹（登录模块）
 - common文件夹（公共模块，放置导航条，页头等）
 - admin文件夹（管理模块，只是用作示范，是需要登录后才能访问的模块）

 
### 后台：server

 - server.js（后台主文件，启动server）
 - routes.js（路由层）
 - auth.js（api层，验证api）
 - api.js（api层，普通api）
 - mongo.js（dao层，访问数据库）
 - schemas.js（数据库所有collection的schema）
 - util.js（工具函数）
 - private.key（token加密私钥）


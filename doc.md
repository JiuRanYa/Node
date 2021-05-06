## 一. vanilla node

### 1. 初始化npm环境

```shell
npm init -y
```

新创建bin目录, 修改入口文件为bin/www.js


### 2. 通过cross-env设置开发环境变量

```shell
npm install cross-env
```

在script中新增dev

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js"
  },
```

### 3. 初始化路由

### 4. xss工具预防
```
npm i xss
```
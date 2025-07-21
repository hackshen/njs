# Nginx + JavaScript 演示项目

这个项目演示了如何使用Nginx作为Web服务器来托管JavaScript应用程序并代理Node.js API请求，同时展示了NJS (Nginx JavaScript) 模块的强大功能。

## 项目概述

本项目包含两个主要组件：
1. **Node.js应用** - 提供API服务和前端页面
2. **Nginx服务器** - 作为代理服务器和静态文件服务器，并通过NJS模块支持直接在Nginx中执行JavaScript

项目使用Docker进行容器化，方便快速部署和测试。

## 功能特点

### 基本功能
- 使用Nginx托管静态文件（HTML, CSS, JavaScript等）
- 配置Nginx代理转发API请求到Node.js应用
- 实现前后端分离架构
- 支持静态文件缓存
- Docker支持，方便部署

### NJS功能
- 直接在Nginx中执行JavaScript代码
- 提供丰富的HTTP请求处理示例
- 实现身份验证和授权（基础认证、API密钥、JWT）
- 提供变量处理和会话管理示例
- 展示子请求和请求聚合功能

## 项目结构

```
.
├── app/                   # Node.js应用程序
│   ├── public/            # 静态文件
│   │   ├── index.html     # 主页
│   │   └── main.js        # 前端JavaScript
│   ├── app.js             # Node.js服务器
│   └── package.json       # Node.js依赖
├── nginx/                 # Nginx配置
│   ├── default.conf       # Nginx主配置文件
│   └── njs-example/       # NJS示例脚本
│       ├── http.js        # HTTP处理示例
│       ├── auth.js        # 认证处理示例
│       ├── variables.js   # 变量处理示例
│       ├── subrequest.js  # 子请求处理示例
│       └── README.md      # NJS说明文档
├── Dockerfile             # Node.js应用的Docker配置
├── nginx.Dockerfile       # Nginx的Docker配置
├── docker-compose.yml     # Docker Compose配置
└── README.md              # 本文件
```

## 使用Docker运行

### 快速开始

使用Docker Compose一键启动：

```bash
docker compose up -d
```

### 开发环境

项目配置了卷挂载，使您可以在不重建容器的情况下开发：

```bash
# 修改NJS脚本或配置文件后，只需重启Nginx容器
docker restart nginx-njs-server
```

### 生产环境部署

如果需要完全重新构建容器（例如添加新依赖或首次部署）：

```bash
docker compose down && docker compose build --no-cache && docker compose up -d
```

## 访问应用

### 基本应用
- 访问 http://localhost 查看Node.js应用
- API端点位于 http://localhost/api/info

### NJS示例
- 基础示例：http://localhost/njs
- 请求信息：http://localhost/njs/request-info
- 用户代理检测：http://localhost/njs/ua
- 重定向示例：http://localhost/njs/redirect?url=/njs
- API示例：http://localhost/njs/api
- 变量设置：http://localhost/njs/set-vars?user_type=admin&access_level=10
- 会话管理：http://localhost/njs/session
- 基本认证：http://localhost/njs/basic-auth (用户名: admin, 密码: secret123)
- API密钥认证：http://localhost/njs/api-auth?api_key=api-key-123
- JWT认证：http://localhost/njs/jwt-auth (需提供Bearer token)
- IP检查：http://localhost/njs/ip-check
- 获取JWT令牌：http://localhost/njs/get-token
- 子请求处理：http://localhost/njs/subrequest
- 结果聚合：http://localhost/njs/aggregate
- 条件处理：http://localhost/njs/conditional (需要基本认证)

## NJS (Nginx JavaScript)

NJS是Nginx的一个模块，允许使用JavaScript直接在Nginx中处理请求，无需依赖外部应用服务器。

### 主要优势
- 高性能 - 直接在Nginx中处理请求，减少网络开销
- 低延迟 - 无需将请求转发到外部应用服务器
- 灵活性 - 可以动态修改请求和响应
- 简化架构 - 减少对外部应用服务器的依赖

### 使用场景
- API网关功能
- 请求认证和授权
- 内容转换和处理
- 会话管理
- 请求路由和负载均衡控制

### 学习资源
有关NJS的更多信息，请参考：
- [Nginx官方NJS文档](https://nginx.org/en/docs/njs/)
- [NJS示例目录](nginx/njs-example/README.md)

## 自定义配置

### Nginx配置

可以根据需要修改`nginx/default.conf`文件：

- 调整缓存策略
- 配置SSL
- 修改代理规则
- 添加额外的安全头
- 添加更多NJS功能

修改后只需重启Nginx容器即可生效：
```bash
docker restart nginx-njs-server
```

### Node.js应用

修改`app/app.js`可以：

- 添加新的API端点
- 配置数据库连接
- 添加身份验证
- 扩展应用功能

## 开发与调试

### 优化的开发工作流

项目配置了卷挂载，使得开发更加高效：

1. **修改NJS脚本**：直接编辑 `nginx/njs-example/` 目录下的文件
2. **修改Nginx配置**：直接编辑 `nginx/default.conf` 文件
3. **应用更改**：运行 `docker restart nginx-njs-server` 即可看到更改效果
4. **无需重新构建**：由于使用卷挂载，无需每次修改都重建整个容器

### 常见问题排查
- 检查Nginx日志：`docker logs nginx-njs-server`
- 查看NJS语法错误：`docker exec nginx-njs-server nginx -t`
- 测试NJS脚本：使用curl命令测试各个端点

## 注意事项

- NJS是JavaScript的一个受限子集，不支持所有现代JavaScript特性
- 在编写NJS脚本时，避免使用复杂的ES6+特性（如解构赋值、箭头函数等）
- 确保为响应设置正确的Content-Type头，以便浏览器正确显示内容
- 在生产环境中，建议对安全相关的NJS脚本进行彻底测试 
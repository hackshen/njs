# Nginx JavaScript (NJS) 示例

本目录包含了使用Nginx JavaScript (NJS) 模块的示例代码和配置。NJS是Nginx的一个模块，允许使用JavaScript扩展Nginx的功能，直接在Nginx服务器内部处理请求。

## NJS简介

NJS是一个JavaScript语言子集，专为在Nginx中执行而设计。它允许开发者使用JavaScript来：

- 处理HTTP请求和响应
- 操作请求和响应头
- 进行复杂的请求路由逻辑
- 实现身份验证和授权
- 转换内容和响应体
- 与外部服务集成

## 前提条件

使用NJS需要：

1. Nginx版本 >= 1.9.11
2. 编译时启用了NJS模块支持（ngx_http_js_module）

## 安装NJS

### 使用包管理器（推荐）

```bash
# Ubuntu/Debian
sudo apt-get install nginx-module-njs

# CentOS/RHEL
sudo yum install nginx-module-njs

# 对于使用Nginx官方仓库的系统
# 首先确保已添加Nginx官方仓库
sudo apt-get install nginx-module-njs  # Debian/Ubuntu
sudo yum install nginx-module-njs      # CentOS/RHEL
```

### 手动编译

```bash
# 克隆NJS仓库
git clone https://github.com/nginx/njs.git
cd njs

# 配置并编译
./configure
make
sudo make install

# 然后编译Nginx时启用NJS模块
./configure --add-module=path/to/njs/nginx
```

## 目录结构

```
njs-example/
├── http.js         # HTTP请求处理示例
├── variables.js    # 变量操作示例
├── auth.js         # 认证处理示例
├── nginx.conf      # Nginx配置文件
└── README.md       # 本文档
```

## 配置说明

主要的NJS配置指令：

1. `js_import` - 导入JavaScript文件
2. `js_set` - 设置变量
3. `js_content` - 定义内容处理器
4. `js_header_filter` - 定义响应头过滤器
5. `js_body_filter` - 定义响应体过滤器

## 用法示例

### 1. 基础HTTP处理

```javascript
function hello(r) {
    r.return(200, "Hello from NJS!");
}

export default { hello };
```

```nginx
# nginx.conf
js_import http.js;

server {
    location / {
        js_content http.hello;
    }
}
```

### 2. 设置变量

```javascript
function setUser(r) {
    return r.args.name || "anonymous";
}
```

```nginx
# nginx.conf
js_set $user_name http.setUser;

server {
    location / {
        return 200 "Hello, $user_name!";
    }
}
```

### 3. 请求重写

```javascript
function rewrite(r) {
    if (r.method === 'POST') {
        r.internalRedirect('/post_handler');
    } else {
        r.return(200, "Not a POST request");
    }
}
```

## 优势与限制

### 优势

1. 直接在Nginx中处理请求，无需额外的应用服务器
2. 高性能，低延迟
3. 可与Nginx的其他功能（如缓存、负载均衡）无缝集成
4. 适合实现API网关、认证层、请求转换等功能

### 限制

1. NJS只实现了JavaScript的一个子集，不完全兼容ECMAScript标准
2. 不支持DOM操作（因为不是浏览器环境）
3. 异步操作支持有限
4. 目前没有内置的NPM模块支持

## 常见用途

- API网关功能
- 请求认证和授权
- 内容转换和处理
- 高级路由和流量控制
- 会话管理
- 请求和响应日志增强

## 资源链接

- [NJS官方文档](https://nginx.org/en/docs/njs/)
- [NJS GitHub仓库](https://github.com/nginx/njs)
- [NJS参考手册](https://nginx.org/en/docs/njs/reference.html)
- [NJS例子](https://github.com/nginx/njs-examples) 
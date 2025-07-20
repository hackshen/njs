// NJS脚本示例 - HTTP请求处理

// 一个简单的HTTP请求处理函数
function hello(r) {
    r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
    r.return(200, "<html><body><h1>你好，这是NJS脚本返回的内容！</h1><p>NJS示例演示</p></body></html>");
}

// 返回请求信息
function requestInfo(r) {
    let data = {
        method: r.method,
        uri: r.uri,
        headers: r.headersIn,
        args: r.args,
        remoteAddr: r.remoteAddress,
        serverName: r.headersIn.host,
        time: new Date().toISOString()
    };
    
    r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
    r.return(200, JSON.stringify(data, null, 4));
}

// 重定向处理 - 使用JS页面重定向代替HTTP重定向
function redirect(r) {
    // 从查询参数获取目标URL
    let targetUrl = r.args.url || '/';
    
    // 返回一个包含JavaScript重定向的HTML页面
    r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
    r.return(200, `<html><body>
        <h2>重定向中...</h2>
        <p>正在跳转到：${targetUrl}</p>
        <p>如果没有自动跳转，请<a href="${targetUrl}">点击这里</a></p>
        <script>
            // 使用JavaScript重定向到目标URL
            window.location.href = "${targetUrl}";
        </script>
        </body></html>`);
}

// 根据用户代理选择内容
function userAgentContent(r) {
    let ua = r.headersIn['User-Agent'] || '';
    let content;
    
    if (ua.includes('Mobile')) {
        content = '您正在使用移动设备访问';
    } else if (ua.includes('Chrome')) {
        content = '您正在使用Chrome浏览器访问';
    } else if (ua.includes('Firefox')) {
        content = '您正在使用Firefox浏览器访问';
    } else {
        content = '欢迎访问我们的网站';
    }
    
    r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
    r.return(200, "<html><body><h1>" + content + "</h1></body></html>");
}

// API响应处理
function apiResponse(r) {
    // 示例数据
    let data = {
        status: "success",
        message: "数据获取成功",
        timestamp: new Date().toISOString(),
        data: [
            { id: 1, name: "项目1" },
            { id: 2, name: "项目2" },
            { id: 3, name: "项目3" }
        ]
    };
    
    // 设置JSON响应头
    r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
    r.return(200, JSON.stringify(data));
}

// 显示JWT令牌
function showJwtToken(r) {
    r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
    r.return(200, "<html><body><h2>JWT令牌</h2><p>" + r.variables.jwt_token + "</p></body></html>");
}

// 显示会话信息
function showSession(r) {
    r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
    r.return(200, "<html><body><h2>会话信息</h2><p>会话ID: " + r.variables.session_id + "</p></body></html>");
}

// 显示变量设置
function showVars(r) {
    r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
    r.return(200, "<html><body><h2>变量设置示例</h2><pre>User Type: " + r.variables.user_type + 
             "\nAccess Level: " + r.variables.access_level + 
             "\nCustom: " + r.variables.custom_vars + "</pre></body></html>");
}

// IP检查
function checkIp(r) {
    r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
    
    if (r.variables.ip_allowed === "0") {
        r.return(403, "<html><body><h2>IP访问控制</h2><p style='color:red;'>IP不在白名单中</p></body></html>");
    } else {
        r.return(200, "<html><body><h2>IP访问控制</h2><p style='color:green;'>IP访问已授权</p></body></html>");
    }
}

// 导出函数，使它们可以在Nginx配置中使用
export default { hello, requestInfo, redirect, userAgentContent, apiResponse, showJwtToken, showSession, showVars, checkIp }; 
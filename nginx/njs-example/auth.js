// NJS脚本示例 - 身份验证

// 简单的基本验证检查
function basicAuth(r) {
    // 获取Authorization头
    let auth = r.headersIn.Authorization;
    
    if (!auth || !auth.startsWith('Basic ')) {
        r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
        r.return(401, '<html><body><h2>认证失败</h2><p>需要身份验证</p></body></html>');
        return;
    }
    
    // 提取base64编码的凭证
    let encodedCreds = auth.substring(6); // 去除 "Basic "
    let decodedCreds = '';
    
    try {
        // 在实际环境中，NJS支持atob或者Buffer进行base64解码
        // 这里使用Buffer来解码
        decodedCreds = Buffer.from(encodedCreds, 'base64').toString('utf8');
    } catch (e) {
        r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
        r.return(400, '<html><body><h2>认证失败</h2><p>无效的凭证格式</p></body></html>');
        return;
    }
    
    // 凭证格式应为 "username:password"
    // 使用兼容的方式分割字符串
    var credParts = decodedCreds.split(':');
    var username = credParts[0];
    var password = credParts[1];
    
    // 简单验证示例（实际应用中应使用安全的密码验证方式）
    if (username === 'admin' && password === 'secret123') {
        // 验证通过，设置变量
        r.variables.authenticated_user = username;
        r.headersOut['X-User-Role'] = 'admin';
        r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
        r.return(200, '<html><body><h2>认证成功</h2><p>欢迎，' + username + '！</p></body></html>');
        return;
    } else {
        r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
        r.return(403, '<html><body><h2>认证失败</h2><p>无效的用户名或密码</p></body></html>');
        return;
    }
}

// API密钥验证
function apiKeyAuth(r) {
    // 从请求头或查询参数获取API密钥
    let apiKey = r.headersIn['X-API-Key'] || r.args.api_key;
    
    if (!apiKey) {
        r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
        r.return(401, JSON.stringify({
            error: 'unauthorized',
            message: '缺少API密钥'
        }));
        return;
    }
    
    // 验证API密钥（实际应用中应查询数据库或缓存）
    const validApiKeys = {
        'api-key-123': { userId: 'user1', role: 'user' },
        'api-key-456': { userId: 'admin1', role: 'admin' }
    };
    
    const keyInfo = validApiKeys[apiKey];
    
    if (keyInfo) {
        // 验证通过，设置变量
        r.variables.api_user_id = keyInfo.userId;
        r.variables.api_user_role = keyInfo.role;
        r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
        r.return(200, JSON.stringify({
            status: 'success',
            message: 'API密钥有效',
            userId: keyInfo.userId,
            role: keyInfo.role
        }));
        return;
    } else {
        r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
        r.return(403, JSON.stringify({
            error: 'forbidden',
            message: '无效的API密钥'
        }));
        return;
    }
}

// JWT令牌验证（简化版）
function jwtAuth(r) {
    // 从Authorization头获取JWT
    let auth = r.headersIn.Authorization;
    
    if (!auth || !auth.startsWith('Bearer ')) {
        r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
        r.return(401, JSON.stringify({
            error: 'unauthorized',
            message: '缺少Bearer令牌'
        }));
        return;
    }
    
    // 提取JWT
    let token = auth.substring(7); // 去除 "Bearer "
    let parts = token.split('.');
    
    if (parts.length !== 3) {
        r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
        r.return(401, JSON.stringify({
            error: 'unauthorized',
            message: '无效的令牌格式'
        }));
        return;
    }
    
    // 解析JWT负载（实际应用中还需要验证签名和过期时间）
    try {
        // 这里只做示例，解码JWT的payload部分
        let payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
        
        // 检查令牌是否过期（简化版）
        let now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
            r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
            r.return(401, JSON.stringify({
                error: 'unauthorized',
                message: '令牌已过期'
            }));
            return;
        }
        
        // 验证通过，设置用户身份和角色变量
        r.variables.jwt_user = payload.sub || 'unknown';
        r.variables.jwt_role = payload.role || 'user';
        r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
        r.return(200, JSON.stringify({
            status: 'success',
            message: 'JWT验证成功',
            user: r.variables.jwt_user,
            role: r.variables.jwt_role
        }));
        return;
        
    } catch (e) {
        r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
        r.return(401, JSON.stringify({
            error: 'unauthorized',
            message: '无法解析令牌'
        }));
        return;
    }
}

// 导出函数
export default { basicAuth, apiKeyAuth, jwtAuth }; 
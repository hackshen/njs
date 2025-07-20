// NJS脚本示例 - 变量处理

// 生成JWT令牌示例
function generateJWT(r) {
    // 这只是一个示例，真实环境中应使用更安全的方法
    let header = { alg: 'HS256', typ: 'JWT' };
    let payload = {
        sub: '1234567890',
        name: 'NJS用户',
        admin: true,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600 // 1小时后过期
    };
    
    let headerBase64 = Buffer.from(JSON.stringify(header)).toString('base64url');
    let payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
    
    // 注意：在生产环境中，应使用适当的加密库来签名
    let signature = '示例签名'; // 实际应用中应该是真正的加密签名
    
    return headerBase64 + '.' + payloadBase64 + '.' + signature;
}

// 设置自定义变量
function setCustomVariables(r) {
    r.variables.user_type = r.args.user_type || 'guest';
    r.variables.access_level = r.args.access_level || '0';
    
    return 'ok'; // 返回值会被设置到Nginx变量中
}

// 处理基于cookie的会话
function handleCookieSession(r) {
    // 获取会话cookie
    let sessionId = '';
    let cookies = r.headersIn.Cookie;
    
    if (cookies) {
        // 解析cookies寻找session_id
        let cookieItems = cookies.split(';');
        for (let i = 0; i < cookieItems.length; i++) {
            let cookie = cookieItems[i].trim();
            if (cookie.startsWith('session_id=')) {
                sessionId = cookie.substring('session_id='.length);
                break;
            }
        }
    }
    
    // 如果没有会话ID，创建一个
    if (!sessionId) {
        sessionId = 'sess_' + Math.random().toString(36).substring(2, 15);
        r.headersOut['Set-Cookie'] = 'session_id=' + sessionId + '; Path=/; HttpOnly';
    }
    
    return sessionId;
}

// 基于IP的访问控制
function checkIPAccess(r) {
    // 实际应用中会从数据库或配置中获取IP白名单
    const allowedIPs = ['127.0.0.1', '::1', '192.168.1.1'];
    const clientIP = r.remoteAddress;
    
    if (allowedIPs.includes(clientIP)) {
        return '1'; // 允许访问
    } else {
        return '0'; // 拒绝访问
    }
}

// 导出函数
export default { generateJWT, setCustomVariables, handleCookieSession, checkIPAccess }; 
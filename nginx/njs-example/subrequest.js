// NJS脚本示例 - 子请求处理

// 模拟子请求并处理响应
function handleSubRequest(r) {
    // 模拟API响应数据
    let apiData = {
        status: "success",
        message: "数据获取成功",
        timestamp: new Date().toISOString(),
        data: [
            { id: 1, name: "项目1" },
            { id: 2, name: "项目2" },
            { id: 3, name: "项目3" }
        ]
    };
    
    // 构建一个包含"子请求"结果的响应
    let response = {
        source: "子请求处理器(模拟)",
        timestamp: new Date().toISOString(),
        apiData: apiData
    };
    
    // 设置Content-Type头
    r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
    
    // 返回处理后的数据
    r.return(200, JSON.stringify(response, null, 2));
}

// 聚合多个结果
function aggregateResults(r) {
    // 模拟两个不同的API响应
    let apiData1 = {
        status: "success",
        message: "Node.js API响应",
        timestamp: new Date().toISOString(),
        data: [
            { id: 1, name: "Node项目1" },
            { id: 2, name: "Node项目2" }
        ]
    };
    
    let apiData2 = {
        status: "success",
        message: "NJS API响应",
        timestamp: new Date().toISOString(),
        data: [
            { id: 101, name: "NJS项目1" },
            { id: 102, name: "NJS项目2" }
        ]
    };
    
    // 构建聚合响应
    let response = {
        source: "聚合处理器(模拟)",
        timestamp: new Date().toISOString(),
        nodeApiData: apiData1,
        njsApiData: apiData2
    };
    
    // 设置Content-Type头
    r.headersOut['Content-Type'] = 'application/json; charset=utf-8';
    
    // 返回聚合数据
    r.return(200, JSON.stringify(response, null, 2));
}

// 根据子请求结果条件处理
function conditionalProcessing(r) {
    // 直接返回信息而不进行复杂的子请求链
    r.headersOut['Content-Type'] = 'text/html; charset=utf-8';
    r.return(200, `<html><body>
        <h2>条件处理示例</h2>
        <p>这个示例展示了如何根据条件处理请求。</p>
        <p>在真实环境中，可以根据认证状态、用户角色等条件进行不同处理。</p>
        <p>请使用基本认证访问 <a href="/njs/basic-auth">认证页面</a>。</p>
        </body></html>`);
}

// 导出函数
export default { handleSubRequest, aggregateResults, conditionalProcessing }; 
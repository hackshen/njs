// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  console.log('页面已加载，JavaScript已初始化');
  
  // 显示当前时间
  const timeElement = document.createElement('div');
  timeElement.className = 'container';
  timeElement.innerHTML = `
    <h2>服务器时间</h2>
    <p>当前客户端时间: ${new Date().toLocaleString()}</p>
    <button id="serverTimeButton">获取服务器时间</button>
    <p id="serverTime"></p>
  `;
  
  document.body.appendChild(timeElement);
  
  // 绑定获取服务器时间的事件
  document.getElementById('serverTimeButton').addEventListener('click', async () => {
    const serverTimeElement = document.getElementById('serverTime');
    serverTimeElement.textContent = '获取中...';
    
    try {
      const response = await fetch('/api/info');
      const data = await response.json();
      
      serverTimeElement.textContent = `服务器时间: ${new Date(data.timestamp).toLocaleString()}`;
    } catch (error) {
      serverTimeElement.textContent = `错误: ${error.message}`;
    }
  });
}); 
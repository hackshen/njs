FROM node:18-alpine

# 创建工作目录
WORKDIR /app

# 复制依赖文件
COPY app/package*.json ./

# 安装依赖
RUN npm install

# 复制应用代码
COPY app/ ./

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["npm", "start"] 
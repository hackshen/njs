FROM nginx:alpine

# 安装NJS模块
RUN apk add --no-cache nginx-module-njs

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 创建NJS脚本目录
RUN mkdir -p /etc/nginx/njs-scripts

# 复制NJS脚本到指定目录
COPY nginx/njs-example/http.js /etc/nginx/njs-scripts/
COPY nginx/njs-example/variables.js /etc/nginx/njs-scripts/
COPY nginx/njs-example/auth.js /etc/nginx/njs-scripts/
COPY nginx/njs-example/subrequest.js /etc/nginx/njs-scripts/

# 复制配置文件
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 复制静态文件
COPY app/public/ /usr/share/nginx/html/

# 添加NJS模块加载指令到nginx.conf
RUN echo 'load_module modules/ngx_http_js_module.so;' > /tmp/nginx_modules.conf && \
    cat /etc/nginx/nginx.conf > /tmp/nginx.conf && \
    sed -i '1s/^/include \/tmp\/nginx_modules.conf;\n/' /tmp/nginx.conf && \
    mv /tmp/nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"] 
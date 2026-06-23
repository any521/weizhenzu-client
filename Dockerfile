# 味真足 - 用户端 Dockerfile（uni-app H5 构建 + Nginx 运行）
FROM node:20-alpine AS builder
WORKDIR /build

# 复制 package 文件并安装依赖
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# 复制源码
COPY . .

# 设置构建时环境变量
ARG VITE_API_BASE_URL=http://localhost:8080
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# 构建 H5
RUN npm run build:h5

# ==================== 运行阶段 ====================
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /build/dist/build/h5 /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget -q --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]

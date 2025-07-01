#!/bin/bash

# 构建脚本用于准备 npm 发布（使用 bun）

echo "🔨 开始构建 React DOI Card 组件库..."

# 清理旧的构建文件
if [ -d "dist" ]; then
  echo "🧹 清理旧的构建文件..."
  rm -rf dist
fi

# 安装依赖
echo "📦 使用 bun 安装依赖..."
bun install

# 类型检查
echo "🔍 运行类型检查..."
bun run tsc --noEmit --skipLibCheck

# 构建库
echo "🏗️ 构建组件库..."
bun run rollup -c

# 生成类型定义文件
echo "📝 生成类型定义文件..."
bun run tsc --project tsconfig.lib.json --declaration --emitDeclarationOnly --outDir dist

# 复制 README
echo "📄 复制文档..."
cp src/README.md dist/README.md

# 验证构建结果
echo "🔍 验证构建结果..."
echo "构建文件列表："
ls -la dist/

echo ""
echo "✅ 构建完成！"
echo ""
echo "📂 构建输出："
echo "  dist/index.js      - CommonJS 版本"
echo "  dist/index.esm.js  - ES Module 版本"
echo "  dist/index.d.ts    - TypeScript 类型定义"
echo "  dist/README.md     - 用户文档"
echo ""
echo "🚀 发布到 npm："
echo "  npm publish"
echo ""
echo "📦 使用 bun 进行本地开发："
echo "  bun run dev         - 启动开发服务器"
echo "  bun run build-lib   - 构建组件库"
echo "  bun run type-check  - 类型检查"

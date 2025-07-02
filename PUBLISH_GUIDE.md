# 发布指南

## 概述

React DOI Card 项目已完成 TypeScript 重构，可以发布到 NPM。

## 项目结构

```
├── src/                  # 源代码
│   ├── components/       # React 组件
│   ├── hooks/           # 自定义 Hook
│   ├── types/           # TypeScript 类型
│   └── index.ts         # 入口文件
├── dist/                # 构建输出
├── package.json         # NPM 配置
├── tsconfig.json        # TypeScript 配置
└── rollup.config.js     # 构建配置
```

## 发布流程

### 1. 环境准备

```bash
# 安装 bun（推荐）
curl -fsSL https://bun.sh/install | bash

# 安装依赖
bun install
```

### 2. 构建组件库

```bash
# 构建
bun run build-lib

# 验证构建
bun run verify-build
```

### 3. 测试

```bash
# 类型检查
bun run type-check

# 本地测试
bun run dev
```

### 4. 发布到 NPM

```bash
# 登录 NPM
npm login

# 发布
npm publish
```

## 构建输出

构建完成后，`dist/` 目录将包含：
- `index.js` - CommonJS 版本
- `index.esm.js` - ES Module 版本  
- `index.d.ts` - TypeScript 声明文件

## 版本管理

```bash
# 更新版本
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

## 注意事项

1. 确保所有依赖都在 `peerDependencies` 中
2. 测试在不同 React 版本下的兼容性
3. 更新 README 和文档
4. 检查 `.npmignore` 文件

## 自动化发布

可以配置 GitHub Actions 自动发布：

```yaml
# .github/workflows/publish.yml
name: Publish to NPM
on:
  push:
    tags: ['v*']
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build-lib
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

# 安装项目依赖
bun install
```

### 第二步：构建库

```bash
# 方式1: 使用构建脚本
./build.sh

# 方式2: 手动构建
bun run build-lib
```

### 第三步：测试构建

```bash
# 检查构建输出
ls -la dist/

# 预期文件:
# - index.js (CommonJS)
# - index.esm.js (ES Module) 
# - index.d.ts (TypeScript定义)
# - README.md (文档)

# 运行类型检查
bun run type-check
```

### 第四步：发布到NPM

```bash
# 登录NPM (如果没有登录)
npm login

# 发布包
npm publish

# 或者先测试发布
npm publish --dry-run
```

## 📝 包信息

- **包名**: `react-doi-card`
- **版本**: `1.0.0`
- **主入口**: `dist/index.js`
- **ES模块**: `dist/index.esm.js`
- **类型定义**: `dist/index.d.ts`

## 🎯 使用方式

发布后，用户可以这样使用：

```bash
npm install react-doi-card
```

```tsx
import { DoiCard } from 'react-doi-card';

function App() {
  return <DoiCard doi="10.1000/182" lang="zh" />;
}
```

## 🔧 开发模式（使用 Bun）

对于本地开发和演示，Next.js应用仍然可用：

```bash
bun run dev
# 访问 http://localhost:3000
```

### 其他 Bun 命令

```bash
# 清理项目
bun run clean

# 重新安装（清理后安装）
bun run install:clean

# 类型检查
bun run type-check

# 构建组件库
bun run build-lib
```

## 📋 待办事项

- [ ] 设置GitHub Actions自动发布
- [ ] 添加单元测试
- [ ] 创建在线文档站点
- [ ] 添加更多示例

## 🐛 注意事项（Bun 版本）

1. **Bun 环境**: 确保系统已安装 Bun（推荐使用最新版本）
2. **权限问题**: 发布到npm需要适当的账户权限
3. **版本管理**: 每次发布前记得更新version
4. **依赖管理**: React作为peerDependency，不会打包到最终产物中
5. **Bun 兼容性**: 某些 npm 包可能与 bun 不完全兼容，但核心功能正常

## 📚 相关文档

- [NPM发布指南](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
- [Rollup配置文档](https://rollupjs.org/guide/en/)
- [TypeScript库发布最佳实践](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

# React DOI Card - 发布指南

## 📦 NPM 包发布结构重构完成

项目已成功重构为 TypeScript 并准备发布到 NPM。以下是主要变更和发布流程：

## 🔄 重构内容

### 1. 项目结构调整

```
├── src/                          # 源代码目录
│   ├── components/
│   │   └── DoiCard.tsx          # 主组件（TS版本）
│   ├── hooks/
│   │   └── useDoiData.ts        # 自定义Hook（TS版本）
│   ├── types/
│   │   └── index.ts             # 类型定义
│   ├── index.ts                 # 主入口文件
│   └── README.md                # NPM包文档
├── dist/                        # 构建输出目录
├── app/                         # Next.js应用（开发演示用）
├── package.json                 # NPM配置
├── tsconfig.json               # TypeScript配置
├── tsconfig.lib.json           # 库构建TS配置
├── rollup.config.js            # 构建配置
└── .npmignore                  # NPM发布忽略文件
```

### 2. TypeScript 重构

- ✅ 完整的 TypeScript 类型定义
- ✅ 严格的类型检查
- ✅ 导出所有必要的类型接口
- ✅ 零运行时类型错误

### 3. 构建系统

- ✅ Rollup 构建配置
- ✅ CommonJS + ES Module 双格式输出
- ✅ TypeScript 声明文件生成
- ✅ 依赖外部化（React作为peer dependency）

## 🚀 发布流程（使用 Bun）

### 第一步：安装依赖

```bash
# 安装 bun（如果没有安装）
curl -fsSL https://bun.sh/install | bash

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

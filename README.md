# DOI Stats Card API

这是一个用于生成DOI统计卡片的API服务，专门设计用于Vercel部署。

## API端点

### `/api/doi-card`

生成DOI统计卡片的SVG图像。

**参数：**
- `doi`: DOI标识符（必需）
- 其他可选参数请参考API代码

**示例：**
```
GET /api/doi-card?doi=10.1000/example
```

## 部署配置

此项目配置为在Vercel上部署，具有以下特性：

1. **API路由保留**: `/api/*` 路径将正常访问API功能
2. **自动重定向**: 所有其他路径将重定向到GitHub页面
3. **最小化部署**: 只包含必要的API文件，去除了前端资源

## 配置文件

- `vercel.json`: Vercel部署配置，包含重写规则和函数配置
- `next.config.mjs`: Next.js配置，设置重定向规则

## 部署到Vercel

1. 更新 `vercel.json` 和 `next.config.mjs` 中的GitHub URL
2. 推送代码到您的GitHub仓库
3. 在Vercel中连接您的GitHub仓库
4. 部署完成后，API将在 `https://your-project.vercel.app/api/doi-card` 可用

## 使用说明

部署后，您可以通过以下方式使用API：

```bash
curl "https://your-project.vercel.app/api/doi-card?doi=YOUR_DOI_HERE"
```

所有非API路径的访问都会重定向到您的GitHub项目页面。

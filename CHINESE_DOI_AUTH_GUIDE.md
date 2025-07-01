# 中文DOI认证使用指南

## 🔐 中文DOI系统认证

组件现在支持使用中国DOI系统的OpenURL接口来获取中文文献数据，但需要有效的账号认证。

### 📋 基本使用

```tsx
import { DoiCard } from 'react-doi-card';

function App() {
  return (
    <div>
      {/* 英文文献 - 无需认证 */}
      <DoiCard doi="10.1038/nature12373" lang="en" />
      
      {/* 中文文献 - 需要认证 */}
      <DoiCard 
        doi="10.11821/dlxb202001001" 
        lang="zh" 
        chineseDoiAuth={{
          username: "your_username",  // 替换为您的用户名
          password: "your_password"   // 替换为您的密码
        }}
      />
    </div>
  );
}
```

### 🔑 获取中国DOI系统账号

1. 访问 [中国DOI官网](http://www.chinadoi.cn/)
2. 注册成为会员用户
3. 获取用户名和密码
4. 在组件中使用认证信息

### 📡 API调用流程

#### 中文文献 (lang='zh' 或 'cn')
```
DoiCard → 中国DOI OpenURL接口 (需要认证)
  ↓ 成功
显示中文文献信息
  ↓ 失败/无认证
自动回退到 CrossRef API → 显示英文信息
```

#### 英文文献 (lang='en')
```
DoiCard → CrossRef API (无需认证) → 显示英文文献信息
```

### ⚠️ 重要说明

1. **认证必需性**：中文DOI查询必须提供有效的 `chineseDoiAuth` 参数
2. **智能回退**：如果认证失败或无认证信息，组件会自动回退到CrossRef API
3. **CORS限制**：中国DOI OpenURL接口支持跨域调用
4. **安全性**：请妥善保管您的认证信息，避免在客户端暴露

### 🔧 Props说明

```typescript
interface DoiCardProps {
  doi: string;                    // DOI码
  lang?: 'en' | 'zh' | 'cn';     // 语言设置
  className?: string;             // CSS类名
  style?: CSSProperties;          // 自定义样式
  chineseDoiAuth?: {              // 中文DOI认证 (可选)
    username: string;             // 中国DOI系统用户名
    password: string;             // 中国DOI系统密码
  };
}
```

### 🚀 错误处理

组件内置了完整的错误处理：

- **无认证信息**：显示提示需要认证的错误信息
- **认证失败**：自动回退到CrossRef API
- **网络错误**：显示网络连接错误
- **DOI不存在**：显示DOI未找到错误

### 📚 示例

```tsx
// 完整示例
import React from 'react';
import { DoiCard } from 'react-doi-card';

function DoiCardExample() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>英文文献</h2>
      <DoiCard doi="10.1038/nature12373" lang="en" />
      
      <h2>中文文献 (有认证)</h2>
      <DoiCard 
        doi="10.11821/dlxb202001001" 
        lang="zh" 
        chineseDoiAuth={{
          username: process.env.REACT_APP_CHINADOI_USERNAME,
          password: process.env.REACT_APP_CHINADOI_PASSWORD
        }}
      />
      
      <h2>中文文献 (无认证，会回退到CrossRef)</h2>
      <DoiCard doi="10.11821/dlxb202001001" lang="zh" />
    </div>
  );
}

export default DoiCardExample;
```

### 🌍 环境变量配置

建议将认证信息存储在环境变量中：

```bash
# .env
REACT_APP_CHINADOI_USERNAME=your_username
REACT_APP_CHINADOI_PASSWORD=your_password
```

```tsx
// 在组件中使用
<DoiCard 
  doi="10.11821/dlxb202001001" 
  lang="zh" 
  chineseDoiAuth={{
    username: process.env.REACT_APP_CHINADOI_USERNAME!,
    password: process.env.REACT_APP_CHINADOI_PASSWORD!
  }}
/>
```

---

## ✅ 更新完成

现在DOI Card组件已经支持：

1. ✅ **中文DOI认证**：通过用户名/密码访问中国DOI OpenURL接口
2. ✅ **智能回退**：认证失败时自动使用CrossRef API
3. ✅ **完整类型支持**：TypeScript类型定义包含认证参数
4. ✅ **错误处理**：优雅处理认证错误和网络问题
5. ✅ **安全性考虑**：支持环境变量配置认证信息

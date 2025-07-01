import React from 'react';
import { DoiCard } from '../src';

/**
 * 独立组件库测试示例
 * 演示如何使用完全独立的DOI卡片组件，直接调用外部API
 */
function TestDoiCard() {
  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>🧪 DOI Card 独立组件测试</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>📚 英文文献测试 (CrossRef API)</h2>
        <p>直接调用 CrossRef API 获取数据</p>
        <DoiCard doi="10.1038/nature12373" lang="en" />
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>📚 中文文献测试 (中国DOI OpenURL)</h2>
        <p>直接调用中国DOI OpenURL接口获取数据 (需要认证)</p>
        <DoiCard 
          doi="10.11821/dlxb202001001" 
          lang="zh" 
          chineseDoiAuth={{
            username: "your_username", // 替换为真实的用户名
            password: "your_password"  // 替换为真实的密码
          }}
        />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          注意：需要有效的中国DOI系统账号。如果认证失败，将自动回退到CrossRef API。
        </p>
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>❌ 错误处理测试</h2>
        <p>测试无效DOI的错误处理</p>
        <DoiCard doi="10.9999/invalid.doi" lang="en" />
      </div>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>📏 长文本换行测试</h2>
        <p>测试超长标题、作者名、期刊名的自动换行</p>
        <DoiCard doi="10.1016/j.jocs.2023.102134" lang="en" />
      </div>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f0f8ff', 
        borderRadius: '8px',
        border: '1px solid #0078d4'
      }}>
        <h3>✅ 组件特性验证</h3>
        <ul>
          <li>✅ <strong>完全独立</strong>：不依赖任何本地API端点</li>
          <li>✅ <strong>直接调用外部API</strong>：CrossRef API + 中国DOI OpenURL接口</li>
          <li>✅ <strong>认证支持</strong>：中文DOI支持用户名/密码认证</li>
          <li>✅ <strong>智能回退</strong>：认证失败时自动回退到CrossRef API</li>
          <li>✅ <strong>多语言支持</strong>：英文(en) 和 中文(zh/cn)</li>
          <li>✅ <strong>自动换行</strong>：所有文本内容支持长文本自动换行</li>
          <li>✅ <strong>错误处理</strong>：优雅的错误状态显示</li>
          <li>✅ <strong>加载状态</strong>：友好的加载提示</li>
          <li>✅ <strong>TypeScript支持</strong>：完整的类型定义</li>
          <li>✅ <strong>CORS友好</strong>：支持跨域调用</li>
        </ul>
      </div>
    </div>
  );
}

export default TestDoiCard;

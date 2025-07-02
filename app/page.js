'use client';

import DoiCard from '../src/components/DoiCard';

export default function HomePage() {
  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif' 
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>DOI Stats Card</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>
          一个用于显示DOI文献信息的React组件和API服务
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2>React 组件使用示例</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          使用 <code>&lt;DoiCard doi="完整链接" lang="zh" /&gt;</code> 组件来显示文献信息
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <h3>英文文献示例</h3>
          <DoiCard doi="10.1038/s41598-025-01756-y" />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>中文文献示例</h3>
          <DoiCard doi="https://doi.org/10.13412/j.cnki.zyyl.20240712.001" lang="zh" />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>纯DOI码用法</h3>
          <DoiCard doi="10.1016/j.ijbiomac.2024.133614" />
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>API 使用方法</h2>
        <p>你也可以直接使用API端点来获取SVG格式的DOI卡片：</p>
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '1rem', 
          borderRadius: '4px', 
          border: '1px solid #ddd',
          fontFamily: 'monospace',
          fontSize: '14px',
          marginTop: '1rem'
        }}>
          <div>GET /api/doi-card?doi=10.1000/182&lang=en</div>
          <div>GET /api/doi-card?doi=10.1000/182&lang=zh</div>
        </div>
      </div>
    </div>
  );
}

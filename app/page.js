export default function HomePage() {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      fontFamily: 'system-ui, sans-serif' 
    }}>
      <h1>DOI Stats Card API</h1>
      <p>这是一个API服务，用于生成DOI统计卡片。</p>
      <p>正在重定向到GitHub页面...</p>
      <script dangerouslySetInnerHTML={{
        __html: `
          if (typeof window !== 'undefined') {
            window.location.href = 'https://github.com/yourusername/doi_stats_card';
          }
        `
      }} />
    </div>
  );
}

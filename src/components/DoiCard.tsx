import React from 'react';
import { DoiCardProps, ErrorCardProps, LoadingCardProps } from '../types';
import { useDoiData } from '../hooks/useDoiData';

// 内联样式定义
const styles = {
  card: {
    width: '550px',
    background: '#ffffff',
    border: '1px solid #e1dfdd',
    borderRadius: '8px',
    padding: '18px',
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    boxSizing: 'border-box' as const,
    wordWrap: 'break-word' as const,
    overflowWrap: 'break-word' as const,
  },
  errorCard: {
    width: '550px',
    minHeight: '130px',
    background: '#ffffff',
    border: '1.5px solid #d13438',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    wordWrap: 'break-word' as const,
    overflowWrap: 'break-word' as const,
  },
  loadingCard: {
    width: '550px',
    height: '120px',
    background: '#ffffff',
    border: '1px solid #e1dfdd',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  title: {
    color: '#323130',
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: 1.4,
    margin: '0 0 16px 0',
    wordWrap: 'break-word' as const,
    overflowWrap: 'break-word' as const,
    whiteSpace: 'normal' as const,
  },
  section: {
    marginBottom: '16px',
  },
  sectionLast: {
    marginBottom: '0',
  },
  label: {
    color: '#a19f9d',
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: '4px',
  },
  text: {
    color: '#605e5c',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.4,
    margin: '0',
    wordWrap: 'break-word' as const,
    overflowWrap: 'break-word' as const,
    whiteSpace: 'normal' as const,
  },
  link: {
    color: '#0078d4',
    fontSize: '12px',
    fontWeight: 500,
    textDecoration: 'none',
    lineHeight: 1.4,
    display: 'inline-block',
    wordWrap: 'break-word' as const,
    overflowWrap: 'break-word' as const,
    whiteSpace: 'normal' as const,
    maxWidth: '100%',
  },
  errorTitle: {
    color: '#d13438',
    fontSize: '15px',
    fontWeight: 600,
    margin: '0 0 8px 0',
    wordWrap: 'break-word' as const,
    overflowWrap: 'break-word' as const,
    whiteSpace: 'normal' as const,
  },
  errorText: {
    color: '#605e5c',
    fontSize: '12px',
    fontWeight: 400,
    margin: '4px 0',
    wordWrap: 'break-word' as const,
    overflowWrap: 'break-word' as const,
    whiteSpace: 'normal' as const,
  },
  loadingContent: {
    textAlign: 'center' as const,
  },
  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #e1dfdd',
    borderTop: '2px solid #0078d4',
    borderRadius: '50%',
    margin: '0 auto 10px auto',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: '#605e5c',
    fontSize: '12px',
    margin: '0',
    wordWrap: 'break-word' as const,
    overflowWrap: 'break-word' as const,
    whiteSpace: 'normal' as const,
  },
};

// CSS动画样式
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/**
 * 错误卡片组件
 */
const ErrorCard: React.FC<ErrorCardProps> = ({ error }) => (
  <>
    <style>{spinKeyframes}</style>
    <div style={styles.errorCard}>
      <div>
        <h3 style={styles.errorTitle}>❌ 获取DOI信息失败</h3>
        <p style={styles.errorText}>错误: {error.substring(0, 60)}</p>
        <p style={styles.errorText}>请检查DOI格式并重试</p>
      </div>
    </div>
  </>
);

/**
 * 加载卡片组件
 */
const LoadingCard: React.FC<LoadingCardProps> = ({ message = '正在获取DOI信息...' }) => (
  <>
    <style>{spinKeyframes}</style>
    <div style={styles.loadingCard}>
      <div style={styles.loadingContent}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>{message}</p>
      </div>
    </div>
  </>
);

/**
 * DOI Card 主组件
 */
const DoiCard: React.FC<DoiCardProps> = ({ 
  doi, 
  lang = 'en', 
  className = '', 
  style = {},
  chineseDoiAuth
}) => {
  const { data, loading, error } = useDoiData(doi, lang);

  if (loading) {
    return <LoadingCard />;
  }

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!data) {
    return <ErrorCard error="未能获取数据" />;
  }

  const cardStyle = { ...styles.card, ...style };

  return (
    <div className={className} style={cardStyle}>
      <h2 style={styles.title}>{data.title}</h2>
      
      <div style={styles.section}>
        <label style={styles.label}>AUTHORS</label>
        <p style={styles.text}>{data.authors}</p>
      </div>
      
      <div style={styles.section}>
        <label style={styles.label}>PUBLISHED IN</label>
        <p style={styles.text}>{data.journal}</p>
      </div>
      
      <div style={styles.sectionLast}>
        <label style={styles.label}>DOI</label>
        <a 
          href={data.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.link}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#106ebe';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#0078d4';
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          {data.doi}
        </a>
      </div>
    </div>
  );
};

export default DoiCard;
export { ErrorCard, LoadingCard };

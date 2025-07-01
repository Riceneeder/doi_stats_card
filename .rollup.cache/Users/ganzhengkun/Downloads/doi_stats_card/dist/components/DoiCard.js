import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
        boxSizing: 'border-box',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
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
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
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
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
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
        textTransform: 'uppercase',
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
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
    },
    link: {
        color: '#0078d4',
        fontSize: '12px',
        fontWeight: 500,
        textDecoration: 'none',
        lineHeight: 1.4,
        display: 'inline-block',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
        maxWidth: '100%',
    },
    errorTitle: {
        color: '#d13438',
        fontSize: '15px',
        fontWeight: 600,
        margin: '0 0 8px 0',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
    },
    errorText: {
        color: '#605e5c',
        fontSize: '12px',
        fontWeight: 400,
        margin: '4px 0',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
    },
    loadingContent: {
        textAlign: 'center',
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
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'normal',
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
const ErrorCard = ({ error }) => (_jsxs(_Fragment, { children: [_jsx("style", { children: spinKeyframes }), _jsx("div", { style: styles.errorCard, children: _jsxs("div", { children: [_jsx("h3", { style: styles.errorTitle, children: "\u274C \u83B7\u53D6DOI\u4FE1\u606F\u5931\u8D25" }), _jsxs("p", { style: styles.errorText, children: ["\u9519\u8BEF: ", error.substring(0, 60)] }), _jsx("p", { style: styles.errorText, children: "\u8BF7\u68C0\u67E5DOI\u683C\u5F0F\u5E76\u91CD\u8BD5" })] }) })] }));
/**
 * 加载卡片组件
 */
const LoadingCard = ({ message = '正在获取DOI信息...' }) => (_jsxs(_Fragment, { children: [_jsx("style", { children: spinKeyframes }), _jsx("div", { style: styles.loadingCard, children: _jsxs("div", { style: styles.loadingContent, children: [_jsx("div", { style: styles.loadingSpinner }), _jsx("p", { style: styles.loadingText, children: message })] }) })] }));
/**
 * DOI Card 主组件
 */
const DoiCard = ({ doi, lang = 'en', className = '', style = {}, chineseDoiAuth }) => {
    const { data, loading, error } = useDoiData(doi, lang);
    if (loading) {
        return _jsx(LoadingCard, {});
    }
    if (error) {
        return _jsx(ErrorCard, { error: error });
    }
    if (!data) {
        return _jsx(ErrorCard, { error: "\u672A\u80FD\u83B7\u53D6\u6570\u636E" });
    }
    const cardStyle = Object.assign(Object.assign({}, styles.card), style);
    return (_jsxs("div", { className: className, style: cardStyle, children: [_jsx("h2", { style: styles.title, children: data.title }), _jsxs("div", { style: styles.section, children: [_jsx("label", { style: styles.label, children: "AUTHORS" }), _jsx("p", { style: styles.text, children: data.authors })] }), _jsxs("div", { style: styles.section, children: [_jsx("label", { style: styles.label, children: "PUBLISHED IN" }), _jsx("p", { style: styles.text, children: data.journal })] }), _jsxs("div", { style: styles.sectionLast, children: [_jsx("label", { style: styles.label, children: "DOI" }), _jsx("a", { href: data.url, target: "_blank", rel: "noopener noreferrer", style: styles.link, onMouseEnter: (e) => {
                            e.currentTarget.style.color = '#106ebe';
                            e.currentTarget.style.textDecoration = 'underline';
                        }, onMouseLeave: (e) => {
                            e.currentTarget.style.color = '#0078d4';
                            e.currentTarget.style.textDecoration = 'none';
                        }, children: data.doi })] })] }));
};
export default DoiCard;
export { ErrorCard, LoadingCard };
//# sourceMappingURL=DoiCard.js.map
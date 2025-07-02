// File: api/doi-card.js
import fetch from 'node-fetch';
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// 常量配置
const CONFIG = {
    SVG: {
        WIDTH: 550,
        LINE_HEIGHT: 15,
        SECTION_GAP: 8,
        BASE_Y: 28,
        PADDING: 0,
        X_OFFSET: 18
    },
    TEXT_LIMITS: {
        TITLE: 70,
        AUTHORS: 75,
        JOURNAL: 75,
        DOI: 75
    },
    STYLES: {
        title: 'fill:#323130; font-size: 15px; font-weight: 600; font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;',
        author: 'fill:#605e5c; font-size: 12px; font-weight: 400; font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;',
        journal: 'fill:#605e5c; font-size: 12px; font-weight: 400; font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;',
        doi: 'fill:#0078d4; font-size: 12px; font-weight: 500; font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;',
        label: 'fill:#a19f9d; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;',
        bg: 'fill:#ffffff; stroke:#e1dfdd; stroke-width: 1;'
    }
};

// 通用工具函数
const utils = {
    // 文本换行处理
    wrapText(text, maxCharsPerLine) {
        if (!text) return [''];
        
        const words = text.split(' ');
        const lines = [];
        let line = '';
        
        for (const word of words) {
            if ((line + word).length > maxCharsPerLine && line) {
                lines.push(line.trim());
                line = word + ' ';
            } else {
                line += word + ' ';
            }
        }
        
        if (line) lines.push(line.trim());
        return lines.length ? lines : [''];
    },

    // 创建SVG标签元素
    createLabelSVG(text, x, y) {
        return `<text x="${x}" y="${y}" class="label">${this.escapeXml(text)}</text>`;
    },

    // 创建SVG文本元素
    createTextSVG(lines, startY, className, x = CONFIG.SVG.X_OFFSET) {
        return lines.map((line, i) => 
            `<text x="${x}" y="${startY + i * CONFIG.SVG.LINE_HEIGHT}" class="${className}">${this.escapeXml(line)}</text>`
        ).join('\n');
    },

    // 创建SVG链接元素
    createLinkSVG(lines, startY, url, className, x = CONFIG.SVG.X_OFFSET) {
        const textSpans = lines.map((line, i) => 
            `<tspan x="${x}" dy="${i === 0 ? 0 : CONFIG.SVG.LINE_HEIGHT}">${this.escapeXml(line)}</tspan>`
        ).join('');
        
        return `<a xlink:href="${url}" target="_blank"><text x="${x}" y="${startY}" class="${className}">${textSpans}</text></a>`;
    },

    // XML转义
    escapeXml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    },

    // 安全的HTTP请求
    async safeFetch(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
};

// 生成SVG卡片的通用函数
function generateSVGCard(cardData) {
    const { title, authors, journal, doi, url } = cardData;
    
    // 包装文本
    const wrappedTitle = utils.wrapText(title, CONFIG.TEXT_LIMITS.TITLE);
    const wrappedAuthors = utils.wrapText(authors, CONFIG.TEXT_LIMITS.AUTHORS);
    const wrappedJournal = utils.wrapText(journal, CONFIG.TEXT_LIMITS.JOURNAL);
    const wrappedDOI = utils.wrapText(doi, CONFIG.TEXT_LIMITS.DOI);

    // 计算Y坐标
    let currentY = CONFIG.SVG.BASE_Y;
    
    // 标题部分
    const titleSVG = utils.createTextSVG(wrappedTitle, currentY, 'title');
    currentY += wrappedTitle.length * CONFIG.SVG.LINE_HEIGHT + CONFIG.SVG.SECTION_GAP;
    
    // 作者部分
    const authorLabelSVG = utils.createLabelSVG('Authors', CONFIG.SVG.X_OFFSET, currentY);
    currentY += 12;
    const authorSVG = utils.createTextSVG(wrappedAuthors, currentY, 'author');
    currentY += wrappedAuthors.length * CONFIG.SVG.LINE_HEIGHT + CONFIG.SVG.SECTION_GAP;
    
    // 期刊部分
    const journalLabelSVG = utils.createLabelSVG('Published in', CONFIG.SVG.X_OFFSET, currentY);
    currentY += 12;
    const journalSVG = utils.createTextSVG(wrappedJournal, currentY, 'journal');
    currentY += wrappedJournal.length * CONFIG.SVG.LINE_HEIGHT + CONFIG.SVG.SECTION_GAP;
    
    // DOI部分
    const doiLabelSVG = utils.createLabelSVG('DOI', CONFIG.SVG.X_OFFSET, currentY);
    currentY += 12;
    const doiSVG = utils.createLinkSVG(wrappedDOI, currentY, url, 'doi');
    currentY += wrappedDOI.length * CONFIG.SVG.LINE_HEIGHT;
    
    const totalHeight = currentY + CONFIG.SVG.PADDING;

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${CONFIG.SVG.WIDTH}" height="${totalHeight}" viewBox="0 0 ${CONFIG.SVG.WIDTH} ${totalHeight}" 
     fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     role="img" aria-labelledby="title desc">
  <title id="title">DOI Citation Card</title>
  <desc id="desc">Academic paper citation card displaying title, authors, journal, and DOI</desc>
  <style>
    .title { ${CONFIG.STYLES.title} }
    .author { ${CONFIG.STYLES.author} }
    .journal { ${CONFIG.STYLES.journal} }
    .doi { ${CONFIG.STYLES.doi} }
    .label { ${CONFIG.STYLES.label} }
    .bg { ${CONFIG.STYLES.bg} }
    .doi:hover { fill:#106ebe; }
  </style>
  <rect class="bg" width="${CONFIG.SVG.WIDTH}" height="${totalHeight}" rx="8" />
  <g>
${titleSVG}
${authorLabelSVG}
${authorSVG}
${journalLabelSVG}
${journalSVG}
${doiLabelSVG}
${doiSVG}
  </g>
</svg>`;

    return new NextResponse(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
        }
    });
}

// 英文DOI数据获取
async function generateEnDoiCard(doi) {
    try {
        const res = await utils.safeFetch(`https://api.crossref.org/works/${doi}`);
        
        if (!res.ok) {
            throw new Error(`CrossRef API错误: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        const metadata = data.message;

        const cardData = {
            title: metadata.title?.[0] || '无标题',
            authors: (metadata.author || [])
                .map(a => `${a.given || ''} ${a.family || ''}`.trim())
                .filter(name => name)
                .join(', ') || '作者信息未提供',
            journal: [
                metadata['container-title']?.[0] || '期刊信息未提供',
                metadata.issued?.['date-parts']?.[0]?.[0] || '年份未知'
            ].join(', '),
            doi,
            url: `https://doi.org/${doi}`
        };

        return generateSVGCard(cardData);
        
    } catch (error) {
        console.error('获取英文DOI数据失败:', error);
        throw new Error(`获取英文DOI数据失败: ${error.message}`);
    }
}

// 中文DOI数据获取
async function generateCnDoiCard(doi) {
    try {
        const res = await utils.safeFetch(`https://www.chndoi.org/Resolution/Handler?doi=${doi}`);
        
        if (!res.ok) {
            throw new Error(`中国DOI解析失败: ${res.status} ${res.statusText}`);
        }

        const htmlText = await res.text();
        const $ = cheerio.load(htmlText);

        const tableRows = $('table tr');
        if (tableRows.length < 6) {
            throw new Error('HTML结构不完整：表格行数不足');
        }

        // 数据提取映射
        const dataMap = {
            title: { index: 0, label: '题名：', default: '标题信息未提供' },
            authors: { index: 1, label: '作者：', default: '作者信息未提供' },
            journal: { index: 2, label: '来源：', default: '期刊信息未提供' },
            publisher: { index: 3, label: '出版机构：', default: '' },
            published: { index: 4, label: '出版年:', default: '年份信息未提供' },
            doiCode: { index: 5, label: 'DOI码：', default: doi }
        };

        // 提取数据
        const extractedData = {};
        Object.entries(dataMap).forEach(([key, config]) => {
            const rawText = $(tableRows[config.index]).find('td').text();
            extractedData[key] = rawText.replace(config.label, '').trim() || config.default;
        });

        // 获取链接URL
        let url = `https://doi.org/${extractedData.doiCode}`;
        try {
            const firstLink = $('ul li a').first().attr('href');
            if (firstLink) {
                url = firstLink;
            }
        } catch (e) {
            console.warn('无法提取URL链接，使用默认DOI链接:', e.message);
        }

        // 构建期刊信息
        const journalInfo = [
            extractedData.journal,
            extractedData.published
        ].filter(item => item && item !== '期刊信息未提供' && item !== '年份信息未提供')
         .join(', ') || '期刊信息未提供';

        const cardData = {
            title: extractedData.title,
            authors: extractedData.authors,
            journal: journalInfo,
            doi: extractedData.doiCode,
            url
        };

        return generateSVGCard(cardData);
        
    } catch (error) {
        console.error('获取中文DOI数据失败:', error);
        throw new Error(`获取中文DOI数据失败: ${error.message}`);
    }
}

// 主处理函数
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const doi = searchParams.get('doi')?.trim();
        const lang = searchParams.get('lang')?.toLowerCase() || 'en';

        // 参数验证
        if (!doi) {
            return new NextResponse('缺少DOI参数', { 
                status: 400,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
        }

        // DOI格式基本验证
        if (!/^10\.\d{4,}\/\S+$/.test(doi)) {
            return new NextResponse('DOI格式无效', { 
                status: 400,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
        }

        console.log(`处理DOI请求: ${doi}, 语言: ${lang}`);

        // 根据语言选择处理器
        if (lang === 'zh' || lang === 'cn') {
            return await generateCnDoiCard(doi);
        } else {
            return await generateEnDoiCard(doi);
        }
        
    } catch (error) {
        console.error('DOI卡片生成错误:', error);
        
        // 生成错误SVG
        const errorSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="480" height="140" viewBox="0 0 480 140" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Error</title>
  <style>
    .error-title { fill:#d13438; font-size: 15px; font-weight: 600; font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
    .error-text { fill:#605e5c; font-size: 13px; font-weight: 400; font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
    .error-label { fill:#a19f9d; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif; }
    .error-bg { fill:#ffffff; stroke:#d13438; stroke-width: 1; }
  </style>
  <rect class="error-bg" width="480" height="140" rx="8" />
  <text x="20" y="45" class="error-title">Failed to retrieve DOI information</text>
  <text x="20" y="70" class="error-label">Error Details</text>
  <text x="20" y="88" class="error-text">${utils.escapeXml(error.message.substring(0, 60))}</text>
  <text x="20" y="115" class="error-text">Please verify the DOI format and try again</text>
</svg>`;

        return new NextResponse(errorSVG, {
            status: 500,
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'no-cache'
            }
        });
    }
}

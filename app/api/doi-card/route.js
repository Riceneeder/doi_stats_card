// File: api/doi-card.js
import fetch from 'node-fetch';
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

// 常量配置
const CONFIG = {
    SVG: {
        WIDTH: 495,
        LINE_HEIGHT: 16,
        SECTION_GAP: 5,
        BASE_Y: 28,
        PADDING: 10,
        X_OFFSET: 25
    },
    TEXT_LIMITS: {
        TITLE: 75,
        AUTHORS: 80,
        JOURNAL: 80,
        DOI: 80
    },
    STYLES: {
        title: 'fill:rgb(111, 193, 255); font-size: 13px; font-weight: 600;',
        author: 'fill:rgb(0, 0, 0); font-size: 10px; font-weight: 500;',
        journal: 'fill:rgb(0, 0, 0); font-size: 10px; font-style: italic; font-weight: 400;',
        doi: 'fill:rgb(179, 0, 255); font-size: 11px; text-decoration: underline; cursor: pointer; font-weight: 300;',
        bg: 'fill:rgb(255, 250, 241); stroke:rgb(233, 233, 233); stroke-width: 1; rx: 6;'
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
    const wrappedDOI = utils.wrapText(`DOI: ${doi}`, CONFIG.TEXT_LIMITS.DOI);

    // 计算Y坐标
    let currentY = CONFIG.SVG.BASE_Y;
    
    const titleSVG = utils.createTextSVG(wrappedTitle, currentY, 'title');
    currentY += wrappedTitle.length * CONFIG.SVG.LINE_HEIGHT + CONFIG.SVG.SECTION_GAP;
    
    const authorSVG = utils.createTextSVG(wrappedAuthors, currentY, 'author');
    currentY += wrappedAuthors.length * CONFIG.SVG.LINE_HEIGHT + CONFIG.SVG.SECTION_GAP;
    
    const journalSVG = utils.createTextSVG(wrappedJournal, currentY, 'journal');
    currentY += wrappedJournal.length * CONFIG.SVG.LINE_HEIGHT + CONFIG.SVG.SECTION_GAP;
    
    const doiSVG = utils.createLinkSVG(wrappedDOI, currentY, url, 'doi');
    currentY += wrappedDOI.length * CONFIG.SVG.LINE_HEIGHT;
    
    const totalHeight = currentY + CONFIG.SVG.PADDING;

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${CONFIG.SVG.WIDTH}" height="${totalHeight}" viewBox="0 0 500 ${totalHeight}" 
     fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     role="img" aria-labelledby="title desc">
  <title id="title">DOI信息卡片</title>
  <desc id="desc">显示文章标题、作者、期刊和DOI的卡片</desc>
  <style>
    .title { ${CONFIG.STYLES.title} }
    .author { ${CONFIG.STYLES.author} }
    .journal { ${CONFIG.STYLES.journal} }
    .doi { ${CONFIG.STYLES.doi} }
    .bg { ${CONFIG.STYLES.bg} }
  </style>
  <rect class="bg" width="${CONFIG.SVG.WIDTH}" height="${totalHeight}" rx="6" />
  <g>
${titleSVG}
${authorSVG}
${journalSVG}
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
<svg width="495" height="120" viewBox="0 0 500 120" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>错误</title>
  <style>
    .error { fill:rgb(220, 53, 69); font-size: 12px; font-weight: 500; }
    .bg { fill:rgb(248, 249, 250); stroke:rgb(220, 53, 69); stroke-width: 2; rx: 6; }
  </style>
  <rect class="bg" width="495" height="120" rx="6" />
  <text x="25" y="40" class="error">❌ 获取DOI信息失败</text>
  <text x="25" y="65" class="error">错误: ${utils.escapeXml(error.message.substring(0, 60))}</text>
  <text x="25" y="90" class="error">请检查DOI格式并重试</text>
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

import { useState, useEffect, useCallback } from 'react';
import { DoiData, UseDoiDataReturn } from '../types';

/**
 * 工具函数
 */
const utils = {
  /**
   * 安全的HTTP请求
   */
  async safeFetch(url: string, options: RequestInit = {}): Promise<Response> {
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
  },

  /**
   * 从DOI链接提取DOI码
   */
  extractDoi(doiUrl: string): string | null {
    if (!doiUrl) return null;
    
    // 处理完整的DOI链接
    const doiMatch = doiUrl.match(/(?:doi\.org\/|doi:)\s*(10\.\d{4,}\/\S+)/i);
    if (doiMatch) {
      return doiMatch[1];
    }
    
    // 处理纯DOI码
    if (/^10\.\d{4,}\/\S+$/.test(doiUrl)) {
      return doiUrl;
    }
    
    return null;
  }
};

/**
 * 直接从外部DOI服务获取数据
 */
async function fetchDoiDataFromAPI(doi: string, lang: string): Promise<DoiData> {
  try {
    // 根据语言选择不同的API
    if (lang === 'zh' || lang === 'cn') {
      return await fetchChineseDoi(doi);
    } else {
      return await fetchEnglishDoi(doi);
    }
  } catch (error) {
    console.error('获取DOI数据失败:', error);
    const errorMessage = error instanceof Error ? error.message : '获取DOI数据失败';
    throw new Error(`获取DOI数据失败: ${errorMessage}`);
  }
}

/**
 * 获取英文DOI数据 (使用CrossRef API)
 */
async function fetchEnglishDoi(doi: string): Promise<DoiData> {
  try {
    const res = await utils.safeFetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'doi-card-component/1.0 (mailto:contact@example.com)'
      }
    });
    
    if (!res.ok) {
      throw new Error(`CrossRef API错误: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    const metadata = data.message;

    const title = metadata.title?.[0] || '标题信息不可用';
    
    const authors = (metadata.author || [])
      .map((a: any) => `${a.given || ''} ${a.family || ''}`.trim())
      .filter((name: string) => name)
      .join(', ') || '作者信息不可用';
    
    const journal = [
      metadata['container-title']?.[0] || '期刊信息不可用',
      metadata.issued?.['date-parts']?.[0]?.[0] || ''
    ].filter(Boolean).join(', ');

    return {
      title,
      authors,
      journal,
      doi,
      url: `https://doi.org/${doi}`
    };
    
  } catch (error) {
    console.error('获取英文DOI数据失败:', error);
    throw new Error(`获取英文DOI数据失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 获取中文DOI数据 (使用中国DOI解析服务)
 */
async function fetchChineseDoi(doi: string): Promise<DoiData> {
  try {
    const res = await utils.safeFetch(`https://doicard.gankun.cn.ma/api/cndoi?doi=${encodeURIComponent(doi)}`, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (compatible; doi-card-component/1.0)'
      }
    });
    
    if (!res.ok) {
      throw new Error(`中国DOI解析失败: ${res.status} ${res.statusText}`);
    }

    const htmlText = await res.text();
    
    // 由于浏览器环境没有cheerio，我们使用DOM解析
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    
    const tableRows = doc.querySelectorAll('table tr');
    if (tableRows.length < 6) {
      throw new Error('HTML结构不完整：表格行数不足');
    }

    // 数据提取映射
    const dataMap = [
      { key: 'title', label: '题名：', default: '标题信息不可用' },
      { key: 'authors', label: '作者：', default: '作者信息不可用' },
      { key: 'journal', label: '来源：', default: '期刊信息不可用' },
      { key: 'publisher', label: '出版机构：', default: '' },
      { key: 'published', label: '出版年:', default: '年份信息不可用' },
      { key: 'doiCode', label: 'DOI码：', default: doi }
    ];

    // 提取数据
    const extractedData: Record<string, string> = {};
    dataMap.forEach((config, index) => {
      if (tableRows[index]) {
        const tdElement = tableRows[index].querySelector('td');
        const rawText = tdElement?.textContent || '';
        extractedData[config.key] = rawText.replace(config.label, '').trim() || config.default;
      } else {
        extractedData[config.key] = config.default;
      }
    });

    // 获取链接URL
    let url = `https://doi.org/${extractedData.doiCode}`;
    try {
      const firstLink = doc.querySelector('ul li a') as HTMLAnchorElement;
      if (firstLink?.href) {
        url = firstLink.href;
      }
    } catch (e) {
      console.warn('无法提取URL链接，使用默认DOI链接');
    }

    // 构建期刊信息
    const journalInfo = [
      extractedData.journal,
      extractedData.published
    ].filter(item => item && item !== '期刊信息不可用' && item !== '年份信息不可用')
     .join(', ') || '期刊信息不可用';

    return {
      title: extractedData.title,
      authors: extractedData.authors,
      journal: journalInfo,
      doi: extractedData.doiCode,
      url
    };
    
  } catch (error) {
    console.error('获取中文DOI数据失败:', error);
    throw new Error(`获取中文DOI数据失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 自定义Hook for DOI数据获取
 */
export function useDoiData(doi: string, lang: string = 'en'): UseDoiDataReturn {
  const [data, setData] = useState<DoiData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 提取DOI码
      const doiCode = utils.extractDoi(doi);
      if (!doiCode) {
        throw new Error('无效的DOI格式');
      }

      // 验证DOI格式
      if (!/^10\.\d{4,}\/\S+$/.test(doiCode)) {
        throw new Error('DOI格式无效');
      }

      // 使用API端点获取数据
      const result = await fetchDoiDataFromAPI(doiCode, lang);
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '未知错误';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [doi, lang]);

  useEffect(() => {
    if (doi) {
      fetchData();
    } else {
      setError('缺少DOI参数');
      setLoading(false);
    }
  }, [doi, lang, fetchData]);

  return { data, loading, error };
}

export { utils, fetchDoiDataFromAPI };

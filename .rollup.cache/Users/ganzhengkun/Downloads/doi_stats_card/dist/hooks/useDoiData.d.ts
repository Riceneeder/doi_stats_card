import { DoiData, UseDoiDataReturn } from '../types';
/**
 * 工具函数
 */
declare const utils: {
    /**
     * 安全的HTTP请求
     */
    safeFetch(url: string, options?: RequestInit): Promise<Response>;
    /**
     * 从DOI链接提取DOI码
     */
    extractDoi(doiUrl: string): string | null;
};
/**
 * 直接从外部DOI服务获取数据
 */
declare function fetchDoiDataFromAPI(doi: string, lang: string): Promise<DoiData>;
/**
 * 自定义Hook for DOI数据获取
 */
export declare function useDoiData(doi: string, lang?: string): UseDoiDataReturn;
export { utils, fetchDoiDataFromAPI };
//# sourceMappingURL=useDoiData.d.ts.map
import { CSSProperties } from 'react';

export interface DoiCardProps {
  /** DOI码或完整DOI链接 */
  doi: string;
  /** 语言设置，默认为 'en' */
  lang?: 'en' | 'zh' | 'cn';
  /** 自定义CSS类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 中文DOI系统认证信息 (仅在 lang='zh' 或 'cn' 时需要) */
  chineseDoiAuth?: {
    username: string;
    password: string;
  };
}

export interface DoiData {
  title: string;
  authors: string;
  journal: string;
  doi: string;
  url: string;
}

export interface UseDoiDataReturn {
  data: DoiData | null;
  loading: boolean;
  error: string | null;
}

export interface ErrorCardProps {
  error: string;
}

export interface LoadingCardProps {
  message?: string;
}

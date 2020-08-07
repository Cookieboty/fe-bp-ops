import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

interface ArticleListContentProps {
  data: {
    content: React.ReactNode;
    web_url: string;
    logo: string;
    name: string;
    last_activity_at: string;
    description: string;
  };
}

const ArticleListContent: React.FC<ArticleListContentProps> = ({
  data: { content, web_url, logo, name, last_activity_at, description },
}) => (
  <div className={styles.listContent}>
    <p>
      最后更新：
      <em>{moment(last_activity_at).format('YYYY-MM-DD HH:mm')}</em>
    </p>
    <div className={styles.description}>{description || '暂无描述'}</div>
  </div>
);

export default ArticleListContent;

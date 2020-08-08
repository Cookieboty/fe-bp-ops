import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

interface ArticleListContentProps {
  data: {
    content: React.ReactNode;
    projectUrl: string;
    logo: string;
    name: string;
    lastActivityAt: string;
    projectGitDesc: string;
  };
}

const ArticleListContent: React.FC<ArticleListContentProps> = ({
  data: { content, projectUrl, logo, name, lastActivityAt, projectGitDesc },
}) => (
  <div className={styles.listContent}>
    <p>
      最后更新：
      <em>{moment(lastActivityAt).format('YYYY-MM-DD HH:mm')}</em>
    </p>
    <div className={styles.description}>{projectGitDesc || '暂无描述'}</div>
  </div>
);

export default ArticleListContent;

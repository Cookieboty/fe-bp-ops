import React, { FC, useEffect } from 'react';
import { Button, Card, Col, Form, List, Row, Input, Tag } from 'antd';
import { BugOutlined, FormOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { connect, Dispatch, Link } from 'umi';
import ArticleListContent from './components/ArticleListContent';
import { StateType } from './model';
import { ListItemDataType } from './data';
import styles from './style.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface ProjectProps {
  dispatch: Dispatch<any>;
  project: StateType;
  loading: boolean;
}

const Project: FC<ProjectProps> = ({ dispatch, project: { list }, loading }) => {
  useEffect(() => {
    dispatch({
      type: 'project/fetch',
      payload: { pageSize: 9, pageNum: 1 },
    });
  }, []);

  const fetchMore = () => {
    dispatch({
      type: 'project/appendFetch',
      payload: { pageSize: 9, pageNum: 1 },
    });
  };

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <FormOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <BugOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <CheckSquareOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  const mainSearch = (
    <div style={{ textAlign: 'center' }}>
      <Input.Search
        placeholder="请输入"
        enterButton="搜索"
        size="large"
        onSearch={fetchMore}
        style={{ maxWidth: 522, width: '100%' }}
      />
    </div>
  );

  return (
    <PageHeaderWrapper content={mainSearch}>
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List<ListItemDataType>
          size="large"
          loading={list.length === 0 ? loading : false}
          rowKey="id"
          itemLayout="vertical"
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText key="star" type="star-o" text={item.projectFeat || 0} />,
                <IconText key="like" type="like-o" text={item.projectBugfix || 0} />,
                <IconText key="message" type="message" text={item.projectRelease || 0} />,
              ]}
              extra={<div className={styles.listItemExtra} />}
            >
              <List.Item.Meta
                title={
                  <Link className={styles.listItemMetaTitle} to={`projectDetail/${item.id}`}>
                    {item.projectGitName}
                  </Link>
                }
                description={
                  <span>
                    {item.projectType.map((type) => (
                      <Tag>{type}</Tag>
                    ))}
                  </span>
                }
              />
              <ArticleListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    project,
    loading,
  }: {
    project: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    project,
    loading: loading.models.project,
  }),
)(Project);

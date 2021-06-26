import type { FC } from 'react';
import React, { useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
} from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import moment from 'moment';
import VersionModal from './components/VersionModal';
import type { StateType } from './model';
import type { BranchDataType } from './data';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface IProjectDetailProps {
  projectDetail: StateType;
  dispatch: Dispatch;
  loading: boolean;
  match: any;
}


const ListContent = ({ data: { commit, branchStatus } }: { data: BranchDataType }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>最后提交人</span>
      <p>{commit.author_name}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>最后更新时间</span>
      <p>{moment(commit.committed_date).format('YYYY-MM-DD HH:mm')}</p>
    </div>
    <div className={styles.listContentItem} style={{ width: '100px' }}>
      {(() => {
        switch (branchStatus) {
          case 0:
            return <Progress size="small" percent={25} format={() => '开发中'} />;
          case 1:
            return (
              <Progress size="small" percent={25} successPercent={25} format={() => '已提测'} />
            );
          case 2:
            return (
              <Progress size="small" percent={50} successPercent={25} format={() => '测试中'} />
            );
          case 3:
            return <Progress size="small" percent={75} successPercent={50} format={() => '预发'} />;
          case 4:
            return <Progress size="small" percent={100} format={() => '已上线'} />;
          default:
            return '暂无';
        }
      })()}
    </div>
  </div>
);

export const ProjectDetail: FC<IProjectDetailProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    projectDetail: { branchList, project },
    match,
  } = props;

  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BranchDataType> | undefined>(undefined);

  const {
    params: { projectId },
  } = match;

  useEffect(() => {
    dispatch({
      type: 'projectDetail/fetchProject',
      payload: {
        projectId,
      },
    });
  }, [projectId, dispatch]);

  useEffect(() => {
    dispatch({
      type: 'projectDetail/fetchBranchList',
      payload: {
        project,
      },
    });
  }, [project, dispatch]);

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: BranchDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const onClose = () => {
    setVisible(false);
  };

  const deleteItem = (id: string) => {
    dispatch({
      type: 'ProjectDetail/submit',
      payload: { id },
    });
  };

  const editAndDelete = (key: string, currentItem: BranchDataType) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除分支',
        content: '确定删除该分支吗？（流程中的分支不能删除）',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="dev">开发中</RadioButton>
        <RadioButton value="testing">测试中</RadioButton>
        <RadioButton value="pre">预发</RadioButton>
        <RadioButton value="prod">已上线</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );


  const submitTest = (values: BranchDataType) => {
    dispatch({
      type: 'projectDetail/submitTest',
      payload: { ...values },
    });
  }

  const deploy = (values: BranchDataType) => {
    dispatch({
      type: 'projectDetail/deploy',
      payload: { ...values },
    });
  }

  const ActionsBtn: React.FC<{ item: BranchDataType; }> = ({ item }) => {
    const { branchStatus } = item
    switch (branchStatus) {
      case 0:
        return (
          <a
            key="edit"
            onClick={(e) => {
              e.preventDefault();
              submitTest(item);
            }}
          >
            提测
          </a>
        )
      case 1:
        return (
          <a
            key="edit"
            onClick={(e) => {
              e.preventDefault();
              deploy(item);
            }}
          >
            发布
          </a>
        );
      case 2:
        return (
          <a
            key="edit"
            onClick={(e) => {
              e.preventDefault();
              submitTest(item);
            }}
          >
            预发
          </a>
        );
      case 3:
        return (
          <a
            key="edit"
            onClick={(e) => {
              e.preventDefault();
              submitTest(item);
            }}
          >
            生产
          </a>
        )
      default:
        return <></>;
    }
  }

  const MoreBtn: React.FC<{
    item: BranchDataType;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          {(() => {
            switch (item.branchStatus) {
              case 0:
                return <Menu.Item key="delete">删除</Menu.Item>;
              case 1:
                return <Menu.Item key="delete">删除</Menu.Item>;
              case 2:
                return <Menu.Item key="delete">删除</Menu.Item>;
              case 3:
                return <Menu.Item key="delete">删除</Menu.Item>;
              case 4:
                return <Menu.Item key="delete">删除</Menu.Item>;
              default:
                return <Menu.Item key="delete">删除</Menu.Item>;
            }
          })()}
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );


  const handleDone = () => {
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values: BranchDataType) => {
    setDone(true);
    dispatch({
      type: 'ProjectDetail/submit',
      payload: { ...values },
    });
  };


  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>

          <Card
            className={styles.listCard}
            bordered={false}
            title="分支列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              创建分支
            </Button>

            <List
              size="large"
              rowKey="id"
              loading={loading}
              dataSource={branchList}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <ActionsBtn item={item} />,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    title={<a href={item.href}>{item.branchGitName}</a>}
                    description={item.branchName}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <VersionModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
};

export default connect(
  ({
    projectDetail,
    loading,
  }: {
    projectDetail: StateType;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    projectDetail,
    loading: loading.models.projectDetail,
  }),
)(ProjectDetail);

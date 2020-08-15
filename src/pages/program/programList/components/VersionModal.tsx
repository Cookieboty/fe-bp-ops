import React, { FC, useEffect, useState } from 'react';
import { Modal, Form, Radio, Select, Input, Icon } from 'antd';
import { connect, Dispatch } from 'umi';
import { StateType } from '../model';
import { formItemLayout } from '@/constants';

interface VersionEditComponentProps {
  done: boolean;
  visible: boolean;
  current: Partial<BasicListItemDataType> | undefined;
  onDone: () => void;
  onSubmit: (values: BasicListItemDataType) => void;
  onCancel: () => void;
  dispatch: Dispatch<any>;
  projectDetail: StateType;
  onClose: () => void;
}

const { Option } = Select;
const { TextArea } = Input;

const VersionEditComponent: FC<VersionEditComponentProps> = ({
  visible,
  projectDetail: { branchList, project },
  dispatch,
  onClose,
}) => {
  const [form] = Form.useForm();

  const [currentVersion, setCurrentVersion] = useState('');

  // useEffect(() => {
  //   if (form && !visible) {
  //     form.resetFields();
  //   }
  // }, [visible]);

  useEffect(() => {
    onTypeChange(3);
    setCurrentVersion(project.projectVersion || '暂无版本');
  }, [project]);

  const onTypeChange = (value: any) => {
    let _nextVersion = '';
    let _currentVersion = project.projectVersion ? project.projectVersion.split('.') : [0, 0, 0];
    switch (value) {
      case 1:
        _nextVersion = `${Number(_currentVersion[0]) + 1}.0.1`;
        break;
      case 2:
        _nextVersion = `${_currentVersion[0]}.${Number(_currentVersion[1]) + 1}.1`;
        break;
      default:
        _nextVersion = `${_currentVersion[0]}.${_currentVersion[1]}.${
          Number(_currentVersion[2]) + 1
        }`;
        break;
    }
  };

  const submit = () => {
    if (!form) return;
    form.submit();
    // validateFields(async (err, formData) => {
    //   if (!err) {
    //     const { code, data, msg } = await $api.project.createBranch({
    //       id: projectDetail.id,
    //       projectId: projectDetail.projectSourceId,
    //       branchGitName: `zeus/${formData.versions}`,
    //       branchName: formData.name,
    //       projectVersion: formData.versions,
    //       ref: formData.ref,
    //       remarks: formData.remarks,
    //     });
    //     if (code === 0) {
    //       formData.branchId = data.id;
    //       if (projectDetail.projectType === 'android' || projectDetail.projectType === 'ios') {
    //         formData.environment = projectDetail.projectType;
    //       }
    //       onClose();
    //       dispatch({
    //         type: 'project/fetchGitBranch',
    //       });
    //       dispatch({
    //         type: 'project/fetchZeusBranch',
    //       });
    //       dispatch({
    //         type: 'project/fetchProjectDetail',
    //         payload: {
    //           projectId: projectDetail.id,
    //         },
    //       });
    //     }
    //   }
    // });
  };

  return (
    <Modal
      width="720px"
      visible={visible}
      onOk={submit}
      onCancel={onClose}
      okText="确认"
      cancelText="取消"
    >
      <Form {...formItemLayout} form={form}>
        <Form.Item label="任务名称" name="name" rules={[{ required: true, message: '版本名称' }]}>
          <Input placeholder="版本名称" />
        </Form.Item>
        <Form.Item label="版本来源" name="ref" rules={[{ required: true, message: '版本来源' }]}>
          <Select showSearch>
            {branchList &&
              branchList.map((git) => (
                <Option value={git.branchGitName} key={git.branchGitName}>
                  {git.branchGitName}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="更新类型" name="type" initialValue={3}>
          <p>当前版本号：{currentVersion}</p>
          <Radio.Group onChange={(ev) => onTypeChange(ev.target.value)}>
            <Radio value={1}>版本升级</Radio>
            <Radio value={2}>特性更新</Radio>
            <Radio value={3}>修订补丁</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="版本号"
          name="versions"
          rules={[{ required: true, message: '请输入版本号，例如0.0.01' }]}
        >
          <Input
            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="请输入版本号"
          />
        </Form.Item>
        <Form.Item label="备注" name="remarks">
          <TextArea rows={4} placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({ projectDetail }: { projectDetail: StateType }) => ({
  projectDetail,
}))(VersionEditComponent);

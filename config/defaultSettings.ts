/*
 * @Author: Cookie
 * @Date: 2020-08-06 21:46:04
 * @LastEditors: Cookie
 * @LastEditTime: 2021-08-10 23:06:11
 * @Description:
 */

import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = ProSettings & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: false,
  },
  title: 'DevOps',
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;

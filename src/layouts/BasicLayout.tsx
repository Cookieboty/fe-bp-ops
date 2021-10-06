/**
 * DevOps v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings
} from '@ant-design/pro-layout';
import ProLayout, {
  DefaultFooter,
  SettingDrawer,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import type { Dispatch } from 'umi';
import { Link, connect, history } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.svg';
import io from 'socket.io-client';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "http://864665758cc1434ba8ae445cc2fdf1b3@192.168.160.88:9000/2",
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

// browser
const { log } = console;

window.onload = () => {
  // init
  const socket = io('http://devops.cookieboty.com', {
    // 实际使用中可以在这里传递参数
    query: {
      room: 'nsp',
      userId: `client_${Math.random()}`,
    },
    transports: ['websocket']
  });

  socket.on('connect', () => {
    const { id } = socket;

    log('#connect,', id, socket);

    // 监听自身 id 以实现 p2p 通讯
    socket.on(id, (msg: any) => {
      log('#receive,', msg);
    });
    socket.on("res", (msg: any) => {
      log('#receive,', msg);
    });

  });

  // 接收在线用户信息
  socket.on('online', (msg: any) => {
    log('#online,', msg);
  });


  // 系统事件
  socket.on('disconnect', (msg: any) => {
    log('#disconnect', msg);
  });

  socket.on('disconnecting', () => {
    log('#disconnecting');
  });

  socket.on('error', () => {
    log('#error');
  });

  window.socket = socket;
};

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()}`}
    links={[
      {
        key: 'DevOps',
        title: 'DevOps',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  return (
    <>
      <ProLayout
        logo={logo}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: "首页"
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={(config) =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(Sentry.withProfiler(BasicLayout));

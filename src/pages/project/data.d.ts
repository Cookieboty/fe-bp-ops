/*
 * @Author: Cookie
 * @Date: 2020-08-07 20:43:25
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-07 21:33:14
 * @Description:
 */
export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface ListItemDataType {
  id: string;
  name: string;
  logo: string;
  description: string;
  last_activity_at: string;
  member: string;
  web_url: string;
  name_with_namespace: string;
}

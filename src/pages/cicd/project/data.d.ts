/*
 * @Author: Cookie
 * @Date: 2020-08-07 20:43:25
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-08 10:25:11
 * @Description:
 */
export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface ListItemDataType {
  id: string;
  projectGitName: string;
  logo: string;
  projectGitDesc: string;
  lastActivityAt: string;
  member: string;
  projectUrl: string;
  nameWithNamespace: string;
  projectType: string[];
  projectFeat: number;
  projectBugfix: number;
  projectRelease: number;
}

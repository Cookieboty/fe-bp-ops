/*
 * @Author: Cookie
 * @Date: 2020-08-08 09:41:44
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-08 11:17:38
 * @Description:
 */
export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface ProjectDetailDataType {
  id?: string;
  projectGitName?: string;
  logo?: string;
  projectGitDesc?: string;
  lastActivityAt?: string;
  member?: string;
  projectUrl?: string;
  nameWithNamespace?: string;
  projectType?: string[];
  projectFeat?: number;
  projectBugfix?: number;
  projectRelease?: number;
}

export interface BranchDataType {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}

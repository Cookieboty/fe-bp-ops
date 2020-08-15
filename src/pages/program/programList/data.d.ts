/*
 * @Author: Cookie
 * @Date: 2020-08-08 09:41:44
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-08 16:24:47
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
  projectVersion?: string;
}

interface commit {
  author_email: string;
  author_name: string;
  authored_date: string;
  committed_date: string;
  committer_email: string;
  committer_name: string;
  created_at: string;
  id: string;
  message: string;
  parent_ids: string;
  short_id: string;
  title: string;
  web_url: string;
}

export interface BranchDataType {
  id: string;
  commit: commit;
  createdUser: string;
  processId: string;
  projectId: string;
  projectGitId: string;
  remarks: string;
  updateUser: string;
  branchGitName: string;
  branchName: string;
  branchStatus: number;
}

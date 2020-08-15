/*
 * @Author: Cookie
 * @Date: 2020-08-08 09:41:44
 * @LastEditors: Cookie
 * @LastEditTime: 2020-08-15 22:53:21
 * @Description:
 */

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

export interface ProcessDataType {
  branchIds: string[];
  commit: commit;
  workflowTplId: string;
  updateUser: string;
  createdUser: string;
  processStatus: number;
  name: string;
  branches: BranchDataType[];
  updatedAt: string;
}

// export interface ProcessListDataType {
//   count: number;
//   rows: ProcessDataType[];
// }

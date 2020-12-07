import {MRTaskInfo} from './MRTaskInfo';
import {NodeInfo} from './NodeInfo';

export class MasterReportResponse {
  id: string;
  name: string;
  nodeCount: number;
  status: number;
  runningWork: string;
  processedDataSize: number;
  nodes: NodeInfo[];
  mr: MRTaskInfo[];
}

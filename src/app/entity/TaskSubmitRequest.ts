export class TaskSubmitRequest {
  workURL: string;
  inputFiles: string[];
  reduceCount: number;
  appId: number;
  reloadFromResource: boolean;
}

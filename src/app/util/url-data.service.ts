import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlDataService {
  public static baseUrl = 'http://localhost:8000/eyja-dc';

  public static reportUrl = UrlDataService.baseUrl + "/report";

  public static resourceListUrl = UrlDataService.baseUrl + "/resource/list";
  public static resourceUploadUrl = UrlDataService.baseUrl + "/resource/create-file";
  public static resourceDeleteUrl = UrlDataService.baseUrl + "/resource";
  public static resourceReadUrl = UrlDataService.baseUrl + "/resource";

  public static outFileListUrl = UrlDataService.baseUrl + "/out";
  public static outFileCollectUrl = UrlDataService.baseUrl + "/out/collect";

  public static mapReduceSubmitUrl = UrlDataService.baseUrl + "/mr";

  public static raftNodesStatusUrl = UrlDataService.baseUrl + "/kv/status";

  constructor() { }
}

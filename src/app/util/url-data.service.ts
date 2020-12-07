import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlDataService {
  public static baseUrl = 'http://mtage.top:8000/eyja-dc';

  public static reportUrl = UrlDataService.baseUrl + "/report";

  public static resourceListUrl = UrlDataService.baseUrl + "/resource/list";
  public static resourceUploadUrl = UrlDataService.baseUrl + "/resource/create-file";
  public static resourceDeleteUrl = UrlDataService.baseUrl + "/resource";
  public static resourceReadUrl = UrlDataService.baseUrl + "/resource";

  public static outFileListUrl = UrlDataService.baseUrl + "/out";

  public static mapReduceSubmitUrl = UrlDataService.baseUrl + "/mr";

  constructor() { }
}

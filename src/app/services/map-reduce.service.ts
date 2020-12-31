import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SimpleResult} from '../entity/SimpleResult';
import {TaskSubmitRequest} from '../entity/TaskSubmitRequest';
import {UrlDataService} from '../util/url-data.service';

@Injectable({
  providedIn: 'root'
})
export class MapReduceService {

  constructor(private httpC: HttpClient) { }

  public async trySubmitTask(workURL: string, inputFiles: string[], reduceCount: number, appId: number): Promise<string> {
    let request: TaskSubmitRequest = {
      workURL: workURL,
      inputFiles: inputFiles,
      reduceCount: reduceCount,
      appId: appId
    };
    return new Promise<string>(resolve => {
      let result = this.httpC.post<SimpleResult<string>>(UrlDataService.mapReduceSubmitUrl, request);
      result.subscribe(v => {
        if (!v.success) {
          resolve(v.message);
        }
      })
      resolve(null);
    })
  }

}

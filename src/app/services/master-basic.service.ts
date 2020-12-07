import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MasterReportResponse} from '../entity/MasterReportResponse';
import {SimpleResult} from '../entity/SimpleResult';
import {UrlDataService} from '../util/url-data.service';

@Injectable({
  providedIn: 'root'
})
export class MasterBasicService {

  constructor(private httpC: HttpClient) { }

  public async getMasterReport(): Promise<MasterReportResponse> {
    return new Promise<MasterReportResponse>(resolve => {
      let result = this.httpC.get<SimpleResult<MasterReportResponse>>(UrlDataService.reportUrl);
      result.subscribe(v => {
        v.data.mr.forEach(mr => {
          mr.createTime = new Date(Date.parse(mr.createTime.toString()));
          mr.finishTime = new Date(Date.parse(mr.createTime.toString()));
        })
        resolve(v.data);
      })
    })
  }


}

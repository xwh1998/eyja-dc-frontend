import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {KVNodeReportResponse} from '../entity/KVNodeReportResponse';
import {MasterReportResponse} from '../entity/MasterReportResponse';
import {SimpleResult} from '../entity/SimpleResult';
import {UrlDataService} from '../util/url-data.service';

@Injectable({
  providedIn: 'root'
})
export class MasterBasicService {

  constructor(private httpC: HttpClient) {
    console.log('MasterBasicService');
    this.reportObs = new Subject<MasterReportResponse>();
    this.kvReportObs = new Subject<KVNodeReportResponse[]>();
    this.httpC.get<SimpleResult<MasterReportResponse>>(UrlDataService.reportUrl)
      .subscribe(v => this.reportObs.next(v.data));
    this.httpC.get<SimpleResult<KVNodeReportResponse[]>>(UrlDataService.raftNodesStatusUrl)
      .subscribe(v => {
        console.log("kv node report: " + JSON.stringify(v))
        this.kvReportObs.next(v.data)
      });
  }

  private readonly reportObs: Subject<MasterReportResponse>;
  private readonly kvReportObs: Subject<KVNodeReportResponse[]>;
  private lastUpTime = Date.now();
  private fetched = false;
  private report: MasterReportResponse;

  public getMasterReport(): Subject<MasterReportResponse> {
    return this.reportObs;
  }

  public getKVReport(): Subject<KVNodeReportResponse[]> {
    return this.kvReportObs;
  }

  // private async fetchMasterReport() {
  //   console.log("fetch master report...");
  //   return new Promise<MasterReportResponse>(resolve => {
  //     let result = this.httpC.get<SimpleResult<MasterReportResponse>>(UrlDataService.reportUrl);
  //     result.subscribe(v => {
  //       v.data.mr.forEach(mr => {
  //         mr.createTime = new Date(Date.parse(mr.createTime.toString()));
  //         mr.finishTime = new Date(Date.parse(mr.createTime.toString()));
  //       });
  //       console.log("set fetched true");
  //       this.fetched = true;
  //       this.lastUpTime = Date.now();
  //       this.report = v.data;
  //       resolve(v.data);
  //     })
  //   })
  // }

}

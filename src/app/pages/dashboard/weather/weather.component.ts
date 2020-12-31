import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {MasterReportResponse} from '../../../entity/MasterReportResponse';
import {MasterBasicService} from '../../../services/master-basic.service';

@Component({
  selector: 'app-weather',
  styleUrls: ['./weather.component.scss'],
  templateUrl: './weather.component.html',
})


export class WeatherComponent implements OnInit {
  public masterReport: MasterReportResponse;
  public processedDesc: string;
  public masterRunning: string;

  @HostBinding('class.weather') public readonly weather = true;

  constructor(private masterBasicService: MasterBasicService) {
  }

  async ngOnInit() {
    this.masterBasicService.getMasterReport().subscribe(v => {
      this.masterReport = v;
      this.masterRunning = this.masterReport.status === 0 ? "Free" : "Busy";
      this.masterReport.nodes[0].lastConn = new Date(Date.parse(this.masterReport.nodes[0].lastConn.toString()));
      // console.log(this.masterReport.nodes[0].lastConn.toISOString());
      let kbData = this.masterReport.processedDataSize / 1024;
      this.processedDesc = kbData <= 1024 * 10 ? kbData.toFixed(2) + " KB" : (kbData / 1024).toFixed(2) + " MB";
    });
  }

}

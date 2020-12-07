import { Component, HostBinding } from '@angular/core';
import {MasterReportResponse} from '../../../entity/MasterReportResponse';
import {MRTaskInfo} from '../../../entity/MRTaskInfo';
import {MasterBasicService} from '../../../services/master-basic.service';

@Component({
  selector: 'app-trending',
  styleUrls: ['./trending.component.scss'],
  templateUrl: './trending.component.html',
})
export class TrendingComponent {
  @HostBinding('class.trending') public readonly trending = true;

  public masterReport: MasterReportResponse;
  public tasks: MRTaskInfo[];

  constructor(private masterBasicService: MasterBasicService) {
  }


  async ngOnInit() {
    this.masterReport = await this.masterBasicService.getMasterReport();
    this.tasks = this.masterReport.mr.reverse().slice(0, 5);
  }

}

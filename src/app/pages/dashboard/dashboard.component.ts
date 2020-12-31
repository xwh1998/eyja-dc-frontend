import {Component, HostBinding, OnInit} from '@angular/core';

import { UpgradableComponent } from 'theme/components/upgradable';
import {KVNodeReportResponse} from '../../entity/KVNodeReportResponse';
import {MasterReportResponse} from '../../entity/MasterReportResponse';
import {MasterBasicService} from '../../services/master-basic.service';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['../charts/charts.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends UpgradableComponent implements OnInit {
  @HostBinding('class.mdl-grid') public readonly mdlGrid = true;
  @HostBinding('class.mdl-grid--no-spacing') public readonly mdlGridNoSpacing = true;

  constructor(private masterBasicService: MasterBasicService) {
    super();
  }

  public report: MasterReportResponse;
  public kvReport: KVNodeReportResponse[];
  public headers = [
    "地址", "状态"
  ]

  async ngOnInit() {
    console.log("dashboard init");
    this.masterBasicService.getMasterReport().subscribe(v => {
      this.report = v;
    });
    this.masterBasicService.getKVReport().subscribe(v => {
      this.kvReport = v;
    })
  }

}

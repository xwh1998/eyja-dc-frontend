import {Component, HostBinding, OnInit} from '@angular/core';

import { UpgradableComponent } from 'theme/components/upgradable';
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

  async ngOnInit() {
    console.log("dashboard init");
  }

}

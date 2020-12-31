import { Component, HostBinding, Input, ViewChild } from '@angular/core';
import {MasterReportResponse} from '../../../app/entity/MasterReportResponse';

@Component({
  selector: 'base-card base-card-body',
  styleUrls: ['./card.component.scss'],
  template: `<ng-content></ng-content>`,
})
export class CardBodyComponent {
  @HostBinding('class.mdl-card__supporting-text') private readonly mdlCardSupportingText = true;

  @HostBinding('class.mdl-card--expand') private isExpanded = false;

  @Input() set expanded(value) {
    if (value || value === '') {
      this.isExpanded = true;
    }
  }
}

import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { UpgradableComponent } from 'theme/components/upgradable';
import {ResourceService} from '../../../services/resource.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
})
export class TypographyComponent extends UpgradableComponent implements OnInit{
  @HostBinding('class.mdl-grid') public readonly mdlGrid = true;
  @HostBinding('class.ui-typography') public readonly uiTypography = true;
  @HostBinding('class.mdl-grid--no-spacing') public readonly mdlGridNoSpacing = true;

  constructor(private router: ActivatedRoute, private resourceService: ResourceService) {
    super();
  }

  public fileContent: string;

  async ngOnInit() {
    this.router.queryParamMap.subscribe(paramMap => {
      let fileName = paramMap.get("fileName");
      if (fileName) {
        this.resourceService.getFile(fileName).then(d => {
          this.fileContent = d;
        });
      }
    });
  }
}

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

  public title = "加载中...";

  async ngOnInit() {
    this.router.queryParamMap.subscribe(paramMap => {
      let fileName = paramMap.get("fileName");
      let source = paramMap.get("source");
      if (fileName) {
        this.resourceService.getFile(fileName, source).then(d => {
          this.fileContent = d.slice(0, 9999) + "...";
          const blob = new Blob([d], {type: 'text/csv'});
          const url = window.URL.createObjectURL(blob);
          var fileLink = document.createElement('a');
          fileLink.href = url;

          // forces the name of the downloaded file
          fileLink.download = fileName;
          fileLink.click();
          // url.setAttribute('download', fileName);
          // window.open(url);
          this.title = "预览 " + fileName;
        });
      }
    });
  }
}

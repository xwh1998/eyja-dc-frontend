import {Component, HostBinding, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { UpgradableComponent } from 'theme/components/upgradable';
import {FileInfo} from '../../entity/FileInfo';
import {ResourceService} from '../../services/resource.service';

@Component({
  selector: 'app-components',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent extends UpgradableComponent implements OnInit{
  public outFiles: FileInfo[]
  public headers = [
    "Name",
    "Size",
    "Last Modified",
    "Source",
    "Selected"
  ]

  constructor(private resourceService: ResourceService,
              private router: Router) {
    super();
  }

  async ngOnInit() {
    this.outFiles = await this.resourceService.getAllOutFiles();
  }

  public async onClickReadFile(fileName: string, source: string) {
    await this.router.navigate(['/ui/typography'],
                               {queryParams: {fileName: fileName, source: source}});
  }
}

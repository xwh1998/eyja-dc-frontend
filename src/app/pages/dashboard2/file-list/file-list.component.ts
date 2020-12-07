import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FileInfo} from '../../../entity/FileInfo';
import {MapReduceService} from '../../../services/map-reduce.service';
import {ResourceService} from '../../../services/resource.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  public resources: FileInfo[]
  public outFiles: FileInfo[]
  public fileSelected: boolean[]

  public workFileURL:string

  public submitDisable = false;
  public submitBtnText = "提交任务";

  public headers = [
    "Name",
    "Size",
    "Last Modified",
    "Selected"
  ]

  constructor(private resourceService: ResourceService,
              private mapReduceService: MapReduceService,
              private router: Router) { }

  async ngOnInit() {
    this.resources = await this.resourceService.getAllResource();
    this.outFiles = await this.resourceService.getAllOutFiles();
    this.fileSelected = new Array(this.outFiles.length);
    this.fileSelected.fill(false);
  }

  public async onClickReadFile(fileName: string) {
    await this.router.navigate(['/ui/typography'], {queryParams: {fileName: fileName}});
  }

  public async onClickSubmitTask() {
    console.log("提交任务 " + this.workFileURL);
    let files: string[] = [];
    for (let i = 0; i < this.fileSelected.length; i++) {
      if (this.fileSelected[i]) {
        files.push(this.resources[i].name);
      }
    }
    await this.mapReduceService.trySubmitTask(this.workFileURL, files, 10);
    this.submitDisable = true;
    this.submitBtnText = "已提交...";
    // await this.router.navigate(['/']);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 900);
  }


  public selectedChanged(evt, index:number) {
    this.fileSelected[index] = evt.target.checked;
    console.log(this.fileSelected)
  }

}

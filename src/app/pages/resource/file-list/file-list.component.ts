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
  public workAppId: number

  public submitDisable = false;
  public submitBtnText = "提交任务";

  public uploadBtnText = "上传文件";
  public uploadDisable = false;
  public uploadingFile : File;
  public saveToKV = false;

  public headers = [
    "Name",
    "Size",
    "Last Modified",
    "Source",
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
    await this.mapReduceService.trySubmitTask(this.workFileURL, files, 10, this.workAppId);
    this.submitDisable = true;
    this.submitBtnText = "已提交...";
    // await this.router.navigate(['/']);
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 900);
  }

  public async onClickUploadFile() {
    console.log("saving to kv:" + this.saveToKV + "fileName: " + this.uploadingFile.name);
    let fileReader = new FileReader();
    this.uploadDisable = true;
    fileReader.onload = (e) => {
      console.log(fileReader.result);
      // fileReader.readAsText(this.uploadingFile);
      this.resourceService.tryPostResource(this.uploadingFile.name, fileReader.result.toString(), this.saveToKV)
      location.reload();
    }
    fileReader.readAsText(this.uploadingFile)
  }

  public selectedChanged(evt, index:number) {
    this.fileSelected[index] = evt.target.checked;
    // console.log(this.fileSelected)
  }

  public onClickSaveToKV(event) {
    console.log(Object.keys(event.target))
    if (Object.keys(event.target).includes("__zone_symbol__changefalse")) {
      console.log("onclick save to kv");
      this.saveToKV = !this.saveToKV;
    }
  }

  public fileChanged(event) {
    this.uploadingFile = event.target.files[0];
    console.log("uploading file: " + this.uploadingFile);
  }

}

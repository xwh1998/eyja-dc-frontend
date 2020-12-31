import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FileInfo} from '../entity/FileInfo';
import {SimpleResult} from '../entity/SimpleResult';
import {UrlDataService} from '../util/url-data.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private httpC: HttpClient) { }

  public async getAllResource(): Promise<FileInfo[]> {
    return new Promise<FileInfo[]>(resolve => {
      let result = this.httpC.get<SimpleResult<FileInfo[]>>(UrlDataService.resourceListUrl);
      result.subscribe(v => {
        resolve(v.data);
      })
    })
  }

  public async getAllOutFiles(): Promise<FileInfo[]> {
    return new Promise<FileInfo[]>(resolve => {
      let result = this.httpC.get<SimpleResult<FileInfo[]>>(UrlDataService.outFileListUrl);
      result.subscribe(v => {
        resolve(v.data);
      })
    })
  }

  public async getFile(fileName: string, source: string): Promise<string> {
    return new Promise<string>(resolve => {
      let result = this.httpC
        .get<SimpleResult<string>>(UrlDataService.resourceReadUrl, {
          params: new HttpParams().set("fileName", fileName).set("source", source),
        });
      result.subscribe(v => {
        resolve(v.data);
      })
    })
  }

  public async tryPostResource(name: string, content: string, saveToKV: boolean): Promise<string> {
    console.log("try post resource...")
    return new Promise<string>(resolve => {
      let result = this.httpC.post<SimpleResult<string>>(UrlDataService.resourceUploadUrl, {
        name: name,
        content: content,
        saveToKV: saveToKV
      });
      result.subscribe(v => {
        if (!v.success) {
          resolve(v.message);
        }
      })
      resolve(null);
    })
  }


}

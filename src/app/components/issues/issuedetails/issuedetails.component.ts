import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';
import { GlobalService } from '../../../services/global.service';

import { SharedModel, GlobalModel, IssueModel, issueModel } from '../../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import * as locales from 'moment/min/locales'
import * as moment from 'moment';;
import * as locales from 'moment/locale/ar-sa';

@Component({
  selector: 'app-issuedetails',
  templateUrl: './issuedetails.component.html',
  styleUrls: ['./issuedetails.component.css']
})
export class IssueDetailsComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  Model: issueModel;  

  sharedModel:SharedModel;
  
  @Input() globalModel:GlobalModel;

  issueNumber:string = null;

  issueNb:number = 0;

  
  isLoading: boolean = false;
  

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }
  
  ngOnInit() {
    
    //moment.locale('ar-sa');   

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("issuesdetails");   


    var intervalToClear = setInterval(() => {
      if(this.globalService.globalLinks != undefined){
        this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
        this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
        this.BASE_URL = this.globalService.globalLinks.BASE_URL;
      }
      if(this.CONTENT_PATH != '' && this.CONTENT_PATH != undefined){
        clearInterval(intervalToClear);
        this.route.params.subscribe(params => {
          
          this.issueNumber = (params["id"]);
          
          this.http.get(this.globalService.globalLinks.API_URL + 'Data/GetIssueDetails?id=' + this.issueNumber).subscribe((data:any) => {
            this.Model = data;     
            this.issueNb = +(this.Model.title); 
          }); 
        }); 
      }
    },100);

  }
}

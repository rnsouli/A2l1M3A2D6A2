import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { ArticleModel, GlobalModel, SharedModel } from '../../../includes/Models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breaking-news',
  templateUrl: './breaking-news.component.html',
  styleUrls: ['./breaking-news.component.css']
})
export class BreakingNewsComponent implements OnInit {

  Model: ArticleModel;

  sharedModel:SharedModel;

  @Input() globalModel:GlobalModel;

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  API_URL: string;
  
  constructor(private globalService: GlobalService, private route: ActivatedRoute, private router:Router, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }
  
  ngOnInit() {


    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    var intervalToClear = setInterval(() => {
      //console.log('global in breaking news');
      //console.log(this.globalService.globalLinks); 
      if(this.globalService.globalLinks != undefined){
        this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
        this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
        this.API_URL = this.globalService.globalLinks.API_URL;
      }
      //console.log(this.globalService.globalLinks); 
      if(this.CONTENT_PATH != '' && this.CONTENT_PATH != undefined){
        clearInterval(intervalToClear);
        //console.log('cleared');
        //if(this.sharedModel.currentRoute != "print"){
          this.http.get(this.API_URL + 'Data/GetBreakingNews').subscribe((data:any) => {
            this.Model = data.breakingArticle;
          }, (err:any) => {
            this.myFunctions.alertPopup(err.error);
          });
          setInterval(() => {
            this.http.get(this.API_URL + 'Data/GetBreakingNews').subscribe((data:any) => {
              this.Model = data.breakingArticle;
            }, (err:any) => {
              this.myFunctions.alertPopup(err.error);
            });
          }, 150000);//every 2.5 minutes (300,000 = 1000 * 60sec * 5min) / 2
        //}
      }
    },100);

    

  }

}

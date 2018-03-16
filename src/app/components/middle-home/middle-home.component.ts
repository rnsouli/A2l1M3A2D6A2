import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { SharedModel, ArticleModel } from '../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';

@Component({
  selector: 'app-middle-home',
  templateUrl: './middle-home.component.html',
  styleUrls: ['./middle-home.component.css']
})

export class MiddleHomeComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  @Input() todaysPicArticles: ArticleModel[];
  @Input() underTodaysPic: ArticleModel[];
  @Input() latestNews: ArticleModel[];
  @Input() leftArticles: ArticleModel[];
  @Input() bannerArticle: ArticleModel;

  sharedModel: SharedModel;

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    // this.http.get(this.globalService.globalLinks.API_URL + "Data/GetHomeListingPart1?idsToRemoves=" + this.sharedModel.idsToRemove).subscribe((data:any) =>{
    //   this.todaysPicArticles = data.todaysPicArticles;
    //   this.underTodaysPic = data.underTodaysPic;
    //   this.latestNews = data.latestNews;
    //   this.leftArticles = data.leftArticles;

    //   this.sharedService.set_idsToRemove(data.articleIds);

    //   this.myFunctions.ImageAsBgJs();
    //   this.myFunctions.ArticleAsBgJs();
    //   this.myFunctions.hide_comments_counter();
    // });

    setInterval(() => {

      this.http.get(this.globalService.globalLinks.API_URL + "Data/GetLatestNews").subscribe((data:any) =>{

        this.latestNews = data.latestNews;
  
        //this.myFunctions.ImageAsBgJs();
        //this.myFunctions.ArticleAsBgJs();
        this.myFunctions.hide_comments_counter();
        //this.myFunctions.SliderSingleSwiper();

      });
    
    }, 150000);
  }

}

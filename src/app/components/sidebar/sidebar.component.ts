import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { GlobalModel, SharedModel, ArticleModel } from '../../../includes/Models';

//import { Ng4TwitterTimelineService } from 'ng4-twitter-timeline/lib/index';
//import { TwitterService } from 'ng2-twitter';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
    CONTENT_PATH:string;
    RESIZED_CONTENT_PATH:string;
    FACEBOOK_PAGE_LINK: string;
  
    banner:string;
    editorialArticles: ArticleModel[];
    todaysWord: ArticleModel;
    pillarsOfTheDayArticles: ArticleModel[];
    todaysCaricature: ArticleModel;

    editorialId:number;
    todaysWordId:number;
    caricatureId:number;
    pillarOfTheDayId:number;
  
  
    sharedModel:SharedModel;
    
    @Input() globalModel:GlobalModel;

    result:any;
  
    //private ng4TwitterTimelineService: Ng4TwitterTimelineService, 
    //private twitter: TwitterService,
    constructor(private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }
    
    ngOnInit() {
      this.CONTENT_PATH = _globals.CONTENT_PATH;
      this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
      this.FACEBOOK_PAGE_LINK = _globals.FACEBOOK_PAGE_LINK;
      this.myFunctions.load_fb_comments("facebookPage");      
      this.myFunctions.loadScript("https://platform.twitter.com/widgets.js");
      this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

      this.editorialId = _globals.editorialId;
      this.todaysWordId = _globals.todaysWordId;
      this.caricatureId = _globals.caricatureId;
      this.pillarOfTheDayId = _globals.pillarOfTheDayId;

  
      this.http.get(_globals.API_URL + "Data/GetLeftSide").subscribe((data:any) =>{
        this.editorialArticles = data.editorialArticles;        
        this.todaysWord = data.todaysWord;
        this.pillarsOfTheDayArticles = data.pillarsOfTheDayArticles;
        this.todaysCaricature = data.todaysCaricature;
        this.myFunctions.ArticleAsBgJs();
        this.myFunctions.ImageAsBgJs();

      });
    }

    // getHomeTimeline(){
    //   this.twitter.get(
    //       'https://api.twitter.com/1.1/statuses/home_timeline.json',
    //       {
    //         count: 5
    //       },
    //       {
    //         consumerKey: 'consumerKey',
    //         consumerSecret: 'consumerSecret'
    //       },
    //       {
    //         token: 'token',
    //         tokenSecret: 'tokenSecret'
    //       }
    //   ).subscribe((res)=>{
    //       this.result = res.json().map(tweet => tweet.text);
    //   });
    // }
  
  }

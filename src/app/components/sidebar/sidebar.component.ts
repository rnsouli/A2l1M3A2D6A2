import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
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
    TWITTER_PAGE_LINK: string;
  
    banner:string;
    listenLive:{
      link:string;
    }
    editorialArticles: ArticleModel[];
    todaysWord: ArticleModel;
    pillarsOfTheDayArticles: ArticleModel[];
    todaysCaricatures: ArticleModel[];

    editorialId:number;
    todaysWordId:number;
    caricatureId:number;
    pillarOfTheDayId:number;
  
  
    sharedModel:SharedModel;
    
    @Input() globalModel:GlobalModel;

    result:any;
  
    //private ng4TwitterTimelineService: Ng4TwitterTimelineService, 
    //private twitter: TwitterService,
    constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }
    
    ngOnInit() {

      this.myFunctions.loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.6.15/css/perfect-scrollbar.min.css');

      this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
      this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
      //this.FACEBOOK_PAGE_LINK = this.globalService.globalLinks.FACEBOOK_PAGE_LINK;
      //this.TWITTER_PAGE_LINK = 'https://twitter.com/Dar_Almada?ref_src=twsrc%5Etfw';
      //this.TWITTER_PAGE_LINK = 'https://twitter.com/Dar_Almada';

      this.myFunctions.load_fb_comments("facebookPage");      
      this.myFunctions.loadScript("https://platform.twitter.com/widgets.js");
      
      this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

      var intervalSharedModel = setInterval(() => {


        if(this.sharedModel != undefined 
          && this.sharedModel.socialMedia != undefined 
          && this.sharedModel.socialMedia.length){

            if(this.sharedModel.FACEBOOK_PAGE_LINK != ""){
              this.FACEBOOK_PAGE_LINK = this.sharedModel.FACEBOOK_PAGE_LINK;
            }
      
            if(this.sharedModel.TWITTER_PAGE_LINK != ""){
              this.TWITTER_PAGE_LINK = this.sharedModel.TWITTER_PAGE_LINK;
            }

            clearInterval(intervalSharedModel);
        }

      }, 100);

      this.editorialId = this.globalService.globalLinks.editorialId;
      this.todaysWordId = this.globalService.globalLinks.todaysWordId;
      this.caricatureId = this.globalService.globalLinks.caricatureId;
      this.pillarOfTheDayId = this.globalService.globalLinks.pillarOfTheDayId;

  
      this.http.get(this.globalService.globalLinks.API_URL + "Data/GetLeftSide").subscribe((data:any) =>{
        this.listenLive = data.listenLive;        
        this.editorialArticles = data.editorialArticles;        
        this.todaysWord = data.todaysWord;
        this.pillarsOfTheDayArticles = data.pillarsOfTheDayArticles;
        this.todaysCaricatures = data.todaysCaricatures;
        this.myFunctions.ArticleAsBgJs();
        this.myFunctions.ImageAsBgJs();
        this.myFunctions.SliderSingleSwiper();
        this.myFunctions.hide_comments_counter();

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

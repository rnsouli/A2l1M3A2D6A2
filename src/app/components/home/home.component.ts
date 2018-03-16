import { Component, OnInit, Input, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';
import { GlobalService } from '../../services/global.service';

import { GlobalModel, SharedModel, ArticleModel, Category, whiteBox, QuestionModel, Banner } from '../../../includes/Models';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sharedModel:SharedModel;
  
  @Input() globalModel:GlobalModel;

  startScrollLoading: boolean = false;

  gotPart1: boolean = false;
  part1IsReady: boolean = false;

  gotPart2: boolean = false;
  part2IsReady: boolean = false;
  
  gotPart3: boolean = false;
  part3IsReady: boolean = false;

  gotPart4: boolean = false;
  part4IsReady: boolean = false;


  //////////////////////////////////////////

  topArticle: ArticleModel;
  slideshow: ArticleModel[];

  //////////////////////////////////////////

  todaysPicArticles: ArticleModel[];
  underTodaysPic: ArticleModel[];
  latestNews: ArticleModel[];
  leftArticles: ArticleModel[];
  bannerArticle: ArticleModel;

  //////////////////////////////////////////

  firstBoxCategory: Category;
  bigPoliticals: ArticleModel;
  politicalsSmall: ArticleModel[];
  politicals: ArticleModel[];
  secondBoxCategory: Category;
  localNews: ArticleModel[];
  todaysIssues: {
    id : number;
    title : string;
    image : string;
    pdf : string;
  }[];
  todaysSupplementIssues: {
    id : number;
    title : string;
    image : string;
    pdf : string;
  }[];

  //////////////////////////////////////////

  whiteBox: whiteBox;
  
  specializedArticles: ArticleModel[];
  middleArticles: ArticleModel[];
  tabCategories: Category[];
  firstBoxCategoryForWhite: Category;
  secondBoxCategoryForWhite: Category;
  
  //////////////////////////////////////////

  bottomCategory: Category;
  bottomSlideshowArticles: ArticleModel[];
  bottomArticles: ArticleModel[];
  videoArticles: ArticleModel[];
  currentPoll: QuestionModel;


  leaderboardBanner: Banner;
  aboveMenuBanner: Banner;

  CONTENT_PATH:string;
  
  //////////////////////////////////////////

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("home");
    this.myFunctions.ImageAsBgJs();

    console.log('leaderboard')
    var intervalSharedModel = setInterval(() => {
      if(this.sharedModel != undefined && this.sharedModel.leaderboardBanner != null){
        this.leaderboardBanner = this.sharedModel.leaderboardBanner;
        console.log(this.sharedModel.leaderboardBanner);
        clearInterval(intervalSharedModel);
      }
    }, 1000);

    var intervalSharedModel1 = setInterval(() => {
      if(this.sharedModel != undefined && this.sharedModel.aboveMenuBanner != null){
        this.aboveMenuBanner = this.sharedModel.aboveMenuBanner;
        console.log(this.sharedModel.aboveMenuBanner);
        clearInterval(intervalSharedModel1);
      }
    }, 1000);

    this.http.get(this.globalService.globalLinks.API_URL + "Data/GetHomeInit").subscribe((data:any) =>{
      this.topArticle = data.topArticle;
      this.slideshow = data.slideshow;
      this.sharedService.set_idsToRemove(data.articleIds);
      setTimeout(() => {
        this.myFunctions.SlideshowSwiper();
        this.myFunctions.ImageAsBgJs();
        this.myFunctions.ArticleAsBgJs();
        this.myFunctions.hide_comments_counter();
        this.startScrollLoading = true;
      },200);
    });


  }

  @HostListener("window:scroll", [])
  onWindowScroll() {

    if(this.startScrollLoading){

      if(this.myFunctions.is_dom_in_view('#middleHome', 500)){

        if(!this.gotPart1){
          this.gotPart1=true;
          this.http.get(this.globalService.globalLinks.API_URL + "Data/GetHomeListingPart1?idsToRemoves=" + this.sharedModel.idsToRemove).subscribe((data:any) =>{
            this.todaysPicArticles = data.todaysPicArticles;
            this.underTodaysPic = data.underTodaysPic;
            this.latestNews = data.latestNews;
            this.leftArticles = data.leftArticles;
            this.bannerArticle = data.bannerArticle;
      
            this.sharedService.set_idsToRemove(data.articleIds);

            this.part1IsReady=true;
      
            this.myFunctions.ImageAsBgJs();
            this.myFunctions.ArticleAsBgJs();
            this.myFunctions.hide_comments_counter();
            this.myFunctions.SliderSingleSwiper();
          });
        }
      }

      if(this.myFunctions.is_dom_in_view('#yellowMiddleHome', 500)){

        if(this.part1IsReady && !this.gotPart2){
          this.gotPart2=true;
          this.http.get(this.globalService.globalLinks.API_URL + "Data/GetHomeListingPart2?idsToRemoves=" + this.sharedModel.idsToRemove).subscribe((data:any) =>{
            this.firstBoxCategory = data.firstBoxCategory;
            this.bigPoliticals = data.bigPoliticals;
            this.politicalsSmall = data.politicalsSmall;
            this.politicals = data.politicals;
            this.secondBoxCategory = data.secondBoxCategory;
            this.localNews = data.localNews;
            this.todaysIssues = data.todaysIssues;
            this.todaysSupplementIssues = data.todaysSupplementIssues;
      
            this.sharedService.set_idsToRemove(data.articleIds);

            this.part2IsReady=true;
      
            this.myFunctions.ImageAsBgJs();
            this.myFunctions.ArticleAsBgJs();
            this.myFunctions.hide_comments_counter();
            this.myFunctions.SliderSingleSwiper();
            
          });

        }
      }
      
      if(this.myFunctions.is_dom_in_view('#whiteMiddleHome', 500)){

        if(this.part2IsReady && !this.gotPart3){
          this.gotPart3=true;
          this.http.get(this.globalService.globalLinks.API_URL + "Data/GetHomeListingPart3?idsToRemoves=" + this.sharedModel.idsToRemove).subscribe((data:any) =>{
            this.tabCategories = data.tabCategories;
      
            this.whiteBox = data.whiteBox;
            
            this.whiteBox.largeTabCategory = data.tabCategories[0];
      
            this.whiteBox.whiteBoxArticles = data.whiteBox.whiteBoxArticles;
            this.whiteBox.smallWhiteBoxArticles = data.whiteBox.smallWhiteBoxArticles;
            this.firstBoxCategoryForWhite = data.firstBoxCategory;
            this.specializedArticles = data.specializedArticles;
            this.secondBoxCategoryForWhite = data.secondBoxCategory;
            this.middleArticles = data.middleArticles;
      
            this.sharedService.set_idsToRemove(data.articleIds);

            this.part3IsReady=true;
      
            this.myFunctions.ArticleAsBgJs();
            this.myFunctions.hide_comments_counter();
            this.myFunctions.TabsOnMobileSelect();
          });

        }
      }

      if(this.myFunctions.is_dom_in_view('#bottomHome', 500)){
        
        if(this.part3IsReady && !this.gotPart4){
          this.gotPart4=true;
          
          this.http.get(this.globalService.globalLinks.API_URL + "Data/GetHomeListingPart4?idsToRemoves=" + this.sharedModel.idsToRemove).subscribe((data:any) =>{
            this.bottomCategory = data.bottomCategory;
            this.bottomSlideshowArticles = data.bottomSlideshowArticles;   
            this.bottomArticles = data.bottomArticles;
            this.videoArticles = data.videoArticles;
            this.currentPoll = data.currentPoll;
      
            //console.log(this.currentPoll);

            this.sharedService.set_idsToRemove(data.articleIds);

            this.part4IsReady=true;
            
            this.myFunctions.SliderSingleSwiper();
      
            this.myFunctions.ArticleAsBgJs();
            this.myFunctions.ImageAsBgJs();

            this.myFunctions.progress_bar();   
            this.myFunctions.hide_comments_counter();   
          });

        }
      }




    }
  }

}

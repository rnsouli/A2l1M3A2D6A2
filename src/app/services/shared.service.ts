import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FunctionsService } from '../services/functions.service';
import { GlobalService } from '../services/global.service';
import { SharedModel, SocialMedia, Category, Banner } from '../../includes/Models';

@Injectable()
export class SharedService {


  private messageSource = new BehaviorSubject<SharedModel>(
    {
      "currentRoute": "home", 
      "socialMedia" : [],
      "headerCategories" : null,
      "banners": [],
      leftHomeBanner: null,
      leftMpuBanner: null,
      aboveMenuBanner: null,
      leaderboardBanner: null,
      secondLeaderboardBanner: null,
      mobileLeaderboardBanner: null,
      mobileMpuBanner: null,
      detailsRightMpuBanner:null,
      idsToRemove: "",
      currentCategoryId: 0,
      logoDesktop:"",
      logoMobile:"",
      FACEBOOK_PAGE_LINK:"",
      TWITTER_PAGE_LINK:"",
      editorialName: "",
      editorialImage: "",
      //"headerType" : "header",
      //"categoryTitle":"", 
      //"categoryId" : null, 
      //"customUrlTitle":"" ,
      // "formData":{
      //   countries:null,
      //   categories:null,
      //   inquiryTypes:null
      // }
    }
  );
  sharedModel = this.messageSource.asObservable();

  constructor(private globalService: GlobalService, private myFunctions:FunctionsService) { }

  set_shared_model(sharedModel:SharedModel){
    this.messageSource.next(sharedModel);
  }
  //----- Setters
  set_currentRoute(myCurrentRoute:string){
    let tempModel = this.messageSource.getValue();
    tempModel.currentRoute = myCurrentRoute;
    this.messageSource.next(tempModel);
  }
  
  set_socialMedia(mySocialMedia:SocialMedia[]){
    let tempModel = this.messageSource.getValue();
    tempModel.socialMedia = mySocialMedia;
    tempModel.FACEBOOK_PAGE_LINK = mySocialMedia != undefined && mySocialMedia.filter(d => d.title == "Facebook")[0] != undefined ? mySocialMedia.filter(d => d.title == "Facebook")[0].link : "";
    tempModel.TWITTER_PAGE_LINK = mySocialMedia != undefined && mySocialMedia.filter(d => d.title == "Twitter")[0] != undefined ? mySocialMedia.filter(d => d.title == "Twitter")[0].link : "";
    this.messageSource.next(tempModel);
  }

  set_headerCategories(headerCategories:Category[]){
    let tempModel = this.messageSource.getValue();
    tempModel.headerCategories = headerCategories;
    this.messageSource.next(tempModel);
  }
  
  set_RollOverCategories(data:any, id:number){
    let tempModel = this.messageSource.getValue();
    tempModel.headerCategories[id].SubCategories = data.SubCategories;
    tempModel.headerCategories[id].articles = data.articles;
    tempModel.headerCategories[id].isPillat = data.isPillat;
    this.messageSource.next(tempModel);
  }
  
  set_RollOverSubCategories(data:any, id:number){
    let tempModel = this.messageSource.getValue();
    tempModel.headerCategories[id].articles = data.articles;
    this.messageSource.next(tempModel);
  }
  
  set_idsToRemove(ids:string){
    let tempModel = this.messageSource.getValue();
    tempModel.idsToRemove = ids;
    this.messageSource.next(tempModel);
  }
  
  set_currentCategorySelected(id:number){
    let tempModel = this.messageSource.getValue();
    tempModel.currentCategoryId = id;
    this.messageSource.next(tempModel);
  }
  
  set_banners(banners:Banner[]){
    let tempModel = this.messageSource.getValue();
    tempModel.banners = banners;
    tempModel.leftHomeBanner = banners[0] != undefined && banners[0].isPublished ? banners[0] : undefined;
    tempModel.leftMpuBanner = banners[1] != undefined && banners[1].isPublished ? banners[1] : undefined;
    tempModel.leaderboardBanner = banners[2] != undefined && banners[2].isPublished ? banners[2] : undefined;
    console.log('tempModel.leaderboardBanner')
    console.log(tempModel.leaderboardBanner)
    tempModel.secondLeaderboardBanner = banners[3] != undefined && banners[3].isPublished ? banners[3] : undefined;
    tempModel.mobileLeaderboardBanner = banners[4] != undefined && banners[4].isPublished ? banners[4] : undefined;
    tempModel.mobileMpuBanner = banners[5] != undefined && banners[5].isPublished ? banners[5] : undefined;
    tempModel.detailsRightMpuBanner = banners[6] != undefined && banners[6].isPublished ? banners[6] : undefined;
    tempModel.aboveMenuBanner = banners[7] != undefined && banners[7].isPublished ? banners[7] : undefined;
    this.messageSource.next(tempModel);
  }
  
  set_Logos(logoDesktop:string,logoMobile:string){
    
    let tempModel = this.messageSource.getValue();
    tempModel.logoDesktop = this.globalService.globalLinks.CONTENT_PATH + '/CorporatePage/' + logoDesktop;
    tempModel.logoMobile = this.globalService.globalLinks.CONTENT_PATH + '/CorporatePage/' + logoMobile;
    this.messageSource.next(tempModel);
  }
  
  set_EditorialInfo(editorialName:string,editorialImage:string){

    let tempModel = this.messageSource.getValue();
    tempModel.editorialName = editorialName;
    tempModel.editorialImage = editorialImage;   

    this.messageSource.next(tempModel);
  }

  errorHandler(event) { 
      //console.debug(event);
      event.target.src = this.globalService.globalLinks.CONTENT_PATH + "/Article/-1.jpg";
      this.myFunctions.UpdateImageBgJs(event.target);
  }
}

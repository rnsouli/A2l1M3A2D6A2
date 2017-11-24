import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SharedModel, SocialMedia, Category } from '../../includes/Models';
import { FunctionsService } from '../services/functions.service';
import { _globals } from '../../includes/globals';

@Injectable()
export class SharedService {

  private messageSource = new BehaviorSubject<SharedModel>(
    {
      "currentRoute": "home", 
      "socialMedia" : [],
      "headerCategories" : null,
      idsToRemove: "",
      currentCategoryId: 0,
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

  constructor(private myFunctions:FunctionsService) { }

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

  errorHandler(event) { 
      //console.debug(event);
      event.target.src = _globals.CONTENT_PATH + "/Article/-1.jpg";
      this.myFunctions.UpdateImageBgJs(event.target);
  }
}

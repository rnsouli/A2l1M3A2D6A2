import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, SharedModel } from '../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';

@Component({
  selector: '[app-navigation]',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  categoryId:number;

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  API_URL: string;

  //routeId:number;
  //customUrlTitle:string;

  sharedModel:SharedModel;
  
  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService,  private sharedService:SharedService, private http:HttpClient) { }

  ngOnInit() {

    var intervalToClear = setInterval(() => {
      //console.log('global in navigation');
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
      }
    },100);

    // this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    // this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    this.myFunctions.InitializeNavigation();
  }
  
  load_submenu(catId:number, catNumber:number){
    if(!(this.sharedModel.headerCategories[catNumber].SubCategories)){
      this.http.get(this.API_URL + "Data/GetHeaderCategoryArticles?catId=" + catId).subscribe((data:any) =>{
          //this.sharedModel.headerCategories[catNumber].SubCategories = data.SubCategories;
          //this.sharedModel.headerCategories[catNumber].articles = data.articles;
          this.sharedModel.headerCategories[catNumber].indexForHeader = catId;
          this.sharedService.set_RollOverCategories(data, catNumber)
          this.myFunctions.ImageAsBgJs();
          this.myFunctions.ArticleAsBgJs();
          //console.log(this.headerCategoryArticles);
          //console.log(this.headerCategoryArticles[catId]);        
      }, (err:any) => {
        this.myFunctions.alertPopup(err.error);
      });
    }
  }

  load_submenu_by_subcategory(catId:number, catNumber:number, type:number){
  if(true){
      //document.getElementsByClassName("nav__dropdown-inner")[catNumber].setAttribute('style','visibility:hidden');
      this.http.get(this.API_URL + "Data/GetHeaderCategoryArticles?catId=" + catId + '&type=' + type).subscribe((data:any) =>{
          this.sharedModel.headerCategories[catNumber].indexForHeader = catId;
          this.sharedService.set_RollOverSubCategories(data, catNumber)
          this.myFunctions.ImageAsBgJs();
          this.myFunctions.ArticleAsBgJs();  
          //document.getElementsByClassName("nav__dropdown-inner")[catNumber].removeAttribute('style');

      }, (err:any) => {
        this.myFunctions.alertPopup(err.error);
      });
    }
  }

}


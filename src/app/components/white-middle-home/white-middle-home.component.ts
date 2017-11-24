import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { SharedModel, ArticleModel, Category, whiteBox } from '../../../includes/Models';

@Component({
  selector: 'app-white-middle-home',
  templateUrl: './white-middle-home.component.html',
  styleUrls: ['./white-middle-home.component.css']
})

export class WhiteMiddleHomeComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  displayin_whitebox_medium:number;
  displayin_specializedPage:number;
  displayin_middleWhiteBox:number;

  @Input() whiteBox: whiteBox;

  @Input() specializedArticles: ArticleModel[];
  @Input() middleArticles: ArticleModel[];
  @Input() tabCategories: Category[];
  @Input() firstBoxCategory: Category;
  @Input() secondBoxCategory: Category;

  sharedModel: SharedModel;

  constructor(private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {
    
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.displayin_whitebox_medium = _globals.displayin_whitebox_medium;
    this.displayin_specializedPage = _globals.displayin_specializedPage;
    this.displayin_middleWhiteBox = _globals.displayin_middleWhiteBox;

    // this.http.get(_globals.API_URL + "Data/GetHomeListingPart3?idsToRemoves=" + this.sharedModel.idsToRemove).subscribe((data:any) =>{
    //   this.tabCategories = data.tabCategories;

    //   this.whiteBox = data.whiteBox;
      
    //   this.whiteBox.largeTabCategory = data.tabCategories[0];

    //   this.whiteBox.whiteBoxArticles = data.whiteBox.whiteBoxArticles;
    //   this.whiteBox.smallWhiteBoxArticles = data.whiteBox.smallWhiteBoxArticles;
    //   this.firstBoxCategory = data.firstBoxCategory;
    //   this.specializedArticles = data.specializedArticles;
    //   this.secondBoxCategory = data.secondBoxCategory;
    //   this.middleArticles = data.middleArticles;

    //   this.sharedService.set_idsToRemove(data.articleIds);

    //   this.myFunctions.ArticleAsBgJs();
    // });

  }

  load_whitebox_articles(catId:number, catNumber:number){
    //if(!(this.sharedModel.headerCategories[catNumber].SubCategories)){
      this.http.get(_globals.API_URL + "Data/GetWhiteBoxTabs?idsToRemoves="+ "" + "&categoryId=" + catId + "&typeId=" + this.displayin_whitebox_medium + "&take=4").subscribe((data:any) =>{
          
          this.whiteBox = data.whiteBox;

          this.whiteBox.largeTabCategory = this.tabCategories[catNumber];

          this.whiteBox.whiteBoxArticles = data.whiteBox.whiteBoxArticles;
          this.whiteBox.smallWhiteBoxArticles = data.whiteBox.smallWhiteBoxArticles;
          this.myFunctions.OnTabClick(catNumber, '.tabs-large');

          this.myFunctions.ArticleAsBgJs();
        
      });
    //}
  }

  load_specialized_articles(catId:number, catNumber:number, divId:string){
    //if(!(this.sharedModel.headerCategories[catNumber].SubCategories)){
      this.http.get(_globals.API_URL + "Data/GetHomeBox?idsToRemoves=" + "" + "&categoryId=" + catId + "&typeId=" + this.displayin_specializedPage + "&take=3").subscribe((data:any) =>{
          if(divId == 'specializedBox'){
            this.specializedArticles = data.entries;
            this.myFunctions.OnTabClick(catNumber, '#specializedBox .tabs-medium');
            this.myFunctions.ArticleAsBgJs();
          }else if(divId == 'cultureBox'){
            this.middleArticles = data.entries;
            this.myFunctions.OnTabClick(catNumber, '#cultureBox .tabs-medium');
            this.myFunctions.ArticleAsBgJs();
          }
        
      });
    //}
  }

}

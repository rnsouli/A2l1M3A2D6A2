import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
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

  //routeId:number;
  //customUrlTitle:string;

  sharedModel:SharedModel;
  
  constructor(private route: ActivatedRoute, private myFunctions:FunctionsService,  private sharedService:SharedService, private http:HttpClient) { }

  ngOnInit() {

    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    this.myFunctions.InitializeNavigation();
  }
  
  load_submenu(catId:number, catNumber:number){
    if(!(this.sharedModel.headerCategories[catNumber].SubCategories)){
      this.http.get(_globals.API_URL + "Data/GetHeaderCategoryArticles?catId=" + catId).subscribe((data:any) =>{
          //this.sharedModel.headerCategories[catNumber].SubCategories = data.SubCategories;
          //this.sharedModel.headerCategories[catNumber].articles = data.articles;
          this.sharedService.set_RollOverCategories(data, catNumber)
          this.myFunctions.ImageAsBgJs();
          this.myFunctions.ArticleAsBgJs();
          //console.log(this.headerCategoryArticles);
          //console.log(this.headerCategoryArticles[catId]);        
      });
    }
  }

}


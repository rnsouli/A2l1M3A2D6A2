import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, SharedModel, CategoryModel } from '../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  categoryId:number;
  pageNumber:number = 0;

  CategoryModel: CategoryModel;

  templateId:number;
  idsToRemove:string;

  sharedModel:SharedModel;

  isLoading: boolean = false;
  
  @Input() globalModel:GlobalModel;

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("videos");

    //Initial category call
    this.http.get(this.globalService.globalLinks.API_URL + "Data/GetDisplayInInit?typeId=" + this.globalService.globalLinks.displayin_videos).subscribe((data:any) =>{
      
      this.pageNumber = 0;
      this.CategoryModel = data;
      this.templateId = data.templateId;

      if(data.articles){

        this.CategoryModel.topArticles = data.topArticles;
        this.CategoryModel.firstTabOfArticles = data.articles.slice(0,8);
        this.CategoryModel.secondTabOfArticles = data.articles.slice(8);
        this.idsToRemove = data.articleIds;
        
        setTimeout(() => {
          this.pageNumber++;
          //this.myFunctions.load_init_category_page();
          //this.startScrollLoading = true;
        },200);

      }else{
        this.myFunctions.HideLoadMore();
      }

      if(data.articles && data.articles.length == 0)
      {
        this.myFunctions.HideLoadMore();
      }
    }, (err:any) => {
      this.myFunctions.alertPopup(err.error);
    });

  }

  load_more_articles(idsToRemove:string){
    
      if(!this.isLoading){
        this.isLoading = true;
        this.http.get(this.globalService.globalLinks.API_URL + "Data/GetCategoryListing?typeId=" + this.globalService.globalLinks.displayin_videos
        + "&page="+ (this.pageNumber) +"&skip=0&pageSize=16" + "&idsToRemove=" + idsToRemove).subscribe((data:any) =>{        
          this.CategoryModel.secondTabOfArticles = this.CategoryModel.secondTabOfArticles.concat(data.articles);
          
          if(data.articles && data.articles.length == 0)
          {
            this.myFunctions.HideLoadMore();
          }
          
          this.myFunctions.ImageAsBgJs();
          this.myFunctions.ArticleAsBgJs();
          
          setTimeout(() => {
            this.pageNumber++;
            //this.myFunctions.load_init_category_page();
            this.isLoading = false;
          },200); 
        }, (err:any) => {
          this.myFunctions.alertPopup(err.error);
        });
      }
    }

}

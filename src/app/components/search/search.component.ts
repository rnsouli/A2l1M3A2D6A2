import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, SharedModel, CategoryModel } from '../../../includes/Models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  pageSize:number;  
  pageNumber: number;

  keyword:string;

  CategoryModel: CategoryModel;

  @Input() globalModel:GlobalModel;
  sharedModel:SharedModel;

  isLoading:boolean = false;
  showLoadMore: boolean = false;
  
  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {
    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
    this.pageSize = this.globalService.globalLinks.pageSize;
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("search");

    this.route.queryParams.subscribe(params => {
      this.keyword = (params["keyword"]);

      //Initial category call

      //setTimeout(() => {

      this.http.get(this.globalService.globalLinks.API_URL + "Data/GetListingForSearch?keyword=" + this.keyword + "&getTotalCount=true&pageSize=" + this.pageSize).subscribe((data:any) =>{
        
        this.showLoadMore = true;
        this.pageNumber = 0;
        this.CategoryModel = data;
        if(data.articles){
            this.CategoryModel.firstTabOfArticles = data.articles.slice(0,8);
            this.CategoryModel.secondTabOfArticles = data.articles.slice(8);
          
            setTimeout(() => {
              this.pageNumber++;
              //this.myFunctions.load_init_category_page();
              //this.startScrollLoading = true;
            },200);

            if(data.articles.length < this.pageSize || data.articles.length == data.totalCount){
              this.showLoadMore = false;
            }

        }else{
          this.showLoadMore = false;
        }

        if(data.articles && data.articles.length == 0)
        {
          this.showLoadMore = false;
        }

      }, (err:any) => {
        this.myFunctions.alertPopup(err.error);
      });

    //}, 3000);
      
    });    
  }

  load_more_articles(){

    if(!this.isLoading){
      this.isLoading = true;
      this.http.get(this.globalService.globalLinks.API_URL + "Data/GetListingForSearch?keyword=" + this.keyword
      + "&page="+ (this.pageNumber) +"&skip=0&pageSize=" + this.pageSize).subscribe((data:any) =>{        
        this.CategoryModel.secondTabOfArticles = this.CategoryModel.secondTabOfArticles.concat(data.articles);
        
        if(data.articles && data.articles.length == 0){
          this.showLoadMore = false;
        }
        else if(data.articles.length < this.pageSize){
          this.showLoadMore = false;
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

import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, WriterModel, SharedModel } from '../../../includes/Models';

@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.css']
})

export class WriterComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  writerId:number;
  
  pageNumber: number;

  Model: WriterModel;

  sharedModel:SharedModel;

  globalModel:GlobalModel;

  isLoading:boolean = false;
  
  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("writer");

    this.route.params.subscribe(params => {
      this.writerId = params['id'];

      this.isLoading = true;

      //this.sharedService.set_currentCategorySelected(this.writerId);


      //Initial category call
      this.http.get(this.globalService.globalLinks.API_URL + "Data/GetWriterInit?id=" + this.writerId).subscribe((data:any) =>{
        
        this.isLoading = false;
        this.pageNumber = 0;
        this.Model = data;

        if(data.articles){
          
          this.Model.firstTabOfArticles = data.articles.slice(0,13);
          this.Model.secondTabOfArticles = data.articles.slice(13);
          
            setTimeout(() => {
              this.pageNumber++;
              this.myFunctions.hide_comments_counter();
              //this.myFunctions.load_init_category_page();
              //this.startScrollLoading = true;
            },200);

            this.myFunctions.ArticleAsBgJs();
            this.myFunctions.ImageAsBgJs();
        }
      }, (err:any) => {
        this.myFunctions.alertPopup(err.error);
      });



    });

    //GetCategoryInit

  }

  load_more_articles(){

    if(!this.isLoading){
      this.isLoading = true;
      this.http.get(this.globalService.globalLinks.API_URL + "Data/GetWriterListing?writerId=" + this.writerId 
      + "&page="+ (this.pageNumber-1) +"&skip=30&pageSize=16").subscribe((data:any) =>{        
        this.Model.secondTabOfArticles = this.Model.secondTabOfArticles.concat(data.articles);
        
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

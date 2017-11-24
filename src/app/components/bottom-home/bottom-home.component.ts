import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { SharedModel, ArticleModel, Category } from '../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';

@Component({
  selector: 'app-bottom-home',
  templateUrl: './bottom-home.component.html',
  styleUrls: ['./bottom-home.component.css']
})
export class BottomHomeComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  bottomCategory: Category;
  bottomSlideshowArticles: ArticleModel[];
  bottomArticles: ArticleModel[];
  videoArticles: ArticleModel[];
  currentPoll: ArticleModel;

  sharedModel: SharedModel;

  constructor(private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {

    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    this.http.get(_globals.API_URL + "Data/GetHomeListingPart4?idsToRemoves=" + this.sharedModel.idsToRemove).subscribe((data:any) =>{
      this.bottomCategory = data.bottomCategory;
      this.bottomSlideshowArticles = data.bottomSlideshowArticles;   
      this.bottomArticles = data.bottomArticles;
      this.videoArticles = data.videoArticles;
      this.currentPoll = data.currentPoll;

      this.sharedService.set_idsToRemove(data.articleIds);
      
      this.myFunctions.SliderSingleSwiper();

      this.myFunctions.ArticleAsBgJs();
      this.myFunctions.ImageAsBgJs();
    });

  }

}

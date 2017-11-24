import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { SharedModel, ArticleModel } from '../../../includes/Models';

@Component({
  selector: 'app-home-slideshow',
  templateUrl: './home-slideshow.component.html',
  styleUrls: ['./home-slideshow.component.css']
})
export class HomeSlideshowComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  @Input() topArticle: ArticleModel;
  @Input() slideshow: ArticleModel[];

  sharedModel: SharedModel;  

  constructor(private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {

    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    // this.http.get(_globals.API_URL + "Data/GetHomeInit").subscribe((data:any) =>{
    //   this.topArticle = data.topArticle;
    //   this.slideshow = data.slideshow;
    //   this.myFunctions.SlideshowSwiper();
    //   this.sharedService.set_idsToRemove(data.articleIds);

    //   this.myFunctions.ImageAsBgJs();
    //   this.myFunctions.ArticleAsBgJs();
    // });

  }

}

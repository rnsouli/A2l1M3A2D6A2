import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { GlobalModel, SharedModel, ArticleModel } from '../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  sharedModel: SharedModel;

  isVideo: boolean = false;

  entry: ArticleModel;

  articleId: number;

  formErrors:string[] = [];

  youtubeLink:string = "";
  
  constructor(private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }

  ngOnInit() {

    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.BASE_URL = _globals.BASE_URL;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("details");

    this.route.params.subscribe(params => {

      this.articleId = params["id"];
      
      this.http.get(_globals.API_URL + "Data/GetDetailsById?id=" + params["id"]).subscribe((data:any) =>{
        this.entry = data;
        this.isVideo = this.entry.isVideo;
        if(!this.entry.ArticleImages || this.entry.ArticleImages.length == 0){
          this.entry.ArticleImages = this.entry.ArticleImages.concat(this.entry.image);
        }

        this.youtubeLink = this.entry.youtubeLink;

        //this.youtubeLink = 'https://www.youtube.com/embed/9t9u_yPEidY?rel=0';

        //console.log(this.youtubeLink);
        // console.log(this.entry.date);
        // console.log((new Date(this.entry.date)));

        // this.date = this.myFunctions.timeSince(new Date(this.entry.date));

        // console.log(this.date);

        this.myFunctions.SliderSingleSwiper();
        this.entry.urlBrowser = this.BASE_URL + "Details/" + this.entry.id + (this.entry.customUrlTitle ? '/' + this.entry.customUrlTitle : '');
        this.myFunctions.load_fb_comments("fbComment");
        this.myFunctions.loadScript("https://platform.twitter.com/widgets.js");
        this.myFunctions.getFacebookCounterAjax(this.entry.urlBrowser);
        this.addArticleViewCounter();
        this.myFunctions.hide_comments_counter();
      });

    });

  }

  addArticleViewCounter() {
    this.formErrors = [];
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(_globals.API_URL + "Data/AddViewCounter?articleId=" + this.articleId, 
      { headers: headers }).subscribe((data:any) =>{
    
    }, (err:any) => {
      this.formErrors.push(err.error.message);
      console.log(err.error.message);
    });

	}

}

import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';
import { GlobalService } from '../../../services/global.service';

import { GlobalModel, SharedModel, ArticleModel, ArticleImageModel } from '../../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  sharedModel: SharedModel;

  isVideo: boolean = false;

  entry: ArticleModel;

  articleId: number;

  formErrors:string[] = [];

  youtubeLink:string = "";

  sendEmailUrl:string = "";  

  description:any = "";

  hasGallery:boolean = false;
  
  constructor(private globalService: GlobalService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }

  ngOnInit() {

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
    this.BASE_URL = this.globalService.globalLinks.BASE_URL;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("print");

    this.route.params.subscribe(params => {

      this.articleId = params["id"];
      
      this.http.get(this.globalService.globalLinks.API_URL + "Data/GetDetailsById?id=" + params["id"]).subscribe((data:any) =>{
        this.entry = data;
        this.isVideo = this.entry.isVideo;
        if(!this.entry.ArticleImages || this.entry.ArticleImages.length == 0){

          this.hasGallery = false;
          var donut: ArticleImageModel = {
            image: this.entry.image,
            title: this.entry.caption,
            description: null 
          };

          this.entry.ArticleImages = this.entry.ArticleImages.concat(donut);
        }else{
          this.hasGallery = true;
        }

        this.description = this.sanitizer.bypassSecurityTrustHtml(this.entry.description);

        this.youtubeLink = this.entry.youtubeLink;

        if(this.entry){
          this.printpage();
        }

      });

    });

  }

  printpage(){
    if(window){
      setTimeout(() => {
        window.print();        
      }, 1000);
     }
    return true;
  }

}


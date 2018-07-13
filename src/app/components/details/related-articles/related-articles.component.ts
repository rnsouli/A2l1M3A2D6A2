import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';
import { GlobalService } from '../../../services/global.service';

import { GlobalModel, SharedModel, ArticleModel } from '../../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';

@Component({
  selector: '[app-related-articles]',
  templateUrl: './related-articles.component.html',
  styleUrls: ['./related-articles.component.css']
})
export class RelatedArticlesComponent implements OnInit {

  @Input() entries: ArticleModel[];

  @Input() relatedArticleTitle:string;

  @Input() articleId:number;
  @Input() articleWriterId:number;

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }

  ngOnInit() {

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;

    this.http.get(this.globalService.globalLinks.API_URL + "Data/GetRelatedArticlesById?id=" + this.articleId + "&articleWriterId=" + this.articleWriterId).subscribe((data:any) =>{
      //console.log(data);
      this.entries = data;
      this.myFunctions.hide_comments_counter();
    }, (err:any) => {
      this.myFunctions.alertPopup(err.error);
    });

  }

}

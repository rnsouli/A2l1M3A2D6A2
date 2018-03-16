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

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }

  ngOnInit() {

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
  }

}

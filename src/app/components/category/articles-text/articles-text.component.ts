import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';

import { GlobalService } from '../../../services/global.service';
import { GlobalModel, ArticleModel } from '../../../../includes/Models';

import * as moment from 'moment';;
import * as locales from 'moment/locale/ar-sa';

@Component({
  selector: '[app-articles-text]',
  templateUrl: './articles-text.component.html',
  styleUrls: ['./articles-text.component.css']
})
export class ArticlesTextComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  @Input() entries: ArticleModel[];

  @Input() globalModel:GlobalModel;
  
  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {

    //moment.locale('ar-sa');

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
  }

}

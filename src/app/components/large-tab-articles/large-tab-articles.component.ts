import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { SharedModel, ArticleModel, Category, whiteBox } from '../../../includes/Models';

@Component({
  selector: 'app-large-tab-articles',
  templateUrl: './large-tab-articles.component.html',
  styleUrls: ['./large-tab-articles.component.css']
})
export class LargeTabArticlesComponent implements OnInit {
  
  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  @Input() whiteBox: whiteBox;

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {
    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;

    this.myFunctions.ArticleAsBgJs();
  }

}

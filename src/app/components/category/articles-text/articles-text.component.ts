import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';

import { _globals } from '../../../../includes/globals';
import { GlobalModel, ArticleModel } from '../../../../includes/Models';

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
  
  constructor(private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {
    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
  }

}

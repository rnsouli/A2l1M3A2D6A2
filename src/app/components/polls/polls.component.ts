import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, SharedModel, QuestionModel } from '../../../includes/Models';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {
  
    CONTENT_PATH:string;
    RESIZED_CONTENT_PATH:string;
  
    entries: QuestionModel[];  
    oldEntries: QuestionModel[];  
  
    sharedModel:SharedModel;
    
    @Input() globalModel:GlobalModel;
  
    Math:any;
    
    constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
      this.Math = Math;
    }
    
    ngOnInit() {
      this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

      this.sharedService.set_currentRoute("polls");
      
      this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;  
      
      //this.http.get(this.globalService.globalLinks.API_URL + 'Data/GetVotingInit').subscribe((data:any) => {
        this.http.get(this.globalService.globalLinks.API_URL + 'Data/GetVotingInit').subscribe((data:any) => {
          this.entries = data.entries;  
          this.oldEntries = data.oldEntries;  
          this.myFunctions.progress_bar();      
      }, (err:any) => {
        this.myFunctions.alertPopup(err.error);
      });
    }
  
  }

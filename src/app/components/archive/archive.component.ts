import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, SharedModel } from '../../../includes/Models';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})

export class ArchiveComponent implements OnInit {
  
    CONTENT_PATH:string;
    RESIZED_CONTENT_PATH:string;
    
    sharedModel:SharedModel;
    
    @Input() globalModel:GlobalModel;

    year:number = 0;
  
    constructor(private globalService: GlobalService, private route: ActivatedRoute, private sharedService:SharedService, private http:HttpClient) { }
    
    ngOnInit() {
      this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

      this.sharedService.set_currentRoute("archiveviewer");

      this.route.queryParams.subscribe(params => {

        this.year = Number(params["year"] != null ? params["year"] : 0);
        console.log(this.year)
      });
    }
  
  }

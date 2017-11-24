import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { GlobalModel, SharedModel, CorporatePageTreeModel } from '../../../includes/Models';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})

export class PrivacyPolicyComponent implements OnInit {
  
    CONTENT_PATH:string;
    RESIZED_CONTENT_PATH:string;
  
    Model: CorporatePageTreeModel;  
  
    sharedModel:SharedModel;
    
    @Input() globalModel:GlobalModel;
  
    constructor(private route: ActivatedRoute, private sharedService:SharedService, private http:HttpClient) { }
    
    ngOnInit() {
      this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

      this.sharedService.set_currentRoute("privacypolicy");
  
      this.http.get(_globals.API_URL + 'Data/GetPrivacyPolicyData').subscribe((data:any) => {
        this.Model = data.entries;
        //console.log(this.model);
        
      });
    }
  
  }

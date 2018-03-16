import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, SharedModel, SocialMedia, Category } from '../../../includes/Models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  socialMedia:SocialMedia[];
  footerCategoriesWithoutSub: Category[];
  footerCategoriesWithSub: Category[];


  sharedModel:SharedModel;
  
  @Input() globalModel:GlobalModel;

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private sharedService:SharedService, private http:HttpClient) { }
  
  ngOnInit() {
    
        var intervalToClear = setInterval(() => {
          //console.log('global in header');
          //console.log(this.globalService.globalLinks); 
          if(this.globalService.globalLinks != undefined){
            this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
            this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
            this.BASE_URL = this.globalService.globalLinks.BASE_URL;
          }
          //console.log(this.globalService.globalLinks); 
          if(this.CONTENT_PATH != '' && this.CONTENT_PATH != undefined){
            clearInterval(intervalToClear);
            //console.log('cleared');
          }
        },100);
    
        // this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
        // this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
    
        this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
      }

}

import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, SharedModel } from '../../../includes/Models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  //routeId:number;
  //customUrlTitle:string;

  sharedModel:SharedModel;
  
  @Input() globalModel:GlobalModel;

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private router:Router, private sharedService:SharedService, private http:HttpClient) { }

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

  onSearch(){
      this.router.navigateByUrl('/Search?keyword=' + (<HTMLInputElement>document.getElementById('q')).value);  
  }

}

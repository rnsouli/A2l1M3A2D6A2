import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
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

  //routeId:number;
  //customUrlTitle:string;

  sharedModel:SharedModel;
  
  @Input() globalModel:GlobalModel;

  constructor(private route: ActivatedRoute, private router:Router, private sharedService:SharedService, private http:HttpClient) { }

  ngOnInit() {

    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

  }

  onSearch(){
      this.router.navigateByUrl('/Search?keyword=' + (<HTMLInputElement>document.getElementById('q')).value);  
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
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

  socialMedia:SocialMedia[];
  footerCategoriesWithoutSub: Category[];
  footerCategoriesWithSub: Category[];


  sharedModel:SharedModel;
  
  @Input() globalModel:GlobalModel;

  constructor(private route: ActivatedRoute, private sharedService:SharedService, private http:HttpClient) { }
  
  ngOnInit() {
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
  }

}

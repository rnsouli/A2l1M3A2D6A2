import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { SharedModel, ArticleModel } from '../../../includes/Models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-slideshow',
  templateUrl: './home-slideshow.component.html',
  styleUrls: ['./home-slideshow.component.css']
})
export class HomeSlideshowComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  @Input() topArticle: ArticleModel;
  @Input() slideshow: ArticleModel[];

  sharedModel: SharedModel;  

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private router: Router, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    // this.http.get(this.globalService.globalLinks.API_URL + "Data/GetHomeInit").subscribe((data:any) =>{
    //   this.topArticle = data.topArticle;
    //   this.slideshow = data.slideshow;
    //   this.myFunctions.SlideshowSwiper();
    //   this.sharedService.set_idsToRemove(data.articleIds);

    //   this.myFunctions.ImageAsBgJs();
    //   this.myFunctions.ArticleAsBgJs();
    // });

  }

  onSearchByIssueNumber(){
      var type = (<HTMLInputElement>document.getElementById('q2')).getAttribute('type');
      if(type == 'date'){
        this.router.navigateByUrl('/Issues?date=' + (<HTMLInputElement>document.getElementById('q2')).value);  
      }
      else{
        this.router.navigateByUrl('/Issues?issueNumber=' + (<HTMLInputElement>document.getElementById('q2')).value);  
      }
  }

  SearchByIssue(value){
    this.myFunctions.SearchByIssue(value);
  }

}

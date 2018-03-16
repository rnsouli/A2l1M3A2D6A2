import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { SharedModel, ArticleModel, Category } from '../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';

import { Router } from '@angular/router';

@Component({
  selector: 'app-yellow-middle-home',
  templateUrl: './yellow-middle-home.component.html',
  styleUrls: ['./yellow-middle-home.component.css']
})
export class YellowMiddleHomeComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  @Input() firstBoxCategory: Category;
  @Input() bigPoliticals: ArticleModel;
  @Input() politicalsSmall: ArticleModel[];
  @Input() politicals: ArticleModel[];
  @Input() secondBoxCategory: Category;
  @Input() localNews: ArticleModel[];

  @Input() todaysIssues: {
    id : number;
    title : string;
    image : string;
    pdf : string;
  }[];

  @Input() todaysSupplementIssues: {
    id : number;
    title : string;
    image : string;
    pdf : string;
  }[];
  

  sharedModel: SharedModel;

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private router:Router, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {
    
    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

    // this.http.get(this.globalService.globalLinks.API_URL + "Data/GetHomeListingPart2?idsToRemoves=" + this.sharedModel.idsToRemove).subscribe((data:any) =>{
    //   this.firstBoxCategory = data.firstBoxCategory;
    //   this.bigPoliticals = data.bigPoliticals;
    //   this.politicalsSmall = data.politicalsSmall;
    //   this.politicals = data.politicals;
    //   this.secondBoxCategory = data.secondBoxCategory;
    //   this.localNews = data.localNews;

    //   this.sharedService.set_idsToRemove(data.articleIds);

    //   this.myFunctions.ImageAsBgJs();
    //   this.myFunctions.ArticleAsBgJs();
    //   this.myFunctions.hide_comments_counter();
      
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

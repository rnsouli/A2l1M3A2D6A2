import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../../services/shared.service';
import { FunctionsService } from '../../../services/functions.service';

 import { GlobalService } from '../../../services/global.service';
import { GlobalModel, SharedModel, CategoryModel } from '../../../../includes/Models';

@Component({
  selector: 'app-listing-template',
  templateUrl: './listing-template.component.html',
  styleUrls: ['./listing-template.component.css']
})

export class ListingTemplateComponent implements OnInit {

  CONTENT_PATH: string;
  RESIZED_CONTENT_PATH: string;
  pageSize: number;

  @Input() categoryId: number;

  @Input() pageNumber: number;

  @Input() CategoryModel: CategoryModel;

  @Input() globalModel: GlobalModel;

  isLoading: boolean = false;

  @Input() pillarsType:number;

  sharedModel:SharedModel;
  
  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions: FunctionsService, private sharedService: SharedService, private http: HttpClient) {
  }

  ngOnInit() {
    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
    this.pageSize = this.globalService.globalLinks.pageSize;
  }

  load_more_articles() {

    if (!this.isLoading) {
      this.isLoading = true;
      this.http.get(this.globalService.globalLinks.API_URL + "Data/GetCategoryListing?categoryId=" + this.categoryId
        + "&page=" + (this.pageNumber) + "&skip=0&pageSize=" + this.pageSize).subscribe((data: any) => {
          this.CategoryModel.secondTabOfArticles = this.CategoryModel.secondTabOfArticles.concat(data.articles);
          
          if(data.articles && data.articles.length == 0)
          {
            this.myFunctions.HideLoadMore();
          }

          this.myFunctions.ImageAsBgJs();
          this.myFunctions.ArticleAsBgJs();
          
          setTimeout(() => {
            this.pageNumber++;
            //this.myFunctions.load_init_category_page();
            this.isLoading = false;
          }, 200);
        });
    }
  }

}


import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { GlobalModel, SharedModel, CategoryModel } from '../../../includes/Models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  categoryId:number;
  pageNumber:number = 0;

  CategoryModel: CategoryModel;

  // isDefaultTemplate: boolean = true;
  // isCaricatureTemplate: boolean = false;
  // isEditorialTemplate: boolean = false;
  // isWithSubCategoriesTemplate: boolean = false;
  // isSubCategoryTemplate: boolean = false;

  category_template_withsubcategories: number;
  category_template_subcategories: number;
  category_template_editorial: number;
  category_template_listing: number;
  category_template_caricature: number;

  templateId:number;
  idsToRemove:string;

  sharedModel:SharedModel;
  
  @Input() globalModel:GlobalModel;

  constructor(private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { 
  }

  ngOnInit() {

    this.CONTENT_PATH = _globals.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = _globals.RESIZED_CONTENT_PATH;

    this.category_template_withsubcategories = _globals.category_template_withsubcategories;
    this.category_template_subcategories = _globals.category_template_subcategories;
    this.category_template_editorial = _globals.category_template_editorial;
    this.category_template_listing = _globals.category_template_listing;
    this.category_template_caricature = _globals.category_template_caricature;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("category");

    this.route.params.subscribe(params => {
      this.categoryId = params['id'];

      this.sharedService.set_currentCategorySelected(this.categoryId);

      if(params['subId']){
        //get sub category
        this.categoryId = params['subId'];
      }



      //Initial category call
      this.http.get(_globals.API_URL + "Data/GetCategoryInit?categoryId=" + this.categoryId).subscribe((data:any) =>{
        
        this.pageNumber = 0;
        this.CategoryModel = data;
        this.templateId = data.templateId;

        if(data.articles){

          if(this.templateId == this.category_template_caricature){
            this.CategoryModel.firstArticle = data.articles[0];
            this.CategoryModel.firstTabOfArticles = data.articles.slice(1,9);
            this.CategoryModel.secondTabOfArticles = data.articles.slice(9);
          }
          if(this.templateId == this.category_template_listing){
            this.CategoryModel.firstTabOfArticles = data.articles.slice(0,8);
            this.CategoryModel.secondTabOfArticles = data.articles.slice(8);
          }
          if(this.templateId == this.category_template_editorial){
            this.CategoryModel.firstTabOfArticles = data.articles.slice(0,14);
            this.CategoryModel.secondTabOfArticles = data.articles.slice(14);
          }
          if(this.templateId == this.category_template_subcategories){
            this.CategoryModel.topArticles = data.topArticles;
            this.CategoryModel.firstTabOfArticles = data.articles.slice(0,8);
            this.CategoryModel.secondTabOfArticles = data.articles.slice(8);
            this.idsToRemove = data.articleIds;
          }
          if(this.templateId == this.category_template_withsubcategories){
            this.CategoryModel = data;
            this.idsToRemove = data.articleIds;
          }
            setTimeout(() => {
              this.pageNumber++;
              this.myFunctions.hide_comments_counter();
              //this.myFunctions.load_init_category_page();
              //this.startScrollLoading = true;
            },200);

            this.myFunctions.ArticleAsBgJs();
            this.myFunctions.ImageAsBgJs();
        }
      });



    });

    //GetCategoryInit

  }

}

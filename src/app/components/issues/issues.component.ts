import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { SharedModel, GlobalModel, IssueModel } from '../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;

  Model: IssueModel;  

  sharedModel:SharedModel;
  
  @Input() globalModel:GlobalModel;


  months = [
    { 'id' : 1 , 'name': 'كانون الثاني'},
    { 'id' : 2 , 'name': 'شباط'},
    { 'id' : 3 , 'name': 'آذار'},
    { 'id' : 4 , 'name': 'نيسان'},
    { 'id' : 5 , 'name': 'أيار'},
    { 'id' : 6 , 'name': 'حزيران'},
    { 'id' : 7 , 'name': 'تموز'},
    { 'id' : 8 , 'name': 'آب'},
    { 'id' : 9 , 'name': 'أيلول'},
    { 'id' : 10 , 'name': 'تشرين الأول'},
    { 'id' : 11 , 'name': 'تشرين الثاني'},
    { 'id' : 12 , 'name': 'كانون الأول'},
  ];

  constructor(private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }
  
  ngOnInit() {

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("issues");
    // require("/assets/css/lightbox.css");
    // require("/assets/css/font-awesome.min.css");

    this.myFunctions.loadStylesheet("/assets/css/lightbox.css");
    this.myFunctions.loadStylesheet("/assets/css/font-awesome.min.css");


    this.http.get(_globals.API_URL + 'Data/GetIssues').subscribe((data:any) => {
      this.Model = data;    
      this.myFunctions.CustomSelect();  
      
      setTimeout(func =>{
        this.myFunctions.loadScript("/assets/js/html2canvas.min.js");      
      }, 0)
      setTimeout(func =>{
        this.myFunctions.loadScript("/assets/js/three.min.js");      
      }, 200)
      setTimeout(func =>{
        this.myFunctions.loadScript("/assets/js/pdf.min.js");      
      }, 400)
      setTimeout(func =>{
        this.myFunctions.loadScript("/assets/js/3dflipbook.min.js");      
      }, 600)
      setTimeout(func =>{
        this.myFunctions.loadScript("/assets/js/lightbox.js");      
      }, 800);
      
    });  
  }
  
  FlipBook() { 
    this.myFunctions.FlipBook();
  }
  

}
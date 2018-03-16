import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { SharedModel, GlobalModel, IssueModel, issueModel } from '../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import * as locales from 'moment/min/locales'
import * as moment from 'moment';;
import * as locales from 'moment/locale/ar-sa';

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

  issueNumber:string = null;

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

  yearslist: [{
    year:number,
    issues: issueModel[],
  }];

  years:number[];
  entries: issueModel[];

  isLoading: boolean = false;
  pageNumber: number = 1;
  pageSize:number = 24;


  selectedMonth:number = 0;
  selectedYear:number = 0;
  selectedIssueNb:string = '';
  selectedDate:Date = null;

  yearsDropdown:number[];

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }
  
  ngOnInit() {
    
    //moment.locale('ar-sa');

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("issues");
    // require("/assets/css/lightbox.css");
    // require("/assets/css/font-awesome.min.css");

    this.myFunctions.loadStylesheet("/assets/css/lightbox.css");
    this.myFunctions.loadStylesheet("/assets/css/font-awesome.min.css");


    this.route.queryParams.subscribe(params => {


      this.selectedDate = (params["date"]);

      this.issueNumber = (params["issueNumber"]);

      this.yearslist = [{
        year:0, issues:null
      }];

      this.yearslist.splice(0, 1)


      this.http.get(this.globalService.globalLinks.API_URL + 'Data/GetIssues?issueNb=' + this.issueNumber + '&date='+ this.selectedDate).subscribe((data:any) => {
        this.Model = data;   
        // this.yearslist = data.entries.map(function(obj, index){
        //   //year = obj.year;
        //   //issues = data.entries.filter(s => s.year == obj.year);
        //   var rObj = {};
        //   rObj[index] = data.entries.filter(s => s.year == obj.year);
        //   //console.log(rObj);
        //   return rObj;
        // })

        this.yearsDropdown = data.yearsDropdown;

        this.years = data.years;
        this.years.forEach(element => {
          this.yearslist.push({year:element, issues:this.Model.entries.filter(x => x.year == element)});
        });

        //this.years = data.entries.map(d => d.year);
        //this.years = data.entries;

        if(this.issueNumber != null){
          this.selectedIssueNb = this.issueNumber;
        }

        ///////////////////////////////////////////////////////////////////////////////////////
      
        setTimeout(() => {
          this.pageNumber++;
          //this.myFunctions.load_init_category_page();
          this.isLoading = false;
        },200); 

        //this.myFunctions.CustomSelect();  
        
        // setTimeout(func =>{
        //   this.myFunctions.loadScript("/assets/js/html2canvas.min.js");      
        // }, 0)
        // setTimeout(func =>{
        //   this.myFunctions.loadScript("/assets/js/three.min.js");      
        // }, 200)
        // setTimeout(func =>{
        //   this.myFunctions.loadScript("/assets/js/pdf.min.js");      
        // }, 400)
        // setTimeout(func =>{
        //   this.myFunctions.loadScript("/assets/js/3dflipbook.min.js");      
        // }, 600)
        // setTimeout(func =>{
        //   this.myFunctions.loadScript("/assets/js/lightbox.js");      
        // }, 800);
        
      }); 
    }); 
  }
  
  FlipBook() { 
    this.myFunctions.FlipBook();
  }

  FilterBy(month:number, year:number, issueNb:string){
    if(issueNb == '0'){
      issueNb = '';
      this.selectedIssueNb = '';
    }else{
      if(issueNb == 'issue'){
        issueNb = (<HTMLInputElement>document.getElementById('issueNbField')).value;
      }else{
        issueNb = this.selectedIssueNb;
      }
    }
    this.selectedMonth = month;
    this.selectedYear = year;
    this.selectedIssueNb = issueNb;

    this.pageNumber = 1;

    this.http.get(this.globalService.globalLinks.API_URL + 'Data/GetIssues?month=' + month + '&year=' + year + '&issueNb=' + issueNb).subscribe((data:any) => {
      this.Model.entries = data.entries; 

      ////////////////////////////////// reset yearslist //////////////////////////////////
      this.yearslist = [{
        year:0, issues:null
      }];

      if(data.entries && data.entries.length == 0)
      {
        this.myFunctions.HideLoadMore();
      }

      this.yearslist.splice(0, 1)

      this.years.forEach(element => {
        this.yearslist.push({year:element, issues:this.Model.entries.filter(x => x.year == element)});
      });

      ///////////////////////////////////////////////////////////////////////////////////////
      
      setTimeout(() => {
        this.pageNumber++;
        //this.myFunctions.load_init_category_page();
        this.isLoading = false;
      },200); 

    });
  }

  load_more_issues(){
    
    if(!this.isLoading){
      this.isLoading = true;
      
      this.http.get(this.globalService.globalLinks.API_URL + 'Data/GetIssues?month=' + this.selectedMonth 
      + '&year=' + this.selectedYear 
      + '&issueNb=' + this.selectedIssueNb 
      + "&page="+ (this.pageNumber-1)
      + "&pageSize=" + this.pageSize).subscribe((data:any) => {

        this.Model.entries = this.Model.entries.concat(data.entries);

        if(data.entries && data.entries.length == 0)
        {
          this.myFunctions.HideLoadMore();
        }

        ////////////////////////////////// reset yearslist //////////////////////////////////
        this.yearslist = [{
          year:0, issues:null
        }];
  
        this.yearslist.splice(0, 1)
  
        this.years.forEach(element => {
          this.yearslist.push({year:element, issues:this.Model.entries.filter(x => x.year == element)});
        });

        /////////////////////////////////////////////////////////////////////////////////////////

        setTimeout(() => {
          this.pageNumber++;
          //this.myFunctions.load_init_category_page();
          this.isLoading = false;
        },200); 
  
      });

    }
  }
  

}
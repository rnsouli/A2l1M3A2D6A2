import { Component, Input, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd, Event }   from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from './services/shared.service';
import { FunctionsService } from './services/functions.service';
import { GlobalService, GlobalLinks } from './services/global.service';

import { GlobalModel, SharedModel } from './../includes/Models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  sharedModel:SharedModel;
  
  errorHandler(event) {
    console.debug(event);
  }

  globalModel:GlobalModel = {
    //headerCategories:null,
    footerCategoriesWithSub:null,
    footerCategoriesWithoutSub:null,
    socialMedia: null,
    listenLive: null,
    listenLiveFix: null,
    googlePlay: null,
    appStore: null,
  };

  className: string;

  API_LINK:string;
  CONTENT_PATH:string;
  API_URL:string;

  constructor(private globalService: GlobalService, 
    private route: ActivatedRoute,
    private router:Router, 
    private myFunctions:FunctionsService, 
    private sharedService:SharedService, 
    private http:HttpClient){
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { 
        console.log((<NavigationStart>event).url); 
        
        
        if((<NavigationStart>event).url.toLowerCase().indexOf("/print") > -1){
          this.className = 'wrapper--large wrapper--print';
        }
        else if((<NavigationStart>event).url.toLowerCase() !="/home" && (<NavigationStart>event).url !="/"){
          this.className = 'wrapper--large';
        } 
        else{
          this.className = '';
        }

        this.myFunctions.reset_page_state();
        this.sharedService.set_currentCategorySelected(0);

        this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
        this.myFunctions.changeLogoOnScreen(this.sharedModel.logoDesktop, this.sharedModel.logoMobile);
        
      }
    });
  }

  ngOnInit(){
    console.log('global in apps');
    var intervalToClear = setInterval(() => {
      if(this.globalService.globalLinks != undefined){
        this.API_URL = this.globalService.globalLinks.API_URL;
      }
      //console.log(this.globalService.globalLinks); 
      if(this.API_URL != '' && this.API_URL != undefined){
        clearInterval(intervalToClear);
        //console.log('cleared');
        
        //if(this.sharedModel.currentRoute != "print"){
        //console.log(this.headerStructure);
        this.http.get((this.API_URL != undefined ? this.API_URL : '') + 'Data/GetGlobalData').subscribe((data:any) => {
          //this.sharedService.set_socialMedia(data['socialMedia']);
          //this.sharedService.set_formData(data.formData);
          this.sharedService.set_banners(data.banners);
          this.sharedService.set_Logos(data.logoDesktop, data.logoMobile);
          this.sharedService.set_EditorialInfo(data.editorialName, data.editorialImage);
          // console.log('editorialImage');
          // console.log(data.editorialImage);
          
          this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
          this.myFunctions.changeLogoOnScreen(this.sharedModel.logoDesktop, this.sharedModel.logoMobile);
  
                
          this.globalModel.listenLive = data.listenLive;
          this.globalModel.listenLiveFix = data.listenLiveFix;
          this.globalModel.googlePlay = data.googlePlay;
          this.globalModel.appStore = data.appStore;
          this.globalModel.socialMedia = data.socialMedia;
  
          this.sharedService.set_socialMedia(data.socialMedia);
  
          this.globalModel.footerCategoriesWithSub = data.footerCategories.filter(d => d.SubCategories != null && d.SubCategories.length > 0);
          this.globalModel.footerCategoriesWithoutSub = data.footerCategories.filter(d => d.SubCategories == null || d.SubCategories.length == 0);
          //console.log(this.globalModel);
          this.sharedService.set_headerCategories(data.categories);
          //this.globalModel.headerCategories = data.categories;
          
          //this.globalModel.submenuCategories = data.categories.filter(d => d.isOnMenu == true).slice(10);
        
          //this.globalModel.submenuCategories = this.globalModel.submenuCategories.concat(data.categories.filter(d => !d.isOnMenu == true && d.id != this._globals.ARABIC_SECTION_ID));
          
          //this.globalModel.footerCategories = data.categories.slice(0, 17);
          //this.globalModel.mobileLinks = data.socialMedia.filter(d => d.id == 8 || d.id == 9);
          
        }, (err:any) => {
          console.log(err);
          this.myFunctions.alertPopup(err.error);
        });
        //}

      }
    }, 100);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //console.log('resize')
    this.myFunctions.changeLogoOnScreen(this.sharedModel.logoDesktop, this.sharedModel.logoMobile);
  }
  
  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.myFunctions.changeLogoOnHeaderFixed(this.sharedModel.logoDesktop, this.sharedModel.logoMobile);
  }
}

import { Component, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router, NavigationStart, NavigationEnd, Event }   from '@angular/router';

import { SharedService } from './services/shared.service';
import { FunctionsService } from './services/functions.service';

import { _globals } from './../includes/globals';
import { GlobalModel } from './../includes/Models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  errorHandler(event) {
    console.debug(event);
  }

  globalModel:GlobalModel = {
    //headerCategories:null,
    footerCategoriesWithSub:null,
    footerCategoriesWithoutSub:null,
    socialMedia: null
  };

  className: string

  constructor(private router:Router, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient){
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { 
        //console.log((<NavigationStart>event).url); 
        if((<NavigationStart>event).url.toLowerCase() !="/home" && (<NavigationStart>event).url !="/"){
          this.className = 'wrapper--large';
        } else{
          this.className = '';
        }

        this.myFunctions.reset_page_state();
        this.sharedService.set_currentCategorySelected(0);
        
      }
    });
  }

  ngOnInit(){
    //this.sharedService.set_shared_model.subscribe(sharedHeaderStructure => this.headerStructure = sharedHeaderStructure);
    //console.log(this.headerStructure);
    this.http.get(_globals.API_URL + 'Data/GetGlobalData').subscribe((data:any) => {
      //this.sharedService.set_socialMedia(data['socialMedia']);
      //this.sharedService.set_formData(data.formData);
      this.globalModel.socialMedia = data.socialMedia;
      this.globalModel.footerCategoriesWithSub = data.footerCategories.filter(d => d.SubCategories != null && d.SubCategories.length > 0);
      this.globalModel.footerCategoriesWithoutSub = data.footerCategories.filter(d => d.SubCategories == null || d.SubCategories.length == 0);
      //console.log(this.globalModel);
      this.sharedService.set_headerCategories(data.categories);
      //this.globalModel.headerCategories = data.categories;
      
      //this.globalModel.submenuCategories = data.categories.filter(d => d.isOnMenu == true).slice(10);
    
      //this.globalModel.submenuCategories = this.globalModel.submenuCategories.concat(data.categories.filter(d => !d.isOnMenu == true && d.id != _globals.ARABIC_SECTION_ID));
      
      //this.globalModel.footerCategories = data.categories.slice(0, 17);
      //this.globalModel.mobileLinks = data.socialMedia.filter(d => d.id == 8 || d.id == 9);
      
    });

  }
  


}

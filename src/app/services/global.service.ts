import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
 

@Injectable()
export class GlobalService {
 
  public globalLinks: GlobalLinks;
  public globalLinksNull: GlobalLinks = null;
  private globalLinksSubject: BehaviorSubject<GlobalLinks> = new BehaviorSubject<GlobalLinks>(null);
 
  constructor(private http: Http) {
    console.log('GlobalService created');
  }
 
  public loadEnvironment() {
      // Only want to do this once - if root page is revisited, it calls this again.
      if (this.globalLinks === null || this.globalLinks === undefined) {
        console.log('Loading global.json');
 
        return this.http.get('./assets/global.json')
            .map((data) => data.json())
            .toPromise<GlobalLinks>();
      }
 
      return Promise.resolve(this.globalLinksNull);
  }
 
  public setGlobalLinks(es: GlobalLinks) {
    // This has already been set so bail out.
    if (es === null || es === undefined) {
        return;
    }
 
    this.globalLinks = es;
    console.log(this.globalLinks);
 
    if (this.globalLinksSubject) {
        this.globalLinksSubject.next(this.globalLinks);
    }
  }
 
  /*
    Call this if you want to know when globalLinks is set.
  */
  public subscribe(caller: any, callback: (caller: any, es: GlobalLinks) => void) {
      this.globalLinksSubject
          .subscribe((es) => {
              if (es === null) {
                  return;
              }
              callback(caller, es);
          });
  }
}

export class GlobalLinks{
    API_URL: string;
    API_LINK: string;
    CONTENT_PATH: string;
    RESIZED_CONTENT_PATH: string;
    BASE_URL: string;
    FACEBOOK_APP_ID: number;
    FACEBOOK_PAGE_LINK: string;

    RECAPTCHA_SITE_KEY: string;

    displayin_whitebox_medium: number;
    displayin_specializedPage: number;
    displayin_middleWhiteBox: number;
    displayin_videos: number;

    editorialId: number;
    todaysWordId: number;
    caricatureId: number;
    pillarOfTheDayId: number;

    category_template_withsubcategories: number;
    category_template_subcategories: number;
    category_template_editorial: number;
    category_template_listing: number;
    category_template_caricature: number;

    category_template_whiteboxes: number;
    category_template_2_6: number;
    category_template_1_3_8: number;

    pageSize: number;
}
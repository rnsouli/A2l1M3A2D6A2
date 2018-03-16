import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, SharedModel, ArticleModel, ArticleImageModel } from '../../../includes/Models';

import { MomentModule } from 'angular2-moment';
//import 'moment/locale/ar-sa';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  CONTENT_PATH:string;
  RESIZED_CONTENT_PATH:string;
  BASE_URL:string;

  sharedModel: SharedModel;

  isVideo: boolean = false;

  entry: ArticleModel;

  articleId: number;

  formErrors:string[] = [];

  youtubeLink:string = "";

  sendEmailUrl:string = "";  

  showLoader:boolean = false;

  description:any = "";

  hasGallery:boolean = false;

  whatsappLink:any = "";
  
  constructor(private globalService: GlobalService, private titleService: Title, private sanitizer: DomSanitizer, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) { }

  ngOnInit() {

    this.showLoader = true;

    this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
    this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
    this.BASE_URL = this.globalService.globalLinks.BASE_URL;

    this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);
    this.sharedService.set_currentRoute("details");

    this.route.params.subscribe(params => {

      this.showLoader = true;

      this.articleId = params["id"];
      
      this.http.get(this.globalService.globalLinks.API_URL + "Data/GetDetailsById?id=" + params["id"]).subscribe((data:any) =>{
        
        this.titleService.setTitle('Al mada newspaper - ' + data.title);
        this.entry = data;
        this.isVideo = this.entry.isVideo;
        this.entry.youtubeLink = this.entry.youtubeLink != null ? 'https://www.youtube.com/embed/' + this.YouTubeGetID(this.entry.youtubeLink) : null;
        if(!this.entry.ArticleImages || this.entry.ArticleImages.length == 0){

          this.hasGallery = false;
          var donut: ArticleImageModel = {
            image: this.entry.image,
            title: this.entry.caption,
            description: null 
          };

          this.entry.ArticleImages = this.entry.ArticleImages.concat(donut);
        }else{
          this.hasGallery = true;
        }    

        this.description = this.sanitizer.bypassSecurityTrustHtml(this.entry.description);

        this.youtubeLink = this.entry.youtubeLink;
        this.showLoader = false;

        //this.youtubeLink = 'https://www.youtube.com/embed/9t9u_yPEidY?rel=0';

        //console.log(this.youtubeLink);
        // console.log(this.entry.date);
        // console.log((new Date(this.entry.date)));

        // this.date = this.myFunctions.timeSince(new Date(this.entry.date));

        // console.log(this.date);


        this.sendEmailUrl = 'https://www.addthis.com/tellfriend_v2.php'
        + '?v=300&winname=addthis&pub=ra-5a4ce5ff163c4827&source=tbx-300&lng=en&s=email' 
        + '&url=' + this.entry.urlBrowser 
        + '&title=' + this.entry.title 
        + '&ate=AT-ra-5a4ce5ff163c4827/-/-/5a5490bee0c41227/2'
        + '&uid=5649b7c023005b1d'
        + '&description=' + this.entry.smallDescription
        + '&uud=1&ct=1&ui_email_to=&ui_email_from=&ui_email_note=&tt=0&captcha_provider=recaptcha2&pro=0'
        + '&ats=imp_url%3D1%26smd%3Drsi%253D%2526gen%253D0%2526rsc%253D%2526dr%253D%2526sta%253DAT-ra-5a4ce5ff163c4827%25252F-%25252F-%25252F5a5490bee0c41227%25252F1%26hideEmailSharingConfirmation%3Dfalse%26service%3Demail%26media%3Dundefined%26passthrough%3Dundefined%26email_template%3Dundefined%26email_vars%3D'
        + '&atc=username%3Dra-5a4ce5ff163c4827%26services_exclude%3D%26services_exclude_natural%3D%26services_compact%3Dfacebook%252Ctwitter%252Cpinterest_share%252Cprint%252Cemail%252Cgmail%252Cgoogle_plusone_share%252Clinkedin%252Cmailto%252Ctumblr%252Cmore%26product%3Dtbx-300%26widgetId%3Dundefined%26pubid%3Dra-5a4ce5ff163c4827%26ui_pane%3Demail'
        + '&rb=false';

        this.myFunctions.SliderSingleSwiper();
        this.entry.urlBrowser = this.BASE_URL + "Details/" + this.entry.id;// + (this.entry.customUrlTitle ? '/' + this.entry.customUrlTitle : '');
        this.whatsappLink = this.sanitizer.bypassSecurityTrustUrl('whatsapp://send?text=' + this.entry.urlBrowser);
        this.myFunctions.load_fb_comments("fbComment");
        this.myFunctions.loadScript("https://platform.twitter.com/widgets.js");
        this.myFunctions.getFacebookCounterAjax(this.entry.urlBrowser);
        this.addArticleViewCounter();
        this.myFunctions.hide_comments_counter();

        this.myFunctions.loadScript("http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5a4ce5ff163c4827");

      });

    });

  }

  addArticleViewCounter() {
    this.formErrors = [];
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(this.globalService.globalLinks.API_URL + "Data/AddViewCounter?articleId=" + this.articleId, 
      { headers: headers }).subscribe((data:any) =>{
    
    }, (err:any) => {
      this.formErrors.push(err.error.message);
      console.log(err.error.message);
    });

  }
  
  increaseFont(){
    let shand = document.getElementsByClassName('article__entry') as HTMLCollectionOf<HTMLElement>;
    if (shand.length != 0) {
      if((shand[0].style.fontSize) != ""){
        shand[0].style.fontSize = (+(shand[0].style.fontSize.split('px')[0]) + 2).toString() + "px";
      }
      else{
        shand[0].style.fontSize = "17px";
      }
    }
  }
  
  decreaseFont(){
    let shand = document.getElementsByClassName('article__entry') as HTMLCollectionOf<HTMLElement>;
    if((shand[0].style.fontSize) != ""){
      shand[0].style.fontSize = (+(shand[0].style.fontSize.split('px')[0]) - 2).toString() + "px";
    }
    else{
      shand[0].style.fontSize = "13px";
    }
  }

  print(id:number){
    
    var newWindow = window.open('/Print/' + id);
    // if(newWindow){
    //   setTimeout(() => {
    //     newWindow.print();
    //   }, 3000);
    //  }
    return true;
  }

  YouTubeGetID(url:string){
    var ID = '';
    var urltosplit = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
      ID = urltosplit[2].split(/[^0-9a-z_\-]/i)[0];
    }
    else {
      ID = urltosplit[0];
    }
      return ID;
  }

  GetImageGalleryWidth(url:string){
    var img = new Image();
    img.src = url;
    let firstImageInGalleryIsSmall = false;
    img.onload = function() {
      //alert(img.width  + 'x' + img.height);
      if(img.width < 750){
        return firstImageInGalleryIsSmall = true;
      }else{
        return false;
      }
    };
  }

  facebookShare(linkUrl:string, title:string){
    this.myFunctions.facebookShare(linkUrl, title);
  }
  
  tweetPopup(linkUrl:string, title:string, text:string, imageUrl:string){
    this.myFunctions.tweetPopup(linkUrl, title, text, imageUrl);
  }
  
  googlePlusShare(linkUrl:string){
    this.myFunctions.googlePlusShare(linkUrl);
  }
  
  pinterestShare(linkUrl:string, title:string, text:string, imageUrl:string){
    this.myFunctions.pinterestShare(linkUrl, title, text, imageUrl);
  }
  
}
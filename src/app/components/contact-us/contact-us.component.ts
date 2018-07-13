import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, SharedModel, ContactInfoModel, ContactFormModel, Country } from '../../../includes/Models';

import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  
    resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

    CONTENT_PATH:string;
    RESIZED_CONTENT_PATH:string;
    RECAPTCHA_SITE_KEY: string;
  
    Model: ContactInfoModel[];  
    countries: Country[];
    showMessageUs: boolean = false;

    contactFormModel: ContactFormModel;
    isSubmitted:boolean = false;
    formErrors:string[] = [];

    sharedModel:SharedModel;
    
    @Input() globalModel:GlobalModel;

    imageUpload:{
      progress:number;
      thumbnail:string;
      delete_url:string;
      status:string;
      name:string;
    }
  
    constructor(private globalService: GlobalService, 
      private route: ActivatedRoute, 
      private myFunctions:FunctionsService, 
      private sharedService:SharedService, 
      private http:HttpClient) { 
      this.contactFormModel = {   
        email:null,
        countryId:null,
        fullName:null,
        message:null,
        phone:null,
        image:null,
      }

      this.imageUpload = {
        progress: 0,
        thumbnail:'',
        delete_url:'',
        status:'empty',
        name:null
      }
    }
    ngOnInit() {
      this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

      this.RECAPTCHA_SITE_KEY = this.globalService.globalLinks.RECAPTCHA_SITE_KEY;

      this.sharedService.set_currentRoute("contactus");
      
      this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;

      var intervalToClear = setInterval(() => {
        if(this.globalService.globalLinks != undefined){
          this.CONTENT_PATH = this.globalService.globalLinks.CONTENT_PATH;
          this.RESIZED_CONTENT_PATH = this.globalService.globalLinks.RESIZED_CONTENT_PATH;
        }
        if(this.CONTENT_PATH != '' && this.CONTENT_PATH != undefined){
          clearInterval(intervalToClear);
          
          this.http.get(this.globalService.globalLinks.API_URL + 'Data/GetContactUsData').subscribe((data:any) => {
            this.Model = data.entries;
            this.countries = data.countries;   
            this.showMessageUs = data.showMessageUs;   
            //this.myFunctions.CustomSelect(); 
          }, (err:any) => {
            this.myFunctions.alertPopup(err.error);
          });
        }
      },100);
  
    }
    
    SubmitContact(e, form:ContactFormModel) {
      this.isSubmitted = true;
      this.formErrors = [];
      form.image = this.imageUpload ? this.imageUpload.name : '';
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.globalService.globalLinks.API_URL + 'Data/SendContact', JSON.stringify(form), {
        headers: headers
      }).subscribe((data:any) => {
        this.myFunctions.OnFormSubmit('contactForm');
        this.isSubmitted = false;
        this.formErrors = [];
        this.imageUpload.status = 'empty';
        this.imageUpload.delete_url = '';
        this.imageUpload.name = '';
        this.imageUpload.progress = 0;
        console.log('success');
      }, (err:any) => {
        this.isSubmitted = false;
        this.formErrors.push(err.error.message);
        this.myFunctions.alertPopup(err.error);
      });
    }

    image_upload(event){
      if(this.imageUpload.delete_url && this.imageUpload.delete_url != ''){
        this.http.delete(this.imageUpload.delete_url);
      }
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {
          let file: File = fileList[0];
          let formData:FormData = new FormData();
          formData.append("uploadFile", file, file.name);
          
          let headers = new HttpHeaders().set('Accept', 'application/json');
       
              const req = new HttpRequest('POST', this.globalService.globalLinks.API_URL + 'Upload/UploadFiles?inputName=image&directory=Contact&hasCaption=False&hasDescription=False&hasCheckbox=False&maxNumberOfFiles=1', formData, {
                reportProgress: true,
                headers:headers
              });
              this.http.request(req).subscribe(event => {
                //this.agreementUpload.name = file.name;
                this.imageUpload.status = 'uploading';
                if (event.type === HttpEventType.UploadProgress) {
                  const percentDone = Math.round(100 * event.loaded / event.total);
                  this.imageUpload.progress = percentDone;
                } else if (event instanceof HttpResponse) {
                  // console.log(event.body[0]);
                  this.imageUpload.status = 'done';
                  this.imageUpload.delete_url = event.body[0]["delete_url"];
                  this.imageUpload.thumbnail = this.globalService.globalLinks.API_LINK + '/Contact/' +  event.body[0]["name"];
                  this.imageUpload.name = event.body[0]["name"];
                 
                  console.log(event);
                }
              }, (err:any) => {
              });
      }
    }
  
  
  delete_image(){
      if(this.imageUpload.delete_url && this.imageUpload.delete_url != ''){
        this.http.delete(this.imageUpload.delete_url);
        this.imageUpload.status = 'empty';
        this.imageUpload.delete_url = '';
        this.imageUpload.name = '';
        this.imageUpload.progress = 0;
      }
    }


  }


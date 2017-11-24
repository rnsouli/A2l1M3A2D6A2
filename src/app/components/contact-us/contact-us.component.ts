import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { GlobalModel, SharedModel, ContactInfoModel, ContactFormModel, Country } from '../../../includes/Models';

import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  
    CONTENT_PATH:string;
    RESIZED_CONTENT_PATH:string;
  
    Model: ContactInfoModel[];  
    countries: Country[];

    contactFormModel: ContactFormModel;
    isSubmitted:boolean = false;
    formErrors:string[] = [];

    sharedModel:SharedModel;
    
    @Input() globalModel:GlobalModel;
  
    constructor(private route: ActivatedRoute, 
      private myFunctions:FunctionsService, 
      private sharedService:SharedService, 
      private http:HttpClient) { 
      this.contactFormModel = {   
        email:null,
        countryId:null,
        fullName:null,
        message:null,
        phone:null,
      }
    }
    ngOnInit() {
      this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

      this.sharedService.set_currentRoute("contactus");
  
      this.http.get(_globals.API_URL + 'Data/GetContactUsData').subscribe((data:any) => {
        this.Model = data.entries;
        this.countries = data.countries;   
        this.myFunctions.CustomSelect(); 
      });
    }
    
    SubmitContact(e, form:ContactFormModel) {
      this.isSubmitted = true;
      this.formErrors = [];
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(_globals.API_URL + 'Data/SendContact', JSON.stringify(form), {
        headers: headers
      }).subscribe((data:any) => {
        this.myFunctions.OnFormSubmit('contactForm');
        this.isSubmitted = false;
        this.formErrors = [];
        console.log('success');
      }, (err:any) => {
        this.isSubmitted = false;
        this.formErrors.push(err.error.message);
        console.log(err.error.message);
      });
    }
  }


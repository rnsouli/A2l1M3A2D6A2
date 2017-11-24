import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { _globals } from '../../../includes/globals';
import { GlobalModel, SharedModel, AdvertiseFormModel, Country } from '../../../includes/Models';

import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})

export class AdvertiseComponent implements OnInit {
  
    CONTENT_PATH:string;
    RESIZED_CONTENT_PATH:string;
   
    countries: Country[];
    budgets: Country[];
    advertiseTimes: Country[];
    advertiseGenders: Country[];
    targetAges: Country[];

    advertiseFormModel: AdvertiseFormModel;
    isSubmitted:boolean = false;
    formErrors:string[] = [];

    sharedModel:SharedModel;
    
    @Input() globalModel:GlobalModel;
  
    constructor(private route: ActivatedRoute, 
      private myFunctions:FunctionsService, 
      private sharedService:SharedService, 
      private http:HttpClient) { 
      this.advertiseFormModel = {   
        email:null,
        countryId:null,
        fullName:null,
        message:null,
        phone:null,
        company:null,
        budgetId:null,
        ageId:null,
        timeId:null,
        genderId: null,
        isSingle: false,
      }
    }
    ngOnInit() {
      this.sharedService.sharedModel.subscribe((sharedModel:any) => this.sharedModel = sharedModel);

      this.sharedService.set_currentRoute("advertise");
  
      this.http.get(_globals.API_URL + 'Data/GetAdvertiseUsData').subscribe((data:any) => {
        //this.countries = data.countries;    
        this.budgets = data.budgets;
        this.advertiseTimes = data.advertiseTimes;
        this.advertiseGenders = data.advertiseGenders;
        this.targetAges = data.targetAges; 
        this.myFunctions.CustomSelect(); 
      });
    }
    
    SubmitAdvertise(e, form:AdvertiseFormModel) {
      this.isSubmitted = true;
      this.formErrors = [];
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(_globals.API_URL + 'Data/SubmitAdvertise', JSON.stringify(form), {
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



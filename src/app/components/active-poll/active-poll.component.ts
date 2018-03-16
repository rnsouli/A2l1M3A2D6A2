import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from '../../services/shared.service';
import { FunctionsService } from '../../services/functions.service';

import { GlobalService } from '../../services/global.service';
import { GlobalModel, SharedModel, QuestionModel, QuestionFormModel } from '../../../includes/Models';

@Component({
  selector: 'app-active-poll',
  templateUrl: './active-poll.component.html',
  styleUrls: ['./active-poll.component.css']
})
export class ActivePollComponent implements OnInit {

  @Input() item: QuestionModel;  

  isSubmitted:boolean = false;
  formErrors:string[] = [];

  questionFormModel: QuestionFormModel;

  @Input() defaultChoice: string;
  
  @Output() valueChosen: EventEmitter<any> = new EventEmitter();
  
  Math: any;

  values: any;

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private myFunctions:FunctionsService, private sharedService:SharedService, private http:HttpClient) {
    this.Math = Math;
  }
  
  ngOnInit() {
    this.choose(this.defaultChoice);

    this.questionFormModel = {   
      questionId: this.item.id,
      answerId:0,
    } 

    console.log(this.item);

  }

  private choose(value: string) {
    this.valueChosen.emit(value);
  }
  
  SaveVote(e, form:QuestionFormModel, id:number) {
    this.isSubmitted = true;
    this.formErrors = [];
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(this.globalService.globalLinks.API_URL + 'Data/SaveVote', JSON.stringify(form), {
      headers: headers
    }).subscribe((data:any) => {
      this.myFunctions.OnFormSubmit('poll_' + id);

      this.questionFormModel = {   
        questionId: this.item.id,
        answerId:0,
      } 

      this.values = data.values;
      this.myFunctions.progress_bar();
      
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

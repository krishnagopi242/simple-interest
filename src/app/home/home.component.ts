import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  simpleINT = 0;
  months = 0;
  isSubmitClicked = false;
  interestForm = this.fb.group({
    principalAmount: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    interestAmount: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.isLoading = true;
  }

  onSubmit() {
    this.isSubmitClicked = true;
    let firstDate = moment(this.startDate?.value, 'YYYY-MM-DD'); //Create date using string-format constructor
    let secondDate = moment(this.endDate?.value, 'YYYY-MM-DD');
    let duration = moment.duration(secondDate.diff(firstDate));
    let months = duration.asMonths();
    this.months = duration.asDays();
    this.simpleINT = Math.round((this.principalAmount?.value * months * this.interestAmount?.value) / 100);
    console.log(this.simpleINT);
  }

  get principalAmount(): AbstractControl {
    return this.interestForm.get('principalAmount') as AbstractControl;
  }
  get startDate(): AbstractControl {
    return this.interestForm.get('startDate') as AbstractControl;
  }
  get endDate(): AbstractControl {
    return this.interestForm.get('endDate') as AbstractControl;
  }
  get interestAmount(): AbstractControl {
    return this.interestForm.get('interestAmount') as AbstractControl;
  }
}

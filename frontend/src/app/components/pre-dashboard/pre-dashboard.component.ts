import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-pre-dashboard',
  templateUrl: './pre-dashboard.component.html',
  styleUrls: ['./pre-dashboard.component.scss']
})
export class PreDashboardComponent implements OnInit {

  public articles = [];
  public showPreDashboard = false;
  public contactForm: FormGroup;
  public emailResponseMessage: string;
  public showLoader = false;
  public errorInEmailSending = false;

  constructor(private dataService: DataService,
    private backendService: BackendService,
    private helper: HelperService) { }


  ngOnInit() {
    this.contactForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'subject': new FormControl(null, [Validators.required]),
      'message': new FormControl(null, [Validators.required, this.messageValidator.bind(this)])
    });
    this.getArticles();
  }

  public getArticles() {
    this.dataService.getArticleList().subscribe((data: any) => {
      this.articles = data;
      this.showPreDashboard = true;
    }, (error) => {
      console.log(error);
    });
  }

  public onSubmit() {
    this.sendEmail();
  }

  public messageValidator(formControl: FormControl): any {
    if (formControl.value && (<string>formControl.value).length < 20) {
      return { 'validLength': true };
    }
  }

  public sendEmail() {
    this.showLoader = true;
    this.emailResponseMessage = '';
    this.backendService.post(this.helper.getUrl() + 'send-query', this.contactForm.value).subscribe((response) => {
      this.emailResponseMessage = response['message'] + ' Please check your inbox for copy of your response';
      this.showLoader = false;
      console.log(response);
    }, (error) => {
      this.showLoader = false;
      this.emailResponseMessage = error.error['message'];
      this.errorInEmailSending = true;
      console.log(error);
    });
  }

}

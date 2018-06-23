import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public objectservice: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.objectservice
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = authStatus;
      });
  }

  onlogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.objectservice.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}

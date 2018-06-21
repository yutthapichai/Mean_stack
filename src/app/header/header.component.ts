import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private objectService: AuthService) {}


  ngOnInit() {
    this.userIsAuthenticated = this.objectService.getIsAuth();
    this.authListenerSubs = this.objectService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }


  onLogout() {
    this.objectService.logout();
  }


  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}

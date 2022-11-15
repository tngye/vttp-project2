import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  auth: boolean = false
  authuser!: string
  sub$!: Subscription
  dataUrl!: string

  constructor(private appSvc: AppService, private router: Router) {
    // this.sub$ = this.appSvc.currentUser.subscribe(data => {
    //   console.info('>>> in sub: ', data)
    //   this.authuser = data
    // })
  }

  ngOnInit(): void {
    this.checkSess()
    this.appSvc.getPhoto(this.authuser)
    .then(results => {
      this.sub$ = this.appSvc.dataUrl.subscribe(data => {
        // console.info('>>> in sub: ', data)
        this.dataUrl = data
      })
    })
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
  }


  checkSess() {
    this.auth = !!this.appSvc.getToken();
    if (this.auth) {
      const user = this.appSvc.getUser();
      this.authuser = user.replace(/"/g, '');
    }
  }

  signout() {
    this.appSvc.signOut()
    this.router.navigate(['/'])
    .then(() => window.location.reload())
    // window.location.reload();
  }

}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { Attraction } from '../models';

@Component({
  selector: 'app-attraction-dets',
  templateUrl: './attraction-dets.component.html',
  styleUrls: ['./attraction-dets.component.css']
})
export class AttractionDetsComponent implements OnInit {

  data!: any;
  routeState!: any;
  auth: boolean = false
  authuser!: string
  boolfav: boolean = false
  type!: string

  constructor(private router: Router, private appSvc: AppService, private activatedRoute : ActivatedRoute) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.data = this.router.getCurrentNavigation()?.extras.state;
      console.log(this.data)
      // if (this.routeState) {
      //   this.data = this.routeState
      //     ? JSON.parse(this.routeState)
      //     : '';
      // }
    }}

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.params['type']
    this.auth = !!this.appSvc.getToken();

    if (this.auth) {
      const user = this.appSvc.getUser()
      this.authuser = user.replace(/"/g, '')
      this.checkfav()
    }
  }

  addtofav(a : any){
    console.log("a", a)
    if(this.auth){
      this.appSvc.addtofav(a, this.authuser, this.type)
      .then(results => {
        if(results){
        this.boolfav = true
        }else{
          this.boolfav= false
        }})
    }
    else(
      this.router.navigate(['/login'])
    )
  }

  checkfav(){
    this.appSvc.checkfav(this.data.uuid, this.authuser, this.type)
    .then(results => {
      if(results){
        this.boolfav = true
        }
    })
  }

}

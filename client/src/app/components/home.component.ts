import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private appSvc: AppService){}

  ngOnInit(): void {
  }

  goToAttractions(){
    this.router.navigate(['/attractions'])
  }

  goToAccoms(){
    this.router.navigate(['/accomodations'])
  }

  goToEvents(){
    this.router.navigate(['/events'])
  }
}

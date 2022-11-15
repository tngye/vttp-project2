import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Accommodation, accommodationDB } from '../models';

@Component({
  selector: 'app-accomodations',
  templateUrl: './accomodations.component.html',
  styleUrls: ['./accomodations.component.css']
})
export class AccomodationsComponent implements OnInit {
  form!: FormGroup
  types: string[] = []
  accList: Accommodation[] = []
  keyword!: string
  accommodations = accommodationDB
  accUUIDs: string[] = []
  nomore: boolean = false


  auth: boolean = false
  authuser!: string
  constructor(private appSvc: AppService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createForm()
    this.getAccommodationsDefault()

    this.auth = !!this.appSvc.getToken();
    console.log(this.auth);
    
    if (this.auth) {
      const user = this.appSvc.getUser()
      this.authuser = user.replace(/"/g, '')
    }

    console.log(this.authuser);
    console.log("a", this.accommodations)
  }

  createForm() {
    return this.fb.group({
      search: this.fb.control<string>('')
    })
  }

  getAccommodationsDefault() {
    this.appSvc.getAccomsBySearch("singapore", false)
      .then(results => {
        this.accList = results
        // console.log("res: ", results)

        this.save()
      })
  }

  searchbykey() {
    this.keyword = this.form.value['search']
    console.log(this.keyword)
    this.appSvc.getAccomsBySearch(this.keyword, true)
      .then(results => {
        this.accList = results
        console.log("this.accList: ", this.accList)
        for(var d in accommodationDB){
          delete accommodationDB[d]
        }
        this.save()
      }).catch(res => {
        if(res.status === 500){
          this.nomore = true
          this.accUUIDs = []
        }
      })

  }

  search() {
    this.keyword = this.form.value['search']
    console.log(this.keyword)
    this.appSvc.getAccomsBySearch(this.keyword, false)
      .then(results => {
        this.accList = results
        console.log("this.accList: ", this.accList)
        this.save()
      }).catch(res => {
        if(res.status === 500){
          this.nomore = true
          this.accUUIDs = []
        }
      })

  }

  getNext() {
    this.search()
  }

  save() {
    if (this.accList.length > 0) {
      for (var d of this.accList) {
        accommodationDB[d.uuid] = d
      }
    }
    this.accUUIDs = []
    for (let k in accommodationDB) {
      this.accUUIDs.push(k)
    }
  }

  addtofav(a: Accommodation){
    console.log("a", a)
    if(this.auth){
      this.appSvc.addtofavacc(a, this.authuser)
    }
    else(
      this.router.navigate(['/login'])
    )
  }

  details(a: Accommodation){
    this.router.navigate(['/attractiondets', "Accommodations"], { state: a })
  }

}

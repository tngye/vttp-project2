import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Attraction, attractionDB } from '../models';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css']
})
export class AttractionsComponent implements OnInit {
  form!: FormGroup
  types: string[] = []
  attList: Attraction[] = []
  keyword!: string
  attractions = attractionDB
  attUUIDs: string[] = []
  nomore: boolean = false

  auth: boolean = false
  authuser!: string

  constructor(private appSvc: AppService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createForm()
    this.getAttractionsDefault()

    this.auth = !!this.appSvc.getToken();
    console.log(this.auth);
    
    if (this.auth) {
      const user = this.appSvc.getUser()
      this.authuser = user.replace(/"/g, '')
    }

    console.log(this.authuser);
  }

  createForm() {
    return this.fb.group({
      search: this.fb.control<string>('')
    })
  }

  // getAttractionsTypes(){
  //   this.appSvc.getAttractionsTypes()
  //     .then(results => {
  //       for(var r of results){
  //         this.types.push(r)
  //       }
  //       console.log("res: " , this.types)
  //     })
  // }

  getAttractionsDefault() {
    this.appSvc.getAttractionBySearch("adventure", false)
      .then(results => {
        this.attList = results
        console.log("res: ", results)

        this.save()
      })
  }


  searchbykey() {
    this.keyword = this.form.value['search']
    console.log(this.keyword)
    this.appSvc.getAttractionBySearch(this.keyword, true)
      .then(results => {
        this.attList = results
        console.log("res: ", results)
        for(var d in attractionDB){
          delete attractionDB[d]
        }
        this.save()
      }).catch(res => {
        if(res.status === 500){
          this.nomore = true
          this.attUUIDs = []
        }
      })

  }

  search() {
    this.keyword = this.form.value['search']
    console.log(this.keyword)
    this.appSvc.getAttractionBySearch(this.keyword, false)
      .then(results => {
        this.attList = results
        console.log("res: ", results)
        this.save()
      }).catch(res => {
        if(res.status === 500){
          this.nomore = true
          this.attUUIDs = []
        }
      })

  }

  getNext() {
    this.search()
  }

  save() {
    if (this.attList.length > 0) {
      for (var d of this.attList) {
        attractionDB[d.uuid] = d
      }
    }
    this.attUUIDs = []
    for (let k in attractionDB) {
      this.attUUIDs.push(k)
    }
  }

  addtofav(a: Attraction){
    console.log("a", a)
    if(this.auth){
      this.appSvc.addtofavatt(a, this.authuser)
    }
    else(
      this.router.navigate(['/login'])
    )
  }

  details(a: Attraction){
    this.router.navigate(['/attractiondets', "Attractions"], { state: a })
  }
}

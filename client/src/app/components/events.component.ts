import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Event, eventDB } from '../models';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  form!: FormGroup
  types: string[] = []
  eventList: Event[] = []
  keyword!: string
  events = eventDB
  eventUUIDs: string[] = []
  error: boolean = false
  nomore: boolean = false

  auth: boolean = false
  authuser!: string
  constructor(private appSvc: AppService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createForm()
    this.getEventsDefault()

    this.auth = !!this.appSvc.getToken();
    console.log(this.auth);
    
    if (this.auth) {
      const user = this.appSvc.getUser()
      this.authuser = user.replace(/"/g, '')
    }

    console.log(this.authuser);
    console.log("a", this.events)
  }

  createForm() {
    return this.fb.group({
      search: this.fb.control<string>('')
    })
  }

  getEventsDefault() {
    this.appSvc.getEventsBySearch("singapore", false)
      .then(results => {
        this.eventList = results
        console.log("res: ", results)

        this.save()
      }).catch(res => {
        this.error = true
      })
  }

  search() {
    this.keyword = this.form.value['search']
    console.log(this.keyword)
    this.appSvc.getEventsBySearch(this.keyword, false)
      .then(results => {
        this.eventList = results
        console.log("res: ", results)
        this.save()
      }).catch(res => {
        if(res.status === 500){
          this.nomore = true
          this.eventUUIDs = []
        }
        console.log("res", res.status)
        this.error = true
      })

  }

  searchbykey() {
    this.keyword = this.form.value['search']
    console.log(this.keyword)
    this.appSvc.getEventsBySearch(this.keyword, true)
      .then(results => {
        this.eventList = results
        console.log("res: ", results)
        for(var d in eventDB){
          delete eventDB[d]
        }
        this.save()
      }).catch(res => {
        if(res.status === 500){
          this.nomore = true
          this.eventUUIDs = []
        }
        console.log("res", res.status)
        this.error = true
      })

  }

  getNext() {
    this.search()
  }

  save() {
    if (this.eventList.length > 0) {
      for (var d of this.eventList) {
        eventDB[d.uuid] = d
      }
    }
    this.eventUUIDs = []
    for (let k in eventDB) {
      this.eventUUIDs.push(k)
    }
  }

  addtofav(a: Event){
    console.log("a", a)
    if(this.auth){
      this.appSvc.addtofavev(a, this.authuser)
    }
    else(
      this.router.navigate(['/login'])
    )
  }

  details(a: Event){
    this.router.navigate(['/attractiondets', "Events"], { state: a })
  }

}

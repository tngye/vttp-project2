import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, withLatestFrom } from 'rxjs';
import { AppService } from '../app.service';
import { User } from '../models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  auth: boolean = false
  authuser!: string
  sub$!: Subscription
  dataUrl!: string

  constructor(private fb: FormBuilder, private appSvc: AppService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.auth = !!this.appSvc.getToken();

    if (this.auth) {
      const user = this.appSvc.getUser()
      this.authuser = user.replace(/"/g, '')
      this.appSvc.getPhoto(this.authuser)
      .then(results => {
        this.sub$ = this.appSvc.dataUrl.subscribe(data => {
          // console.info('>>> in sub: ', data)
          this.dataUrl = data
        })
      })
      // .catch(results => {
      //   console.log("test3", results)
      // })
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
}

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        // width: '250px',
        minHeight: '250px'
        
      });
  
}
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  @ViewChild('toUpload')
  toUpload!: ElementRef
  form!: FormGroup

  constructor(private appSvc: AppService, private fb: FormBuilder, public dialogRef: MatDialogRef<DialogOverviewExampleDialog>){}

  ngOnInit(): void {
    this.form = this.fb.group({
      // title: this.fb.control<string>('', [ Validators.required ]),
      file: this.fb.control<any>('', [ Validators.required ]),
    })
  }
 
  doUpload() {
    console.info('>>> upload: ', this.form.value)
    // @ts-ignore
    console.info('>>> toUpload: ', this.toUpload.nativeElement.files[0])

    const myFile = this.toUpload.nativeElement.files[0]

    this.appSvc.upload(myFile)
      .then(result => {
        console.info('>>> result: ', result)
        this.dialogRef.close()
      })
      .then(()=> {
        window.location.reload();
      }) .catch(error => {
        console.error('>> error: ', error)
      })
  }
}

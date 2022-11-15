import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../app.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Favourite } from '../models';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favList!: any
  displayedColumns: string[] = ['id', 'name', 'address'];
  dataSourceAtt!: MatTableDataSource<any>;
  dataSourceAcc!: MatTableDataSource<any>;
  dataSourceEv!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('pdfTable') pdfTable!: ElementRef;

  constructor(private appSvc: AppService) {
    const favs = this.getFavs()
    // console.log(this.favList)
    // this.dataSource = new MatTableDataSource(this.favList);
  }

  ngOnInit(): void {
    // this.getFavs()
  }

  ngAfterViewInit() {
    this.dataSourceAtt.paginator = this.paginator;
    this.dataSourceAtt.sort = this.sort;
    this.dataSourceAcc.paginator = this.paginator;
    this.dataSourceAcc.sort = this.sort;
    this.dataSourceEv.paginator = this.paginator;
    this.dataSourceEv.sort = this.sort;
    console.log(this.favList)
  }

  getFavs() {
    this.appSvc.getFavs()
      .then(res => {
        this.dataSourceAtt = new MatTableDataSource(res.attractions);
        this.dataSourceAcc = new MatTableDataSource(res.accommodations);
        this.dataSourceEv = new MatTableDataSource(res.events);
        return this.favList = res
      })
    console.log(this.favList)
    return this.favList
  }

  applyFilterAtt(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAtt.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAtt.paginator) {
      this.dataSourceAtt.paginator.firstPage();
    }
  }
  applyFilterAcc(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceAcc.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceAcc.paginator) {
      this.dataSourceAcc.paginator.firstPage();
    }
  }
  applyFilterEv(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEv.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEv.paginator) {
      this.dataSourceEv.paginator.firstPage();
    }
  }

  export(){
    // const data = this.dataSource.data.map((a, b) => key: a, value: b)
    console.log("test", this.favList)
    // const workSheet = XLSX.utils.json_to_sheet(this.favList, {header:['dataprop1', 'dataprop2']});
    // const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    // // XLSX.writeFile(workBook, 'filename.xlsx');

    // var ab = this.s2ab(workBook); // from example above
    // var blob = new Blob([ab], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
    // const contentDataURL = this.pdfTable.nativeElement.innerHTML.toDataURL('image/png')
    // let pdf = new jsPDF()
    // pdf.addImage(contentDataURL)
    // pdf.save('form.pdf')


    const doc = new jsPDF('p', 'pt', 'a4');
    console.log("test", this.pdfTable.nativeElement.innerHTML)
    doc.html(this.pdfTable.nativeElement.innerHTML, {'margin': 10})
    .then(() => {
    var blob = new Blob([doc.output('blob')], { type: 'application/pdf' });
    this.appSvc.send(blob)
    .then((results) => {
      alert("Email sent.")
    }).catch((res)=> {
      alert("Error")
    })
  })
  
    // this.appSvc.send(blob);
  }
  s2ab(s: any) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}
  
}

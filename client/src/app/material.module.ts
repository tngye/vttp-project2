import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {  MatSelectModule} from '@angular/material/select'
import {  MatSidenavModule } from '@angular/material/sidenav'
import {  MatMenuModule } from '@angular/material/menu'
import {  MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatDialogModule } from '@angular/material/dialog';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';

const matModules: any[] = [
  MatToolbarModule, MatButtonModule, MatListModule,
  MatIconModule, MatInputModule, MatFormFieldModule,
  MatSelectModule, MatSidenavModule, MatMenuModule, 
  MatCardModule, MatProgressBarModule, MatDialogModule,
  MdbCarouselModule, MatTableModule, MatPaginatorModule,
  MatSortModule
]

@NgModule({
  imports: matModules,
  exports: matModules
})
export class MaterialModule {}
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'WnioskiUrlopowe';
  displayedColumns: string[] = ['Name', 'Substitute', 'Type', 'Comment', 'Date', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllHolidayForms();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
     width:"30%"
    }).afterClosed().subscribe(val=>{
      if(val ==='Zapisz'){
        this.getAllHolidayForms();
      }
    })
  }

  getAllHolidayForms(){
    this.api.getHolidayForm()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=> {
        alert("Error has encountered!")
      }
    })
  }

  editHolidayForm(row : any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllHolidayForms();
      }
    })
  }

  deleteHolidayForm(id: number){
    this.api.deleteHolidayForm(id)
    .subscribe({
      next:(res)=> {
        alert("Usunięto wniosek!")
        this.getAllHolidayForms();
      },
      error:()=> {
        alert("Error")
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

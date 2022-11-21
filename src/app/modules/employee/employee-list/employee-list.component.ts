import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  employee: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  dtElement: any;

  // For accessing the Grid's API
  constructor(private empservice: EmployeeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: false
    };
    this.griddata();
   }
  openDialog() {
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      width: '60%',
      minHeight: 'calc(80vh - 90px)',
      height: 'auto',
      data:{
        action:'add'
            }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.data == true) {
        this.rerender();
        }
    });
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.griddata();    });
  }
  EditClick(id:any){
    const dialogRef = this.dialog.open(EmployeeAddComponent, {
      width: '60%',
      minHeight: 'calc(80vh - 90px)',
      height: 'auto',
      data:{
        action:'edit',
        id:id
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      debugger;
      if (result.data == true) {
        this.rerender();
        }
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  griddata() {
    this.empservice.getalluser().subscribe((data: any[]) => {
      this.employee = data;
      this.dtTrigger.next(void 0);
    });
  }
}

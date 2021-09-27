import { Component, OnInit, ViewChild  } from '@angular/core';
import * as $ from 'jquery';
import { DataBindingDirective } from "@progress/kendo-angular-grid";
import { PageChangeEvent, GridDataResult } from "@progress/kendo-angular-grid";
import { process } from "@progress/kendo-data-query";
import { SortDescriptor, orderBy } from "@progress/kendo-data-query";
import {GridServiceService} from './grid-service.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'grid-assignment';
  sampleString = 'textBinding';
  public gridData: any=[];
  @ViewChild(DataBindingDirective)
  dataBinding!: DataBindingDirective;
  public gridView!: any;
  public mySelection: string[] = [];
  public pageNo =1;
  public userData:any=[];
  public pageSize =6;
  public totalCount:any;
  public skip = 0;
  public searchText!: string;
  public sort: SortDescriptor[] = [
    {
      field: "first_name",
      dir: "asc",
    },
  ];
  constructor(private gridService:GridServiceService )
  {

  }
 ngOnInit(){
   //to fetch user data from service on ngOninit
  this.getUsers(this.pageNo);
 }
  //to fetch userData from service
  public getUsers(pageNo:number){
    this.gridService.getUserData(pageNo).subscribe(res=>{
      console.log("userdata", res);
      this.totalCount = res.total;
      this.userData =res.data;
      this.gridData = this.userData; 
      this.loadItems();
      
    })
  }
  //to collapse and hide sidebar
 SidebarCollapse () {
    $('.menu-collapsed').toggleClass('d-none');
    $('.sidebar-submenu').toggleClass('d-none');
    $('.submenu-icon').toggleClass('d-none');
    $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
    
    // Treating d-flex/d-none on separators with title
    var SeparatorTitle = $('.sidebar-separator-title');
    if ( SeparatorTitle.hasClass('d-flex') ) {
        SeparatorTitle.removeClass('d-flex');
    } else {
        SeparatorTitle.addClass('d-flex');
    }
    
    // Collapse/Expand icon
    $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
}

//grid pagination
public onPageChange({ skip, take }: PageChangeEvent): void {
  this.skip = skip;
  this.pageSize = take;
  let currentPage =(skip + this.pageSize)/this.pageSize;
  console.log("pagechange", currentPage);
  //service will get refresh based on page number for ex: pageSize:1, pageSize:2
  this.getUsers(currentPage);
}
//Its loads data into grid with pagination
private loadItems(): void {
  this.gridView = {
    data: orderBy(this.gridData, this.sort),
    total: this.totalCount,
  };
}
//to serach by text
public onFilter(inputValue: string): void {
  this.gridView = process(this.gridData, {
      filter: {
          logic: "or",
          filters: [
              {
                  field: 'first_name',
                  operator: 'contains',
                  value: inputValue
              },
              {
                  field: 'last_name',
                  operator: 'contains',
                  value: inputValue
              },
              {
                  field: 'email',
                  operator: 'contains',
                  value: inputValue
              }
          ],
      }
  }).data;

  this.dataBinding.skip = 0;
}
public sortChange(sort: SortDescriptor[]): void {
  this.sort = sort;
  this.loadItems();
}

}
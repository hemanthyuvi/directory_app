import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../services/directory.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
userId:string;
formModal: any;

columnDefs: ColDef[] = [
  { field: 'make' },
  { field: 'model' },
  { field: 'price' }
];

rowData = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Porsche', model: 'Boxster', price: 72000 }
];

  constructor(private _api: DirectoryService, private route: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  isLoggedOut(){
    this.formModal.show();
  }

  logoutUser(){
      this.formModal.hide();
      this._api.removeToken();
      this.route.navigate(['/login']);
  }

  addContact(){
    this.route.navigate(['addContact'], {relativeTo: this._activatedRoute});
  }

}

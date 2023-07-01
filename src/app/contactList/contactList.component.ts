import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../services/directory.service';

@Component({
  selector: 'app-contactList',
  templateUrl: './contactList.component.html',
  styleUrls: ['./contactList.component.scss']
})
export class ContactListComponent implements OnInit {
  userId: string;

  constructor(private _api:DirectoryService,) { }

  ngOnInit() {
    const token = this._api.getToken();
    const decodeToken = this._api.decodeToken(token);
    this.userId = decodeToken["userId"];
    this._api.getUsersList(this.userId).subscribe(res => {
      console.log(res);
    });
  }

}

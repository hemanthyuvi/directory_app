import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenotFound',
  templateUrl: './pagenotFound.component.html',
  styleUrls: ['./pagenotFound.component.scss']
})
export class PagenotFoundComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  goToHome(){
    this.route.navigate(['/login']);
  }

}

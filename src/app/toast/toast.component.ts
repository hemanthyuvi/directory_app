import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
declare var bootstrap: any;
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() toastMessage:string;
  @Output() enableToast:EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnChanges(){
    const toastLiveExample = document.getElementById('liveToast')
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  }

  ngOnInit() {
  }

  closeToast(off: boolean){
    this.enableToast.emit(false)
  }

}

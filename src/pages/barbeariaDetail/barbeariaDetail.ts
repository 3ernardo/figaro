import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CrudBarbeariasService } from '../../app/crud-barbearias.service';


@Component({
  selector: 'page-barbeariaDetail',
  templateUrl: 'barbeariaDetail.html'
})
export class BarbeariaDetailPage {
params;
  constructor(public navCtrl: NavController, private service:CrudBarbeariasService) {
     this.params = service.retornaBarbearias;
     console.log(this.params);
  }

}

import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-barbeariaDetail',
  templateUrl: 'barbeariaDetail.html'
})
export class BarbeariaDetailPage {
 
nome ;
logradouro; 
foto;
servicos;
  constructor(public navCtrl: NavController, public NavParams : NavParams) {
     this.nome = this.NavParams.data.obj.nome;
     this.logradouro = this.NavParams.data.obj.logradouro;
     this.foto = this.NavParams.data.obj.foto;
     this.servicos = this.NavParams.data.obj.servicos;

  }

}

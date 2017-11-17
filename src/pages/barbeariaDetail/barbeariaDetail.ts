import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AgendamentoPage } from '../agendamento/agendamento';


@Component({
  selector: 'page-barbeariaDetail',
  templateUrl: 'barbeariaDetail.html'
})
export class BarbeariaDetailPage {
  
nome; 
logradouro; 
foto; 
servicos;
obj;
  constructor(public navCtrl: NavController, public NavParams : NavParams) {
     this.obj = this.NavParams.data.obj;
     this.nome = this.NavParams.data.obj.nome;
     this.logradouro = this.NavParams.data.obj.logradouro;
     this.foto = this.NavParams.data.obj.foto;
     this.servicos = this.NavParams.data.obj.servicos;

  }
  
    agendamento(params) {
      if (!params) params = {};
      this.navCtrl.push(AgendamentoPage, { obj: params });
    }
  

}

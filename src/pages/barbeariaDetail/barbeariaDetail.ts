import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  horario_de;
  horario_ate;
  horarios = [];
  horariosAtendimento = "";

  constructor(public navCtrl: NavController, public NavParams: NavParams) {
    this.obj = this.NavParams.data.obj;
    this.nome = this.NavParams.data.obj.nome;
    this.logradouro = this.NavParams.data.obj.logradouro;
    this.foto = this.NavParams.data.obj.foto;
    this.servicos = this.NavParams.data.obj.servicos;



    this.horario_de = this.NavParams.data.obj.horario_de;
    this.horario_ate = this.NavParams.data.obj.horario_ate;



    var d = new Date();

    var h = d.getHours();
    var m = d.getMinutes();

    this.horariosAtendimento += this.horario_de + ":00";
    this.horariosAtendimento += " as " + this.horario_ate + ":00";
    for (this.horario_de; this.horario_de <= this.horario_ate; this.horario_de++) {



      if (this.horario_de > h) {
         this.horarios.push(this.horario_de + ":00");
         this.horarios.push(this.horario_de + ":30");
      }
    }


  }

  agendamento(params) {
    if (this.horarios.length > 0) {

      if (!params) params = {};
      this.navCtrl.push(AgendamentoPage, { obj: params });
    } else {
      document.getElementById("botaoAgendar").hidden = true;
      alert('sem horários disponíveis');

    }
  }




}

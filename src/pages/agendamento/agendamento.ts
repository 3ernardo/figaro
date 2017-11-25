import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarbeariaDetailPage } from '../barbeariaDetail/barbeariaDetail';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the AgendamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agendamento',
  templateUrl: 'agendamento.html',
})
export class AgendamentoPage {
  nome;
  servicos;
  obj;
  horario_de;
  horario_ate;
  horarios = [];
  data;
  constructor(public navCtrl: NavController, public NavParams: NavParams, private fdb: AngularFireDatabase) {
    this.obj = this.NavParams.data.obj;
    this.nome = this.NavParams.data.obj.nome;
    this.servicos = this.NavParams.data.obj.servicos;
    this.horario_de = this.NavParams.data.obj.horario_de;
    this.horario_ate = this.NavParams.data.obj.horario_ate;

    var d = new Date();
    this.data = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
    var h = d.getHours();
    var m = d.getMinutes();


    for (this.horario_de; this.horario_de <= this.horario_ate; this.horario_de++) {

      if (this.horario_de > h) {

        this.horarios.push(this.horario_de + ":00");

        this.horarios.push(this.horario_de + ":30");
      }

    }



  }
  showSelectValue = function (mySelect) {
    console.log(mySelect);
  }

  salvarAgendamento(horario, servico) {

    if (servico == "barbaEcabelo") {
      if (horario.substr(3, 2) == "00") {
        horario = horario.substr(0, 2) + "30";
      } else {
        var novaHora = horario.substr(0, 2) + 1;
        horario = novaHora + ":00";
      }




      this.fdb.list("/agendamentos/").push({
        horario: horario,
        nome: this.nome,
        data: this.data,
        servico: servico,
      });


      this.navCtrl.popToRoot();
    }



  }

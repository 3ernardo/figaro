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
  constructor(public navCtrl: NavController, public NavParams: NavParams, private fdb: AngularFireDatabase) {
    this.obj = this.NavParams.data.obj;
    this.nome = this.NavParams.data.obj.nome;
    this.servicos = this.NavParams.data.obj.servicos;
    this.horario_de = this.NavParams.data.obj.horario_de;
    this.horario_ate = this.NavParams.data.obj.horario_ate;

    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();


    for (this.horario_de; this.horario_de <= this.horario_ate; this.horario_de++) {

      if (this.horario_de > h) {
        this.horarios.push(this.horario_de);
      }

    }



  }
  showSelectValue = function (mySelect) {
    console.log(mySelect);
  }

  salvarAgendamento(horario) {

    this.fdb.list("/agendamentos/").push({ horario: horario, nome: this.nome });


    this.navCtrl.popToRoot();
  }



}

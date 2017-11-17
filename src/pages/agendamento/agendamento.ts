import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarbeariaDetailPage } from '../barbeariaDetail/barbeariaDetail';
import { AngularFireDatabase} from 'angularfire2/database';
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
  constructor(public navCtrl: NavController, public NavParams: NavParams,private fdb: AngularFireDatabase) {
    this.obj = this.NavParams.data.obj;
    this.nome = this.NavParams.data.obj.nome;
    this.servicos = this.NavParams.data.obj.servicos;
    this.horario_de = this.NavParams.data.obj.horario_de;
    this.horario_ate = this.NavParams.data.obj.horario_ate;
    console.log('horario ' + this.horario_de);


    for (this.horario_de; this.horario_de <= this.horario_ate; this.horario_de++) {
      this.horarios.push(this.horario_de);

    }



  }


  salvarAgendamento(nome){
    this.fdb.list("/agendamentos/").push(nome);
  }



}

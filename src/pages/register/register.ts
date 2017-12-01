import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import * as swal from 'sweetalert2'
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;


  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }



  async register(user: User, params){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.senha);
    console.log(result);
    
    const swal = require('sweetalert2')
    
      swal(
        'Parabéns!',
        'Você está cadastrado.',
        'success'
      )
    
    
    this.navCtrl.push('LoginPage');
    }
    catch(e){
      console.log(e);
      const swal = require('sweetalert2')

      swal(
        'Oops...',
        'O Email deve conter @ e .com / A senha deve no mínimo 6 caracteres.',
        'error'
      )
    }
  }
}

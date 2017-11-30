import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth';


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



  async register(user: User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.senha);
    console.log(result);
    }
    catch(e){
      console.log(e);
      alert("O Email deve conter @ e .com / A senha deve no mínimo 6 caracteres.");
    }
  }
}

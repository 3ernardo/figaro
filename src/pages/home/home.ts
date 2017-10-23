import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  //Array onde serao intupados os dados
  myInput;
  myInputDois;
  barbearias = [];


  //String que montara a URL de Rest para API do Maps



  // atributo fdb contem os dados do banco
  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase) {
    this.localizarUsuario();

  }


  //inclui de acordo com o caminho.
  btnAddClickedDois() {
    this.fdb.list("/barbearias/la_mafia").push(this.myInputDois);


  }

  public localizarUsuario() {



    this.fdb.list('/barbearias', { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          var localizacaoBarbearia;
          var barbearias2 = this.barbearias;
          var nome = snapshot.val().nome;

          localizacaoBarbearia = snapshot.val().localizacao;
          //console.log(localizacaoBarbearia);


          if (window.navigator && window.navigator.geolocation) {

            var geolocation = window.navigator.geolocation;
            var posicaoAtual = geolocation.getCurrentPosition(sucesso, erro);
     

          } else {
            alert('Geolocalização não suportada em seu navegador.')
          }
          function sucesso(posicao) {

            var latitude = posicao.coords.latitude;
            var longitude = posicao.coords.longitude;


            //FUNÇÃO QUE USA API MATRIX GOOGLE MAPS PARA RETORNAR A DISTANCIA EM Km 
            //ENTRE DOIS PONTOS
            var distance = require('google-distance-matrix');

            var origins = [latitude + "," + longitude];
            // https://maps.googleapis.com/maps/api/geocode/json?latlng=-30.0352362,-51.2259691&key=AIzaSyCHsz-mX3bLwuIlnRWV1gcEuXlT4ioQSzs
            // request para json com informações do local
            var destinations = [localizacaoBarbearia];

            distance.key('AIzaSyDl3kN1tvhtZMhXKy_zVmpnHmVty8PXYBg');
            distance.units('metric');

            distance.matrix(origins, destinations, function (err, distances) {
              if (err) {
                return console.log(err);
              }
              if (!distances) {
                return console.log('no distances');
              }
              if (distances.status == 'OK') {
                for (var i = 0; i < origins.length; i++) {
                  for (var j = 0; j < destinations.length; j++) {
                    var origin = distances.origin_addresses[i];
                    var destination = distances.destination_addresses[j];
                    if (distances.rows[0].elements[j].status == 'OK') {
                      var distancia = distances.rows[i].elements[j].distance.value;
                      barbearias2.push({ "distancia": distancia, "nome": nome });
                      barbearias2.sort(sortFunction);
                    } else {
                      console.log(destination + ' is not reachable by land from ' + origin);
                    }
                  }
                }
              }
            });

          }
          //console.log('barb =  ' + barbearias2);

          function erro(error) {
            console.log(error)
          }
          function sortFunction(a, b) {
            if (a["distancia"] === b["distancia"]) {
              return 0;
            }
            else {
              return (a["distancia"] < b["distancia"]) ? -1 : 1;
            }
          }

        })

      })



  }




  //deleta conforme o caminho com acao de clica
  delete(i) {

    this.fdb.list("/barbearias/la_mafia").remove();

  }
}
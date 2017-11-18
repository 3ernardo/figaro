import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarbeariaDetailPage } from '../barbeariaDetail/barbeariaDetail'
import { CrudBarbeariasService } from '../../app/crud-barbearias.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
}) 


export class HomePage {
  //Array onde serao intupados os dados
  myInput;
  myInputDois;
  barbearias = [];


  // atributo fdb contem os dados do banco
  constructor(public navCtrl: NavController, private fdb: AngularFireDatabase, private service: CrudBarbeariasService) {
    this.localizarUsuario();


    if (window.navigator && window.navigator.geolocation) {

      var geolocation = window.navigator.geolocation;
      var posicaoAtual = geolocation.getCurrentPosition(this.retornaCidadeBairro);



    } else {
      alert('Geolocalização não suportada em seu navegador.')
    }

  }

  barbeariaDetailAtual;

  //vai para barbeariasDetail...
  barbeariaDetail(params) {
    if (!params) params = {};
    this.navCtrl.push(BarbeariaDetailPage, { obj: params });
  }


  //inclui de acordo com o caminho.
  btnAddClickedDois() {
    this.fdb.list("/barbearias/la_mafia").push(this.myInputDois);
  }


  retornaCidadeBairro(posicao) {

    var latitude = posicao.coords.latitude;
    var longitude = posicao.coords.longitude;
    var retornaResultado;
    var request = new XMLHttpRequest();
    request.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCHsz-mX3bLwuIlnRWV1gcEuXlT4ioQSzs', true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        let data = JSON.parse(request.responseText);
        let district = data.results[0].address_components[2].short_name;
        let city = data.results[0].address_components[3].short_name;
        document.getElementById("localizacaoBairroCidade").innerHTML = district + " - " + city;
        retornaResultado = district + " - " + city;

      } else {
        // We reached our target server, but it returned an error.
      }

    };

    request.onerror = function () {
      console.log("There was a connection error of some sort.");
    };

    request.send();
    return retornaResultado;

  }


  public localizarUsuario() {

    this.fdb.list('/barbearias', { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          var localizacaoBarbearia;
          var distanciaM;
          var barbearias2 = this.barbearias;
          var nome = snapshot.val().nome;
          var foto = snapshot.val().foto;
          var logradouro = snapshot.val().logradouro;
          var servicos = snapshot.val().servicos;
          var horario_de = snapshot.val().horario_de;
          var horario_ate = snapshot.val().horario_ate;
          localizacaoBarbearia = snapshot.val().localizacao;

          if (window.navigator && window.navigator.geolocation) {

            var geolocation = window.navigator.geolocation;
            var posicaoAtual = geolocation.getCurrentPosition(sucesso);


          } else {
            alert('Geolocalização não suportada em seu navegador.')
          }
          function sucesso(posicao) {

            var latitude = posicao.coords.latitude;
            var longitude = posicao.coords.longitude;


            //FUNÇÃO QUE USA API MATRIX GOOGLE MAPS PARA RETORNAR A DISTANCIA EM Km 
            //ENTRE DOIS PONTOS
            var distance = require('google-distance-matrix');

            var origins = [localizacaoBarbearia];
            var destinations = [latitude + "," + longitude];

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
                      barbearias2.push(
                        {
                          "distancia": (Math.round(distancia / 100)) / 10,
                          "nome": nome,
                          "logradouro": logradouro,
                          "foto": foto,
                          "servicos": servicos,
                          "horario_ate": horario_ate,
                          "horario_de": horario_de
                        });
                      barbearias2.sort(sortFunction);
                    } else {
                      console.log(destination + ' is not reachable by land from ' + origin);
                    }
                  }
                }
              }
              function sortFunction(a, b) {
                if (a["distancia"] === b["distancia"]) {
                  return 0;
                }
                else {
                  return (a["distancia"] < b["distancia"]) ? -1 : 1;
                }
              }

            }
            )
          }
        }
        )
      }
      )
  }


}
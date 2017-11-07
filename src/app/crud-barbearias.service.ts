import { Injectable } from '@angular/core';

@Injectable()
export class CrudBarbeariasService {
  teste;

  autoIncrement: number = 2;

  constructor() { }
  
  armazenaBarbearia(barbearia){
    this.teste = barbearia;
    console.log(this.teste);
  }

  retornaBarbearias(){
    return (this.teste);
  }
}
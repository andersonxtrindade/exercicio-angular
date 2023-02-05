import { Component } from '@angular/core';
import { User } from "../../shared/models";
import { Router } from '@angular/router';
import {ApiService} from "../../shared/api.service";
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User = {};
  formLogin!: FormGroup;

  constructor(
    private router: Router,
    private api: ApiService,
    private messageService: MessageService, 
    private formBuilder: FormBuilder,
  ){
  }

  nome = new FormControl('');

  senha = new FormControl('');

  createForm() {
    this.formLogin = this.formBuilder.group({
      nome: this.nome,
      senha: this.senha,
    })
  }
  
  async ngOnInit() {
    this.createForm();
  }  

  onSubmit(event: Event) {
    event.preventDefault();
    
    this.login();
    this.formLogin.reset();
  }

  async login() {
    if(this.formLogin.value.senha) {
      let response = await this.api.login(this.formLogin.value);
      if (response.status === 'error') {
        this.messageService.add({severity:'error', summary: 'Erro', detail: 'Senha errada!', life: 3000});
        return;
      }
      localStorage.setItem('token', response.token);
      await this.router.navigate(["pessoas"]);
    } else {
      this.messageService.add({severity:'error', summary: 'Erro', detail: 'Digite a senha!', life: 3000});
    }    
  }
}

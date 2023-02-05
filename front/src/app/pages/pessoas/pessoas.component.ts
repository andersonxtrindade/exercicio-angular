import { Component } from '@angular/core';
import { Pessoa } from "../../shared/models";
import { ApiService } from "../../shared/api.service";
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent {

  pessoas: Pessoa[] = [];
  perfisList: object[] = [];
  pessoa: Pessoa = {};
  displayPessoa: boolean = false;
  displayEdit: boolean = false;
  displayDelete: boolean = false;
  selectedPessoa: Pessoa = {};
  formPessoa!: FormGroup;

  constructor(
    private api: ApiService, 
    private messageService: MessageService, 
    private formBuilder: FormBuilder,
  ) {
  }

  id = new FormControl('');

  nome = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);

  senha = new FormControl('');

  perfis_id = new FormControl('', [
    Validators.required
  ]);

  createForm() {
    this.formPessoa = this.formBuilder.group({
      id: this.id,
      nome: this.nome,
      senha: this.senha,
      perfis_id: this.perfis_id,
    })
  }

  async ngOnInit() {
    await this.busca("");
    await this.buscaPerfis("");
    this.createForm();
  }  

  async buscaPerfis(q: string) {
    let response = await this.api.getPerfis(q);
    this.perfisList = response.map(({
      nome: label,
      id: value
    }) => ({
      label,
      value
    }));
  }

  async busca(q: string) {
    this.pessoas = await this.api.getPessoas(q)
  }
    
  async salvarPessoa() {

    if (this.formPessoa.value?.nome?.trim()) {
        if (this.formPessoa.value.id) {
          this.api.updatePessoas(this.formPessoa.value);
          await this.busca("");      
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Pessoa atualizada com sucesso!', life: 3000});
        } else {
          await this.api.insertPessoas(this.formPessoa.value);
          await this.busca("");
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Pessoa inserida com sucesso!', life: 3000});
        }

        this.pessoas = [...this.pessoas];
        this.displayPessoa = false;
        this.formPessoa.reset();
    }
  }
  
  onSubmit(event: Event) {
    event.preventDefault();
    
    this.salvarPessoa();
    this.formPessoa.reset();

    this.displayPessoa = false;
  }

  handleDeleteDialog(pessoa: Pessoa) {
    this.displayDelete = true;
    this.selectedPessoa = pessoa;
  }

  hideDeleteDialog() {
    this.displayDelete = false;
    this.displayEdit = false;
  }

  deleteSelectedPessoa() {
    this.api.deletePessoas(this.selectedPessoa);
    this.pessoas = this.pessoas.filter(val => val !== this.selectedPessoa);
    this.displayDelete = false;
    this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Pessoa deletada com sucesso!', life: 3000});
  }

  editarPessoa(pessoa: Pessoa) {
    this.displayPessoa = true;
    this.displayEdit = true;
    let formPessoa = {...pessoa};
    delete formPessoa['perfil'];
    delete formPessoa['senha'];
    this.formPessoa.patchValue(formPessoa);
  }

  hideDialog() {
    this.displayPessoa = false;
    this.formPessoa.reset();
  }

  openDialog() {
    this.displayPessoa = true;
  }
}

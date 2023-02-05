import { Component } from '@angular/core';
import { Lotacao } from "../../shared/models";
import { ApiService } from "../../shared/api.service";
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lotacoes',
  templateUrl: './lotacoes.component.html',
  styleUrls: ['./lotacoes.component.scss']
})
export class LotacoesComponent {

  lotacoes: Lotacao[] = [];
  lotacao: Lotacao = {};
  gabinetesList: object[] = [];
  pessoasList: object[] = [];
  displayLotacao: boolean = false;
  displayDelete: boolean = false;
  selectedLotacao: Lotacao = {};
  formLotacao!: FormGroup;

  constructor(
    private api: ApiService,
    private messageService: MessageService, 
    private formBuilder: FormBuilder,
  ) {
  }

  id = new FormControl('');

  gabinetes_id = new FormControl('', [
    Validators.required,
  ]);

  pessoas_id = new FormControl('', [
    Validators.required,
  ]);

  createForm() {
    this.formLotacao = this.formBuilder.group({
      id: this.id,
      gabinetes_id: this.gabinetes_id,
      pessoas_id: this.pessoas_id,
    })
  }

  async ngOnInit() {
    await this.busca("")
    await this.buscaGabinetes("")
    await this.buscaPessoas("")
    this.createForm()
  }

  hideDialog() {
    this.displayLotacao = false;
    this.formLotacao.reset();
  }

  openDialog() {
    this.displayLotacao = true;
  }

  async busca(q: string) {
    this.lotacoes = await this.api.getLotacoes(q);
  }

  async buscaGabinetes(q: string) {
    let response = await this.api.getGabinetes(q);
    this.gabinetesList = response.map(({
      nome: label,
      id: value
    }) => ({
      label,
      value
    }));
  }

  async buscaPessoas(q: string) {
    let response = await this.api.getPessoas(q);
    this.pessoasList = response.map(({
      nome: label,
      id: value
    }) => ({
      label,
      value
    }));
  }

  async salvarLotacao() {

    if (this.formLotacao.value.id) {
      this.api.updateLotacoes(this.formLotacao.value);
      await this.busca("");             
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Lotacão atualizada com sucesso!', life: 3000});
    } else {
      await this.api.insertLotacoes(this.formLotacao.value);
      await this.busca("");
      this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Lotação inserida com sucesso!', life: 3000});
    }

    this.lotacoes = [...this.lotacoes];
    this.displayLotacao = false;
    this.formLotacao.reset();
    
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    this.salvarLotacao();
    this.formLotacao.reset();

    this.displayLotacao = false;
  }

  handleDeleteDialog(lotacao: Lotacao) {
    this.displayDelete = true;
    this.selectedLotacao = lotacao;
  }

  hideDeleteDialog() {
    this.displayDelete = false;
  }

  deleteSelectedLotacao() {
    this.api.deleteLotacoes(this.selectedLotacao);
    this.lotacoes = this.lotacoes.filter(val => val !== this.selectedLotacao);
    this.displayDelete = false;
    this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Lotação deletada com sucesso!', life: 3000});
  }

  editarLotacao(lotacao: Lotacao) {
    this.displayLotacao = true;
    let lotacaoForm = {...lotacao};
    delete lotacaoForm['gabinete'];
    delete lotacaoForm['pessoa'];
    this.formLotacao.patchValue(lotacaoForm);
  }

}

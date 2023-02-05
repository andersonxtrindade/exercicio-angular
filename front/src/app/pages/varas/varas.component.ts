import { Component } from '@angular/core';
import { Vara } from "../../shared/models";
import { ApiService } from "../../shared/api.service";
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-varas',
  templateUrl: './varas.component.html',
  styleUrls: ['./varas.component.scss']
})
export class VarasComponent {

  varas: Vara[] = [];
  vara: Vara = {};
  setoresList: object[] = [];
  displayVara: boolean = false;
  displayDelete: boolean = false;
  selectedVara: Vara = {};
  formVara!: FormGroup;

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

  setores_id = new FormControl('', [
    Validators.required
  ]);

  createForm() {
    this.formVara = this.formBuilder.group({
      id: this.id,
      nome: this.nome,
      setores_id: this.setores_id,
    })
  }

  async ngOnInit() {
    await this.busca("");
    await this.buscaSetores("");
    this.createForm();
  }

  hideDialog() {
    this.displayVara = false;
    this.formVara.reset();
  }

  openDialog() {
    this.displayVara = true;
  }

  async busca(q: string) {
    this.varas = await this.api.getVaras(q);
  }

  async buscaSetores(q: string) {
    let response = await this.api.getSetores(q);
    this.setoresList = response.map(({
      nome: label,
      id: value
    }) => ({
      label,
      value
    }));
  }

  async salvarVara() {

    if (this.formVara.value?.nome?.trim()) {
        if (this.formVara.value.id) {
          this.api.updateVaras(this.formVara.value);
          await this.busca("");            
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Vara atualizada com sucesso!', life: 3000});
        } else {
          await this.api.insertVaras(this.formVara.value);
          await this.busca("");
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Vara inserida com sucesso!', life: 3000});
        }

        this.varas = [...this.varas];
        this.displayVara = false;
        this.formVara.reset();
    }
  }
  
  onSubmit(event: Event) {
    event.preventDefault();
    
    this.salvarVara();
    this.formVara.reset();

    this.displayVara = false;
  }

  deleteSelectedVara() {
    this.api.deleteVaras(this.selectedVara);
    this.varas = this.varas.filter(val => val !== this.selectedVara);
    this.displayDelete = false;
    this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Vara deletada com sucesso!', life: 3000});
  }

  handleDeleteDialog(vara: Vara) {
    this.displayDelete = true;
    this.selectedVara = vara;
  }

  hideDeleteDialog() {
    this.displayDelete = false;
  }

  editarVara(vara: Vara) {
    this.displayVara = true;
    let formVara = {...vara};
    delete formVara['setor']; 
    this.formVara.patchValue(formVara);
  } 

}

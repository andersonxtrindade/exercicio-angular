import { Component } from '@angular/core';
import { Setor } from "../../shared/models";
import { ApiService } from "../../shared/api.service";
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrls: ['./setores.component.scss']
})
export class SetoresComponent {

  setores: Setor[] = [];
  setor: Setor = {};
  displaySetor: boolean = false;
  displayDelete: boolean = false;
  selectedSetor: Setor = {};
  formSetor!: FormGroup;

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

  createForm() {
    this.formSetor = this.formBuilder.group({
      id: this.id,
      nome: this.nome,
    })
  }

  async ngOnInit() {
    await this.busca("");
    this.createForm();
  }

  hideDialog() {
    this.displaySetor = false;
    this.formSetor.reset();
  }

  openDialog() {
    this.displaySetor = true;
  }

  async busca(q: string) {
    this.setores = await this.api.getSetores(q);
  }

  async salvarSetor() {

    if (this.formSetor.value?.nome?.trim()) {
        if (this.formSetor.value?.id) {
          this.api.updateSetores(this.formSetor.value);
          await this.busca("");              
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Setor atualizada com sucesso!', life: 3000});
        } else {
          await this.api.insertSetores(this.formSetor.value);
          await this.busca("");
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Setor inserida com sucesso!', life: 3000});
        }

        this.setores = [...this.setores];
        this.displaySetor = false;
        this.formSetor.reset();
    }
  }
  
  onSubmit(event: Event) {
    event.preventDefault();
    
    this.salvarSetor();
    this.formSetor.reset();

    this.displaySetor = false;
  }

  handleDeleteDialog(setor: Setor) {
    this.displayDelete = true;
    this.selectedSetor = setor;
  }

  hideDeleteDialog() {
    this.displayDelete = false;
  }

  deleteSelectedSetor() {
    this.api.deleteSetores(this.selectedSetor);
    this.setores = this.setores.filter(val => val !== this.selectedSetor);
    this.displayDelete = false;
    this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Setor deletada com sucesso!', life: 3000});
  }

  editarSetor(setor: Setor) {
    this.displaySetor = true;
    let formSetor = {...setor};
    this.formSetor.patchValue(formSetor);
  }
}

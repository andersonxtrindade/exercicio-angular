import { Component } from '@angular/core';
import { Gabinete } from "../../shared/models";
import { ApiService } from "../../shared/api.service";
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-gabinetes',
  templateUrl: './gabinetes.component.html',
  styleUrls: ['./gabinetes.component.scss']
})
export class GabinetesComponent {

  gabinetes: Gabinete[] = [];
  gabinete: Gabinete = {};
  varasList: object[] = [];
  displayGabinete: boolean = false;
  displayDelete: boolean = false;
  selectedGabinete: Gabinete = {};
  formGabinete!: FormGroup;

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

  varas_id = new FormControl('', [
    Validators.required
  ]);

  createForm() {
    this.formGabinete = this.formBuilder.group({
      id: this.id,
      nome: this.nome,
      varas_id: this.varas_id,
    })
  }

  async ngOnInit() {
    await this.busca("");
    await this.buscaVaras("");
    this.createForm();
  }

  hideDialog() {
    this.displayGabinete = false;
    this.formGabinete.reset();
  }

  openDialog() {
    this.displayGabinete = true;
  }

  async busca(q: string) {
    this.gabinetes = await this.api.getGabinetes(q);
  }

  async buscaVaras(q: string) {
    let response = await this.api.getVaras(q);
    this.varasList = response.map(({
      nome: label,
      id: value
    }) => ({
      label,
      value
    }));
  }

  async salvarGabinete() {

    if (this.formGabinete.value?.nome?.trim()) {
        if (this.formGabinete.value.id) {
          this.api.updateGabinetes(this.formGabinete.value);
          await this.busca("");               
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Gabinete atualizada com sucesso!', life: 3000});
        } else {
          await this.api.insertGabinetes(this.formGabinete.value);
          await this.busca("");
          this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Gabinete inserida com sucesso!', life: 3000});
        }

        this.gabinetes = [...this.gabinetes];
        this.formGabinete.reset();
    }

  }
  
  onSubmit(event: Event) {
    event.preventDefault();
    
    this.salvarGabinete();
    this.formGabinete.reset();

    this.displayGabinete = false;
  }

  handleDeleteDialog(gabinete: Gabinete) {
    this.displayDelete = true;
    this.selectedGabinete = gabinete;
  }

  hideDeleteDialog() {
    this.displayDelete = false;
  }

  deleteSelectedGabinete() {
    this.api.deleteGabinetes(this.selectedGabinete);
    this.gabinetes = this.gabinetes.filter(val => val !== this.selectedGabinete);
    this.displayDelete = false;
    this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Gabinete deletada com sucesso!', life: 3000});
  }

  editarGabinete(gabinete: Gabinete) {
    this.displayGabinete = true;
    let formGabinete = {...gabinete};
    delete this.gabinete['vara']; 
    this.formGabinete.patchValue(formGabinete);
  }

}

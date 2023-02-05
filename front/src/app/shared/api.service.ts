import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {environment} from 'src/environments/environment.example';
import {Pessoa, Setor, Perfil, Vara, Gabinete, Lotacao} from "./models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly url: string
  private header: any = {}

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl || ''
  }

  async getServiceStatus(): Promise<string> {
    return await firstValueFrom(this.http.get<string>(`${this.url}status`))
  }
  

  async getPessoas(q: string): Promise<Pessoa[]> {
    return await firstValueFrom(this.http.get<Pessoa[]>(`${this.url}pessoas?q=${q}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}))
  }
  
  async insertPessoas(pessoa: Pessoa): Promise<any> {
    return await firstValueFrom(this.http.post<Pessoa>(`${this.url}pessoas`, pessoa, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }
  
  async updatePessoas(pessoa: Pessoa){
    return await firstValueFrom(this.http.put<Pessoa>(`${this.url}pessoas/${pessoa.id}`, pessoa, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }
  
  async deletePessoas(pessoa: Pessoa){
    return firstValueFrom(this.http.delete<Pessoa>(`${this.url}pessoas/${pessoa.id}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }


  async getPerfis(q: string): Promise<Perfil[]> {
    return await firstValueFrom(this.http.get<Perfil[]>(`${this.url}perfis?q=${q}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}))
  }


  async getSetores(q: string): Promise<Setor[]> {
    return await firstValueFrom(this.http.get<Setor[]>(`${this.url}setores?q=${q}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}))
  }
  
  async insertSetores(setor: Setor): Promise<any> {
    return await firstValueFrom(this.http.post<any>(`${this.url}setores`, setor, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }
  
  async updateSetores(setor: Setor){
    return await firstValueFrom(this.http.put<Setor>(`${this.url}setores/${setor.id}`, setor, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }
  
  async deleteSetores(setor: Setor){
    return firstValueFrom(this.http.delete<Setor>(`${this.url}setores/${setor.id}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }

  

  async getVaras(q: string): Promise<Vara[]> {
    return await firstValueFrom(this.http.get<Vara[]>(`${this.url}varas?q=${q}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}))
  }
  
  async insertVaras(vara: Vara): Promise<any> {
    return await firstValueFrom(this.http.post<any>(`${this.url}varas`, vara, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }
  
  async updateVaras(vara: Vara){
    return await firstValueFrom(this.http.put<Vara>(`${this.url}varas/${vara.id}`, vara, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }
  
  async deleteVaras(vara: Vara){
    return firstValueFrom(this.http.delete<Vara>(`${this.url}varas/${vara.id}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }


  
  async getGabinetes(q: string): Promise<Gabinete[]> {
    return await firstValueFrom(this.http.get<Gabinete[]>(`${this.url}gabinetes?q=${q}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}))
  }
  
  async insertGabinetes(gabinete: Gabinete): Promise<any> {
    return await firstValueFrom(this.http.post<any>(`${this.url}gabinetes`, gabinete, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }
  
  async updateGabinetes(gabinete: Gabinete){
    return await firstValueFrom(this.http.put<Gabinete>(`${this.url}gabinetes/${gabinete.id}`, gabinete, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }
  
  async deleteGabinetes(gabinete: Gabinete){
    return firstValueFrom(this.http.delete<Gabinete>(`${this.url}gabinetes/${gabinete .id}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }


  
  async getLotacoes(q: string): Promise<Lotacao[]> {
    return await firstValueFrom(this.http.get<Lotacao[]>(`${this.url}lotacoes?q=${q}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}))
  }
  
  async insertLotacoes(lotacao: Lotacao): Promise<any> {
    return await firstValueFrom(this.http.post<any>(`${this.url}lotacoes`, lotacao, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }
  
  async updateLotacoes(lotacao: Lotacao){
    return await firstValueFrom(this.http.put<Lotacao>(`${this.url}lotacoes/${lotacao.id}`, lotacao, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }
  
  async deleteLotacoes(lotacao: Lotacao){
    return firstValueFrom(this.http.delete<Lotacao>(`${this.url}lotacoes/${lotacao.id}`, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token') || '{}'})}));
  }



  async login(pessoa: Pessoa): Promise<any> {
    return await firstValueFrom(this.http.post<any>(`${this.url}login`, pessoa));
  } 
}

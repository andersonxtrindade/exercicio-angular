import { HostListener, Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public innerWidth: any;

  items: MenuItem[] = [
    {label: 'Pessoas', icon: 'pi pi-fw pi-user', routerLink: ["pessoas"]},
    {label: 'Setores', icon: 'pi pi-fw pi-building', routerLink: ["setores"]},
    {label: 'Varas', icon: 'pi pi-fw pi-map-marker', routerLink: ["varas"]},
    {label: 'Gabinetes', icon: 'pi pi-fw pi-briefcase', routerLink: ["gabinetes"]},
    {label: 'Lotações', icon: 'pi pi-fw pi-map', routerLink: ["lotacoes"]},
  ];

  itemsCollapse: MenuItem[] = [
    {label: 'Pessoas', icon: 'pi pi-fw pi-user', routerLink: ["pessoas"]},
    {label: 'Setores', icon: 'pi pi-fw pi-building', routerLink: ["setores"]},
    {label: 'Varas', icon: 'pi pi-fw pi-map-marker', routerLink: ["varas"]},
    {label: 'Gabinetes', icon: 'pi pi-fw pi-briefcase', routerLink: ["gabinetes"]},
    {label: 'Lotações', icon: 'pi pi-fw pi-map', routerLink: ["lotacoes"]},
    {label: 'Sair', icon: 'pi pi-sign-out',  command: e => this.logoutDialog()},
  ];

  activeItem: MenuItem;
  display: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  constructor(public router: Router) {
    this.activeItem = this.items[0];
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.checkIfLogged()
  }

  checkIfLogged() {
    let auth = localStorage.getItem('token') || '{}';
    if(auth === '{}') {
      this.router.navigate(["login"]);
    }
  }

  async setActive(item: any) {
    this.activeItem = item;
    this.checkIfLogged()
    await this.router.navigate(item.routerLink);
  }

  hideDialog() {
    this.display = false;
  }

  async logoutDialog() {
    this.display = true;
  }

  async loginScreen() {
    this.router.navigate(["login"]);
    localStorage.setItem('token', '{}');
    this.display = false;
  }
}

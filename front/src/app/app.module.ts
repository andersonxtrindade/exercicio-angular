import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PessoasComponent } from './pages/pessoas/pessoas.component';
import { SetoresComponent } from './pages/setores/setores.component';
import { VarasComponent } from './pages/varas/varas.component';
import { GabinetesComponent } from './pages/gabinetes/gabinetes.component';
import { LotacoesComponent } from './pages/lotacoes/lotacoes.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { SearchboxComponent } from './shared/searchbox/searchbox.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TieredMenuModule } from 'primeng/tieredmenu';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PessoasComponent,
    SetoresComponent,
    VarasComponent,
    GabinetesComponent,
    LotacoesComponent,
    SidebarComponent,
    SearchboxComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TabMenuModule,
    TableModule,
    SidebarModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    FileUploadModule,
    ToolbarModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    PasswordModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TieredMenuModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}

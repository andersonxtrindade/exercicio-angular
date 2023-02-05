import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotacoesComponent } from './lotacoes.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SearchboxComponent} from "../../shared/searchbox/searchbox.component";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";

describe('LotacoesComponent', () => {
  let component: LotacoesComponent;
  let fixture: ComponentFixture<LotacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        TableModule,
        InputTextModule,
        FormsModule
      ],
      declarations: [ LotacoesComponent, SearchboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LotacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

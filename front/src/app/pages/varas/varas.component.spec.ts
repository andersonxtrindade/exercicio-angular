import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarasComponent } from './varas.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SearchboxComponent} from "../../shared/searchbox/searchbox.component";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";

describe('VarasComponent', () => {
  let component: VarasComponent;
  let fixture: ComponentFixture<VarasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        TableModule,
        InputTextModule,
        FormsModule
      ],
      declarations: [ VarasComponent, SearchboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VarasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

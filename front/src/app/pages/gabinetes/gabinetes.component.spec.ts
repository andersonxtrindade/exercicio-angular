import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GabinetesComponent } from './gabinetes.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SearchboxComponent} from "../../shared/searchbox/searchbox.component";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";

describe('GabinetesComponent', () => {
  let component: GabinetesComponent;
  let fixture: ComponentFixture<GabinetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        TableModule,
        InputTextModule,
        FormsModule
      ],
      declarations: [ GabinetesComponent, SearchboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GabinetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

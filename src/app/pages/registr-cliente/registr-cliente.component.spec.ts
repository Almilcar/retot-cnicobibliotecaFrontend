import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrClienteComponent } from './registr-cliente.component';

describe('RegistrClienteComponent', () => {
  let component: RegistrClienteComponent;
  let fixture: ComponentFixture<RegistrClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

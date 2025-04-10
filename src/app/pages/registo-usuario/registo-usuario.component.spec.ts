import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoUsuarioComponent } from './registo-usuario.component';

describe('RegistoUsuarioComponent', () => {
  let component: RegistoUsuarioComponent;
  let fixture: ComponentFixture<RegistoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

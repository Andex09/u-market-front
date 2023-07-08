import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDetallePedidoComponent } from './detalle-detalle-pedido.component';

describe('DetalleDetallePedidoComponent', () => {
  let component: DetalleDetallePedidoComponent;
  let fixture: ComponentFixture<DetalleDetallePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleDetallePedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

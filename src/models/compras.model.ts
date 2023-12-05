export type Compras = {
  id: number;
  fecha: string;
  total_neto: number;
  iva: number;
  total: number;
  Proveedor_id: number;
  Usuario_id: number;
};

export type compraCreate = Omit<Compras, 'id'>;

export type compraUpdate = Compras;

export type comrpaDelete = Compras;

//--------------------------------------------//
//------  -------------------------------------//

export type DetalleCompras = {
  cantidad: number;
  valor_neto: number;
  total_neto: number;
  Compras_id: number;
  Productos_id: number;
};

export type detalleCompraCreate = DetalleCompras;

export type detalleCompraUpdate = DetalleCompras;

export type detalleCompraDetele = DetalleCompras;

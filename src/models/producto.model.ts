
export type Producto = {
  id: number;
  descripcion: string | null;
  peso_gramos: number | null;
  precio_neto: number | null;
  stock: number | null;
  cod_barras: string | null;
  Categorias_id: number;
}

export type ProductoInsert = Omit<Producto,'id'>

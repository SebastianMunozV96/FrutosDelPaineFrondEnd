export type Producto = {
  id: number;
  descripcion: string;
  peso_gramos: number;
  precio_neto: number;
  stock: number;
  cod_barras: string;
  Categorias_id: number;
};

export type ProductoWithoutCategorias = Omit<Producto, 'Categorias_id'>;

export type CrearProducto = Omit<Producto, 'id'>;

export type ProductoDelete = Producto;

export type ProductoUpdate = Producto;

//----------Categoria de productos----------//

export type Categoria = {
  id: number;
  categoria: string;
};

export type CreateCategoria = Omit<Categoria, 'id'>;

export type CategoriaDelete = Categoria;

export type CategoriaUpdate = Categoria;

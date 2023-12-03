import { api } from 'src/boot/axios';
import {
  Categoria,
  CrearProducto,
  Producto,
  ProductoUpdate,
} from 'src/models/producto.model';

export const getProductos = async () => {
  const productos = await api.get<Producto[]>('/productos');
  return productos.data;
};

export const EditCol = async (id: number, dato: ProductoUpdate) => {
  const producto = await api.put<Producto>(`/productos/${id}`, dato);
  return producto.data;
};

export const EliminarCol = async (id: number) => {
  const producto = await api.delete<Producto>(`/productos/${id}`);
  return producto.data;
};

export const CreateProducto = async (producto: CrearProducto) => {
  const productoCreate = await api.post<CrearProducto>('/productos', producto);
  return productoCreate.data;
};

export const getCategorias = async () => {
  const categorias = await api.get<Categoria[]>('/categorias');
  return categorias.data;
};

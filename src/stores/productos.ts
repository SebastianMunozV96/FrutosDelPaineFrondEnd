import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import {
  Producto,
  CrearProducto,
  ProductoUpdate,
  ProductoWithoutCategorias,
} from 'src/models/producto.model';

export const useProductosStore = defineStore('productos', () => {
  //state
  const productos = ref<Producto[]>([]);

  // getters
  const countProducts = computed(() => productos.value.length);

  // actions
  async function getProductos() {
    const { data } = await api.get<Producto[]>('/productos');
    productos.value = data;
  }

  async function crearProducto(
    producto: CrearProducto
  ): Promise<{ id: number; descripcion: string }> {
    const result = await api.post<{ id: number; descripcion: string }>(
      '/productos',
      producto
    );
    if (!result.data) console.log('crearProducto error: ', result.status);
    getProductos();
    return result.data;
  }

  async function updateProducto(
    id: number,
    producto: ProductoUpdate
  ): Promise<ProductoWithoutCategorias> {
    const result = await api.put<ProductoWithoutCategorias>(
      `/productos/${id}`,
      producto
    );
    if (!result.data) console.log('updateProducto Error: ', result);
    getProductos();
    return result.data;
  }

  async function deleteProducto(idProducto: number): Promise<{ id: number }> {
    const result = await api.delete<{ id: number }>(`/productos/${idProducto}`);
    if (!result.data) console.log('deleteProducto error: ', result);
    return result.data;
  }

  return {
    productos,
    countProducts,
    getProductos,
    crearProducto,
    updateProducto,
    deleteProducto,
  };
});

import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import {
  CrearProducto,
  ProductoUpdate,
  ProductoWithoutCategorias,
  ProductoWIthCategoria,
} from 'src/models/producto.model';

export const useProductosStore = defineStore('productos', () => {
  //state
  const productos = ref<ProductoWIthCategoria[]>([]);
  const categoriasLabelValue = ref<{ label: string, value: number }[]>([])

  // getters
  const countProducts = computed(() => productos.value.length);

  // actions
  async function getProductos() {
    const { data } = await api.get<ProductoWIthCategoria[]>('/productos');
    productos.value = data.map((prod) => ({ ...prod, cantidad: 1 }));
  }

  async function getProductosPedidos() {
    const result = await await api.get<ProductoWIthCategoria[]>('/productos');
    const prodPedidos = result.data.map((prod) => ({ ...prod, cantidad: 0 }))
    return prodPedidos
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

  async function getCategoriasLabelValue() {
    const result = await api.get<{ label: string, value: number }[]>('/categorias');
    if (!result.data) console.log('getCategoriasLabelValue error: ', result);
    return result.data
  }

  async function createCategoria(categoria: string) {
    const result = await api.post('/categorias', {
      categoria
    })
    if (!result.data) console.log('createCategoria error: ', result);
    categoriasLabelValue.value = await getCategoriasLabelValue()
    return result.data
  }

  return {
    productos,
    categoriasLabelValue,
    countProducts,
    getProductos,
    crearProducto,
    updateProducto,
    deleteProducto,
    getCategoriasLabelValue,
    getProductosPedidos,
    createCategoria
  };
});

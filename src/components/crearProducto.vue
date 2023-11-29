<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-center text-h5 q-pb-md" >
          
          Crear un nuevo Producto
        </div>
        <q-form @submi="procesarFormulario">

          <q-input
          class="q-pb-md"
          v-model="descripcion"
          label="Ingrese una descripcion"
          rule=""

          />
          <q-input
          v-model="peso_gramos"
          label="Ingrese peso en gramos"
          />

          <q-input
          v-model="precio_neto"
          label="Ingrese precio"
          />

          <q-input

          v-model="stock"
          label="Ingrese stock"
          />

          <q-input
          v-model="cod_barra"
          label="Ingrese su Codigo de barra"
          />
          <q-input
          type="number"
          v-model="Categoria_id"
          label="Ingrese la categoria"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="secondary" type="submit" label="crear" @click="procesarFormulario" />
        <q-btn color="negative" label="Cancel" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>



<script setup lang="ts">
import { ref, toRefs,defineEmits } from 'vue';
import {api} from 'src/boot/axios';
import {Producto, ProductoInsert} from '../models/producto.model'
import { response } from 'express';

const props = defineProps<{ dialogVisible: boolean }>();
const { dialogVisible } = toRefs(props);
const emits = defineEmits(['update:dialogVisible']);

const showDialog = ref<boolean>(false);

const descripcion =ref<string>();
const peso_gramos = ref<string>();
const precio_neto = ref<string>();
const stock = ref <string>();
const cod_barra = ref <string>();
const Categoria_id = ref <string>();

const procesarFormulario = () => {
  const productoForm = {
    descripcion:'',
    peso_gramos:'',
    precio_neto:'',
    stock: '',
    cod_barra:'',
    Categoria_id:'',

  }

}

const insertProducto = (producto : ProductoInsert)=>{
 api
    .post('/productos',producto)
    .then((response)=>console.log('respuesta del servidor post',response))
    .catch((error)=> console.log('error en la respuesta del servidor',error));

}


const closeDialog = () => {
  emits('update:dialogVisible',false)
};



</script>

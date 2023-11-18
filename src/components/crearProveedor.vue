<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-center text-h5 q-pb-md" >
          Crear un nuevo Proveedor
        </div>
        <q-form @submi="procesarFormulario">

          <q-input
          class="q-pb-md"
          v-model="rut"
          label="Ingrese rut"
          rule=""

          />
          <q-input
          v-model="giro"
          label="Ingrese giro"
          />

          <q-input
          v-model="nombre"
          label="Ingrese Nombre"
          />

          <q-input
          type="number"
          v-model="telefono"
          label="Ingrese telefono"
          />

          <q-input
          type="email"
          v-model="correo"
          label="Ingrese su Correo"
          />
          <q-input
          v-model="pagina_web"
          label="Ingrese la pagina web "
          />


          <q-input
          type="number"
          v-model="Direcciones_id"
          label="Ingrese direccion"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="secondary" type="submit" label="crear" />
        <q-btn color="negative" label="Cancel" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>



<script setup lang="ts">
import { response } from 'express';
import { emitKeypressEvents } from 'readline';
import {api} from 'src/boot/axios';
import { Proveedor,insertProveedor} from 'src/models/proveedor.model';
import {ref,toRefs,defineEmits} from 'vue';

const props = defineProps<{ dialogVisible: boolean }>();
const { dialogVisible } = toRefs(props);
const emits = defineEmits(['update:dialogVisible']);

const showDialog = ref<boolean>(false);

const rut = ref<number>();
const giro = ref<number>();
const nombre = ref<string>();
const telefono=ref<number>();
const correo =ref<string>();
const pagina_web=ref<string>();
const Direcciones_id=ref<number>();

const procesarFormulario = () => {

  const proveedorForm = {
    rut:null,
    giro:null,
    nombre:null,
    telefono:null,
    correo:null,
    pagina_web:null,
    Direcciones_id:0,
  };
 ProveedorInsert(proveedorForm)

};

const ProveedorInsert = (proveedor : insertProveedor)=>{
  api
   .post('/proveedores', proveedor)
   .then((response)=> console.log('respuesta del servidor post',response))
   .catch((error)=> console.log('error en respuesta del servidor',error));

};

const closeDialog = ()=> {
  emits('update:dialogVisible',false);
};



</script>

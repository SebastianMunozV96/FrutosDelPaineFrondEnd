import { defineStore } from 'pinia';
import { ref } from 'vue';

// copia y cambia el nombre al store tanto use[Template]Store y 'template'
export const useTemplateStore = defineStore('template', () => {
  const counter = ref()



  function increment() {
    counter.value++
  }

  return {
    counter, increment
  }
});

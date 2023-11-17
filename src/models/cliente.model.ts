
export type Cliente = {
  id: number;
  rut: string | null;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  direccion_id: number | null;
}

export type ClienteInsert = Omit<Cliente, 'id'>

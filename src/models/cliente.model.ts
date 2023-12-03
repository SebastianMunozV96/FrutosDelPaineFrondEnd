export type Cliente = {
  id: number;
  rut: string | null;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  direccion_id: number;
};

export type ClienteInsert = Omit<Cliente, 'id'>;

export type ClienteDelete = Cliente;

export type ClienteUpdate = Cliente;

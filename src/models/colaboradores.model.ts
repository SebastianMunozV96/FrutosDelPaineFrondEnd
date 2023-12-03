export type Colaborador = {
  id: number;
  nombre: string | null;
  apellido: string | null;
  correo: string | null;
  celular: string | null;
  direccion_id: number;
};

export type ColaboradorInsert = Omit<Colaborador, 'id'>;

export type ColaboradorUpdate = Colaborador;

export type ColaboradorDelete = Colaborador;

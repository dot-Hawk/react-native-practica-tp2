export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
};

export const CATEGORIAS: Categoria[] = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

export const ETIQUETAS_CATEGORIA: Record<Categoria, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  bebidas: 'Bebidas',
  kiosco: 'Kiosco',
};

export const PLATOS: Plato[] = [
  { id: 1, nombre: 'Café con leche y medialunas', precio: 2800, descripcion: 'Café con leche caliente acompañado de dos medialunas de manteca.', categoria: 'desayuno' },
  { id: 2, nombre: 'Tostado de jamón y queso', precio: 3200, descripcion: 'Sándwich tostado en pan de miga con jamón cocido y queso.', categoria: 'desayuno' },
  { id: 3, nombre: 'Mate cocido con bizcochos', precio: 1800, descripcion: 'Mate cocido caliente con una porción de bizcochos de grasa.', categoria: 'desayuno' },
  { id: 4, nombre: 'Milanesa con puré', precio: 6500, descripcion: 'Milanesa de carne al horno con puré de papas casero.', categoria: 'almuerzo' },
  { id: 5, nombre: 'Fideos con tuco', precio: 5200, descripcion: 'Fideos caseros con salsa de tomate y carne picada.', categoria: 'almuerzo' },
  { id: 6, nombre: 'Pollo al horno con arroz', precio: 6200, descripcion: 'Pata y muslo de pollo al horno con arroz blanco.', categoria: 'almuerzo' },
  { id: 7, nombre: 'Tarta de verdura', precio: 4800, descripcion: 'Porción de tarta de acelga y queso con ensalada fresca.', categoria: 'almuerzo' },
  { id: 8, nombre: 'Agua mineral', precio: 1200, descripcion: 'Botella de agua mineral sin gas de 500 ml.', categoria: 'bebidas' },
  { id: 9, nombre: 'Jugo de naranja', precio: 1900, descripcion: 'Jugo de naranja exprimido en el momento.', categoria: 'bebidas' },
  { id: 10, nombre: 'Gaseosa cola', precio: 1700, descripcion: 'Vaso grande de gaseosa cola con hielo.', categoria: 'bebidas' },
  { id: 11, nombre: 'Alfajor de maicena', precio: 1100, descripcion: 'Alfajor artesanal relleno con dulce de leche y coco rallado.', categoria: 'kiosco' },
  { id: 12, nombre: 'Chipá', precio: 900, descripcion: 'Chipá recién horneado, hecho con almidón y queso.', categoria: 'kiosco' },
  { id: 13, nombre: 'Paquete de galletitas', precio: 1300, descripcion: 'Paquete de galletitas dulces surtidas.', categoria: 'kiosco' },
];

export function esCategoriaValida(valor: string | undefined): valor is Categoria {
  return CATEGORIAS.some((categoria) => categoria === valor);
}

export function buscarPlatoPorId(idTexto: string | undefined): Plato | undefined {
  if (idTexto === undefined || !/^\d+$/.test(idTexto)) return undefined;
  const id = Number(idTexto);
  return PLATOS.find((plato) => plato.id === id);
}

export function platosDeCategoria(categoria: Categoria): Plato[] {
  return PLATOS.filter((plato) => plato.categoria === categoria);
}

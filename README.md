# Comedor IPF

App de pedidos de comida del Instituto, hecha con Expo Router (SDK 57) y TypeScript. Los alumnos piden desde el celular y la cocina atiende los pedidos en orden de llegada.

## Cómo ejecutarla

```bash
npm install
npx expo start
```

Credenciales de cocina (fijas en `src/data/credencialesCocina.ts`): usuario `cocina`, clave `ipf2026`.

## Árbol de carpetas de `src/app`

```
src/app
├── _layout.tsx                  Stack raíz + providers (GestureHandlerRootView, ProveedorComedor)
├── +not-found.tsx               404 que muestra la URL inexistente
├── (tabs)
│   ├── _layout.tsx              Tabs (expo-router/js-tabs): Inicio, Menú, Carrito
│   ├── index.tsx                /
│   ├── menu
│   │   ├── _layout.tsx          Stack propio de la tab Menú
│   │   ├── index.tsx            /menu
│   │   └── [id].tsx             /menu/[id]
│   └── carrito
│       ├── _layout.tsx          Stack propio de la tab Carrito
│       ├── index.tsx            /carrito
│       └── nota.tsx             /carrito/nota (formSheet)
├── categorias
│   └── [categoria].tsx          /categorias/[categoria]
├── buscar.tsx                   /buscar?q=&categoria=
├── confirmar.tsx                /confirmar (modal)
├── turno
│   └── [numero].tsx             /turno/[numero]
├── login.tsx                    /login (modal, solo sin sesión)
├── (cocina)
│   ├── _layout.tsx              Drawer (expo-router/drawer), solo con sesión
│   └── cocina
│       ├── index.tsx            /cocina
│       └── atendidos.tsx        /cocina/atendidos
├── ayuda
│   ├── index.tsx                /ayuda
│   └── [...slug].tsx            /ayuda/pagos/efectivo, /ayuda/...
└── pedido.tsx                   /pedido (Redirect a /carrito)
```

Otras carpetas: `src/components` (componentes), `src/data` (platos, artículos de ayuda, credenciales), `src/estructuras` (`Pila` y `Cola`), `src/context` (estado global), `src/estilos` (tema) y `src/utilidades`.

## Navegador de cada `_layout`

| Archivo | Navegador | Detalle |
|---|---|---|
| `src/app/_layout.tsx` | Stack raíz | `(tabs)` sin header, `confirmar` como modal, `login` modal dentro de `Stack.Protected` con `!conSesion`, `(cocina)` dentro de `Stack.Protected` con `conSesion`. `anchor: "(tabs)"` |
| `src/app/(tabs)/_layout.tsx` | Tabs | Inicio, Menú y Carrito (con badge de cantidad de ítems) |
| `src/app/(tabs)/menu/_layout.tsx` | Stack | Lista de platos y detalle, con la barra de pestañas visible |
| `src/app/(tabs)/carrito/_layout.tsx` | Stack | Carrito y nota (hoja inferior `formSheet`) |
| `src/app/(cocina)/_layout.tsx` | Drawer | Pedidos en espera y pedidos atendidos |

## Pila y Cola

- `Cola` (`src/estructuras/Cola.ts`): campos privados `#items` y `#frenteIndex`, sin `shift()`. Guarda los pedidos en espera: al confirmar se `encolar`, la cocina `desencolar`.
- `Pila` (`src/estructuras/Pila.ts`): campo privado `#items`. Se usa para "Deshacer último" (cada plato agregado hace `push`, deshacer hace `pop`) y para el historial de pedidos atendidos (se muestra del tope a la base).

## Justificación: `replace` vs `push` en la confirmación

Al confirmar el pedido se usa `router.replace` hacia `/turno/[numero]`. Con `push`, la pantalla `/confirmar` quedaría debajo en la pila y al tocar "atrás" el usuario volvería al resumen de un pedido que ya fue enviado, pudiendo confirmarlo otra vez y duplicar el pedido. Con `replace`, `/confirmar` sale de la pila y "atrás" vuelve a la pantalla anterior al modal.

## Uso de `<Link>` y `router`

- `<Link>`: cuando el usuario toca un elemento que lleva a otra pantalla (tarjetas, enlaces del menú, "Ir al carrito", artículos de ayuda).
- `router`: cuando se navega después de una lógica (`router.replace` al confirmar, `router.setParams` en el buscador, `router.back` al cerrar la nota).

## Pantallas y funcionalidades

- Inicio con saludo y accesos rápidos.
- Menú agrupado por categoría y detalle de cada plato con validación del `id`.
- Categorías con validación del parámetro.
- Buscador por texto y categoría; la búsqueda vive en la URL y se actualiza con `router.setParams`.
- Carrito con total, nota para la cocina, "Deshacer último" y "Confirmar pedido".
- Turno con pedidos por delante y espera estimada (3 minutos por pedido).
- Login de cocina y Drawer con pedidos en espera y atendidos; al cerrar sesión la sección desaparece del historial.
- Ayuda con rutas de profundidad variable.
- `/pedido` redirige a `/carrito`; cualquier otra URL muestra el 404.
- Componente `DondeEstoy` al final de cada pantalla (se oculta con la constante `DEBUG`).
- Desafíos opcionales: contador de pila en el título del header, hoja inferior para la nota del carrito y tiempo estimado en el turno.

## Deep link de prueba

Con la app corriendo en Expo Go, abrir directamente el plato 7:

```
exp://<IP>:8081/--/menu/7
```

Por ejemplo, con la IP `192.168.1.20`: `exp://192.168.1.20:8081/--/menu/7`. En una build propia: `comedoripf://menu/7`.

## Capturas / video

Agregar acá las capturas (o el video corto) de: carrito con deshacer, turno, cocina atendiendo pedidos, login/logout y pantalla 404.

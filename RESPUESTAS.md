### A.1 CONCEPTOS

## a)
# LIFO --> Last In, First Out. 
Significa que el último elemento que entra es el primero que sale. Solo se trabaja por un extremo, llamado tope.
- push(x) : apila un elemento en el tope.
- pop() : saca y devuelve el del tope.
- tope() : mira el de arriba sin sacarlo (también peek).
- vacia : indica si no queda nada.

Este concepto corresponde a la PILA.

# FIFO --> First In, First Out
Significa que el primero que llega es el primero que sale. Se agrega por el final y se saca por el frente.
- encolar(x) : agrega al final (enqueue).
- desencola() : saca el del frente (dequeue).
- frente() : mira quién sigue sin sacarlo.

Este concepto corresponde a la COLA.

## c)
# FIFO (First In, First Out)

# Ejemplo de la vida real:
Una fila en el supermercado o en un banco. La primera persona que llega es la primera que es atendida y sale de la fila. Nadie "se salta" el orden.

# Ejemplo de aplicación móvil:
Una app de mensajería como WhatsApp mostrando notificaciones o mensajes en un chat: los mensajes se muestran en el orden en que llegaron, el primero que se envió es el primero que se ve arriba (o el primero en procesarse en la cola de entrega).

# LIFO (Last In, First Out)

# Ejemplo de la vida real:
Una pila de platos apilados uno sobre otro. Cuando necesitas usar uno, tomas el que está arriba, que es el último que se colocó. Para llegar al de abajo (el primero que se puso), tendrías que sacar todos los demás.

# Ejemplo de aplicación móvil:
El botón de "atrás" (back) del navegador o de una app: la última pantalla que visitaste es la primera que se muestra al retroceder. Cada pantalla nueva se "apila" encima, y al volver se van sacando en orden inverso al que se agregaron (esto se implementa justamente con una pila/stack en el historial de navegación).


### A2. Seguimiento de una pila

```js
const p = new Pila();
p.push('Inicio');       // [Inicio]
p.push('Productos');    // [Inicio, Productos]
p.push('Detalle 3');    // [Inicio, Productos, Detalle 3]
p.pop();                 // sale 'Detalle 3' -> [Inicio, Productos]
p.push('Perfil');        // [Inicio, Productos, Perfil]
```

| Línea | Imprime |
|---|---|
| `console.log(p.tope())` (1) | `'Perfil'` |
| `console.log(p.pop())` (2) | `'Perfil'` (y la saca de la pila) |
| `console.log(p.tope())` (3) | `'Productos'` |
| `console.log(p.vacia)` (4) | `false` |

**Pila final (de base a tope):** `[Inicio, Productos]`

---

### A3. Seguimiento de una cola

```js
const c = new Cola();
c.encolar('Ana');     // [Ana]
c.encolar('Beto');    // [Ana, Beto]
c.desencolar();        // sale 'Ana' -> [Beto]
c.encolar('Caro');     // [Beto, Caro]
c.encolar('Dani');     // [Beto, Caro, Dani]
```

| Línea | Imprime |
|---|---|
| `console.log(c.frente())` (1) | `'Beto'` |
| `console.log(c.desencolar())` (2) | `'Beto'` (y la saca de la cola) |
| `console.log(c.vacia)` (3) | `false` |

**Cola final (de frente a final):** `[Caro, Dani]`

---

### A4. Análisis de la implementación

**a) ¿Qué significa el `#` en `#items` y qué problema evita?**

El `#` declara un **campo privado** de la clase (característica nativa de JS). Solo puede leerse/escribirse desde dentro de la propia clase. Evita que código externo acceda o modifique el array directamente (por ejemplo `p.items.push(...)` sin pasar por `push()`), lo que rompería el encapsulamiento y podría dejar la pila/cola en un estado inconsistente.

**b) `array.shift()` para desencolar: ¿qué problema de rendimiento tiene y cómo lo resuelven las colas "serias"?**

`shift()` elimina el primer elemento y **reindexa todos los elementos restantes** (cada uno se desplaza una posición). Esto es una operación **O(n)**: con colas muy grandes, cada `desencolar()` se vuelve cada vez más costoso.

Las implementaciones eficientes ("serias") resuelven esto guardando un **índice de frente** (puntero) en lugar de mover físicamente los elementos, o usando una lista enlazada / buffer circular. Así, desencolar es **O(1)**: solo se avanza el índice, sin reordenar nada.

**c) ¿Qué método de array usa la pila y cuál usa la cola? ¿Por qué no pueden usar el mismo?**

- La **pila** usa `pop()` (y `push()`): opera sobre el **final** del array.
- La **cola** usa `shift()` (para sacar) y `push()` (para encolar): opera sobre el **principio** del array.

No pueden usar el mismo método porque tienen semánticas opuestas: la pila es **LIFO** (el último en entrar es el primero en salir → conviene operar sobre el final, que es O(1)), mientras que la cola es **FIFO** (el primero en entrar es el primero en salir → necesita sacar del principio).

---

### A5. Programación: una cola eficiente

```js
class ColaEficiente {
  #items = [];
  #frenteIndex = 0;

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    const valor = this.#items[this.#frenteIndex];
    this.#items[this.#frenteIndex] = undefined; // liberar la referencia
    this.#frenteIndex++;

    // Compactamos cuando ya no queda nada "vivo" para no crecer indefinidamente
    if (this.#frenteIndex === this.#items.length) {
      this.#items = [];
      this.#frenteIndex = 0;
    }
    return valor;
  }

  frente() {
    return this.vacia ? undefined : this.#items[this.#frenteIndex];
  }

  get vacia() {
    return this.#frenteIndex >= this.#items.length;
  }

  get tamanio() {
    return this.#items.length - this.#frenteIndex;
  }
}
```

La clave: en vez de `shift()`, se mantiene un **puntero al frente** (`#frenteIndex`) que avanza en cada `desencolar()`. Todas las operaciones quedan en **O(1)** (amortizado, gracias a la compactación ocasional).

---

### A6. Pila y cola dentro de Expo Router

**a) Historial de pantallas de un Stack**

El historial de pantallas de un `Stack` se describe con una **pila (Stack)**. La pantalla visible es la que está en el **tope** de la pila (la última apilada). La operación "atrás" hace un **pop**: saca la pantalla del tope y vuelve a mostrar la que quedó debajo.

**b) Acciones de navegación**

Expo Router usa una **cola** para las acciones de navegación: los eventos (`push`, `replace`, etc.) se encolan y se procesan en orden **FIFO**, garantizando que se ejecuten en el orden en que ocurrieron.

Si el usuario toca dos links muy rápido, ambas acciones quedan encoladas y se procesan una después de la otra (no se pierden ni se pisan entre sí). El resultado final en la pila depende del método usado en cada una (por ejemplo, dos `push` apilan dos pantallas; un `push` seguido de un `replace` deja solo la última).

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL que genera / función |
|---|---|
| `src/app/(tabs)/index.tsx` | `/` — el grupo `(tabs)` no aparece en la URL; `index` es la ruta raíz de ese grupo |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/:id` (ruta dinámica, ej. `/productos/5`) |
| `src/app/docs/[...slug].tsx` | `/docs/*` — ruta *catch-all*, captura cualquier cantidad de segmentos después de `/docs/` (ej. `/docs/a/b/c`) |
| `src/app/_layout.tsx` | No genera pantalla/URL propia. Define el **layout** (Stack/Tabs, providers, configuración) que envuelve a las rutas de esa carpeta |
| `src/app/+not-found.tsx` | No tiene una URL fija propia; se muestra automáticamente como pantalla **404** cuando se navega a una ruta que no existe |
| `src/app/Boton.tsx` | **Problema:** al no llevar prefijo especial (`_` o `+`) ni estar entre paréntesis/corchetes, Expo Router lo trata igual como una pantalla real en `/Boton`, aunque probablemente la intención era que fuera solo un componente reutilizable (un botón), no una pantalla. Solución: moverlo fuera de `app/` (a `components/`) |

---

### B2. De la URL al archivo

| URL | Archivo (dentro de `src/app`) |
|---|---|
| `/categorias/bebidas` (y cualquier otra categoría) | `categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `buscar.tsx` — los query params no forman parte del archivo, se leen en runtime (no cambian la estructura de rutas) |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `ayuda/pagos/tarjeta.tsx` y `ayuda/horarios.tsx` |
| `/ayuda` (con pantalla propia) | `ayuda/index.tsx` |

---

### B3. Verdadero o falso

| # | Afirmación | V/F | Justificación (si es falsa) |
|---|---|---|---|
| a | Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuración | **F** | No hace falta registrar nada: el archivo *es* la ruta (file-based routing, convención sobre configuración) |
| b | Los archivos `_layout.tsx` son pantallas que el usuario puede visitar | **F** | `_layout.tsx` no genera pantalla ni URL propia; solo define el layout/configuración compartida de las rutas dentro de esa carpeta |
| c | Una carpeta entre paréntesis, como `(tabs)`, no aparece en la URL | **V** | — |
| d | Para agregar una librería conviene usar `npm install`, porque siempre trae la última versión | **F** | Conviene usar `npx expo install <lib>`, que instala la versión **compatible con el SDK de Expo** en uso; la "última versión" de npm puede romper compatibilidad |
| e | En `package.json`, `"main": "expo-router/entry"` reemplaza al viejo `App.tsx` | **V** | — (Expo Router usa `expo-router/entry` como punto de entrada en lugar del `App.tsx` tradicional) |
| f | La ruta `/_sitemap` lista todas las rutas de la app y sirve para depurar | **V** | — |
| g | Si existen `docs/index.tsx` y `docs/[...slug].tsx`, la URL `/docs` muestra `docs/index.tsx` | **V** | Las coincidencias exactas (`index`) tienen prioridad sobre la ruta *catch-all*; esta última solo entra en juego para `/docs/algo`, `/docs/a/b`, etc. |
| h | En SDK 57, `expo-router` usa el mismo número de versión mayor que el SDK (57) | **F** | `expo-router` tiene su **propio versionado**, independiente del número de SDK; cada paquete del ecosistema Expo se versiona por separado, aunque `expo install` se encarga de fijar versiones compatibles entre sí |

---

## Parte C · Navegar: `<Link>`, router y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila |
|---|---|
| `router.push(href)` | **Apila** una nueva pantalla encima de la actual |
| `router.navigate(href)` | Si la pantalla ya existe en la pila, navega hacia ella sin duplicarla; si no existe, la apila (como `push`) |
| `router.replace(href)` | **Reemplaza** la pantalla del tope por la nueva; el tamaño de la pila no cambia (no se puede volver a la reemplazada) |
| `router.back()` | Saca (**pop**) la pantalla del tope y muestra la que quedó debajo |
| `router.dismissTo(href)` | Saca todas las pantallas del tope hasta llegar a la indicada (si ya existe en la pila), recortándola |
| `router.dismissAll()` | Vacía la pila hasta dejar solo la pantalla raíz |
| `router.canGoBack()` | **No modifica** la pila; solo consulta si hay más de una pantalla (si se puede volver atrás) |
| `router.setParams({...})` | **No modifica** la pila; solo actualiza los parámetros de la pantalla del tope |

---

### C2. Simulación de la pila

Pila inicial: `[/productos]`

| # | Instrucción | Pila resultante |
|---|---|---|
| 1 | `router.push("/productos/1")` | `[/productos, /productos/1]` |
| 2 | `router.push("/productos/2")` | `[/productos, /productos/1, /productos/2]` |
| 3 | `router.navigate("/productos/5")` | `[/productos, /productos/1, /productos/2, /productos/5]` (no existía → se apila) |
| 4 | `router.push("/perfil")` | `[/productos, /productos/1, /productos/2, /productos/5, /perfil]` |
| 5 | `router.replace("/buscar")` | `[/productos, /productos/1, /productos/2, /productos/5, /buscar]` (reemplaza `/perfil`) |
| 6 | `router.back()` | `[/productos, /productos/1, /productos/2, /productos/5]` |
| 7 | `router.dismissTo("/productos")` | `[/productos]` |
| 8 | `router.canGoBack()` → ¿qué devuelve? | `false` (solo queda una pantalla en la pila) |

---

### C3. ¿Link o router?

| Situación | `<Link>` / `router` | Método o prop | Justificación |
|---|---|---|---|
| a) El usuario toca la tarjeta de un producto en una lista | `<Link>` | `href="/productos/[id]"` | Navegación declarativa disparada directamente por un elemento visible que el usuario toca |
| b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito | `router` | `router.replace(...)` | Navegación imperativa disparada por lógica/código tras una respuesta asíncrona; `replace` evita volver al formulario ya enviado |
| c) Botón "Cancelar" dentro de un modal | `router` | `router.back()` (o `dismiss()`) | Es una acción de cierre, no una navegación a una URL declarativa |
| d) Después de un login exitoso hay que ir a la pantalla principal | `router` | `router.replace("/")` | Imperativo tras lógica async; `replace` para que no se pueda volver al login con "atrás" |
| e) Volver desde el detalle de un pedido directamente a la lista de pedidos, tres pantallas más abajo | `router` | `router.dismissTo("/pedidos")` | Permite saltar directo a una pantalla que ya está en la pila, recortando las intermedias, en vez de hacer `back()` tres veces |

---

### C4. Escribí el código

**a) `<Link>` que abre el producto con id 8, usando `href` como objeto:**

```jsx
<Link href={{ pathname: '/productos/[id]', params: { id: '8' } }}>
  Ver producto
</Link>
```

**b) `<Link>` a `/perfil` que siempre apile, aunque la pantalla ya exista:**

```jsx
<Link href="/perfil" push>
  Ir a mi perfil
</Link>
```

**c) Botón (`Pressable`) propio que funcione como link a `/carrito`, usando `asChild`:**

```jsx
<Link href="/carrito" asChild>
  <Pressable>
    <Text>Ir al carrito</Text>
  </Pressable>
</Link>
```

---

### C5. Pensar

En una web, cada `<Link>` se convierte en un `<a href>` real. Esto trae ventajas concretas del navegador: se puede ver la URL de destino al pasar el mouse por encima, abrir el link en una pestaña nueva, copiarlo, usar "abrir en nueva pestaña" con el botón derecho, que los buscadores lo indexen (SEO), y que funcione la navegación nativa (adelante/atrás, historial del navegador).

En el celular no hay barra de direcciones ni esas interacciones de mouse/click derecho, así que esa ventaja **desaparece**: ahí el `<Link>` funciona simplemente como cualquier elemento táctil que dispara la navegación, de forma equivalente a llamar al `router` directamente, sin el beneficio adicional de tratarse de un `<a href>` real.

---

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | **Stack** | **Tabs** | **Drawer** |
|---|---|---|---|
| **¿Apila pantallas?** | Sí, cada pantalla nueva se apila sobre la anterior (LIFO) | No, cada pestaña es una pantalla "paralela" independiente | No apila por sí mismo; es un panel lateral que suele contener stacks/tabs adentro |
| **¿Cómo cambia de pantalla el usuario?** | Navegando hacia adelante (push) y volviendo atrás (back/pop) | Tocando un ícono/pestaña en la barra (inferior o superior) | Deslizando desde el borde o tocando el botón de menú (☰) para abrir el panel y elegir una opción |
| **¿Desde dónde se importa en SDK 57?** | `expo-router` (`Stack`) | `expo-router/js-tabs` (`Tabs`) | `expo-router/drawer` (`Drawer`) |
| **Un caso de uso típico** | Flujo "lista → detalle → sub-detalle" (ej. lista de productos → producto → reseñas) | Secciones principales siempre accesibles (ej. Inicio, Búsqueda, Perfil) | Opciones secundarias o de configuración (ej. ajustes, cerrar sesión, cambiar de cuenta) |

---

### D2. Cada tab tiene su pila

El usuario ve la **pantalla de detalle del producto 4**. Cada pestaña mantiene su **propia pila (Stack)** independiente: al cambiar a Inicio, la pila de Productos no se destruye, queda guardada tal cual (`[Productos, Detalle 4]`). Al volver a la pestaña Productos, se retoma la pila en el estado en que se dejó.

Una app que se comporta así es **Instagram** (o YouTube, Spotify): si entrás al perfil de alguien en la pestaña Búsqueda, cambiás a Inicio y volvés a Búsqueda, seguís en ese perfil.

---

### D3. ¿Dónde va cada pantalla?

| | Pantalla | Dónde va | Justificación |
|---|---|---|---|
| a | Detalle de un producto (mantiene la barra de pestañas) | **Dentro de una tab** | Si está dentro del Stack de la tab, la barra de pestañas sigue visible |
| b | Modal para confirmar una compra (tapa la barra de pestañas) | **Stack raíz** | Al estar en el Stack raíz, se muestra por encima de todo el navegador de tabs |
| c | Login que se abre como modal | **Stack raíz** | Es una pantalla que no pertenece a ninguna sección y tiene que tapar toda la app |
| d | "Mis pedidos anteriores" dentro de Perfil | **Dentro de una tab** (la de Perfil) | Es una subpantalla de esa sección y conviene que conserve la barra de pestañas |

**Regla práctica:** lo que debe tapar las pestañas va en el Stack raíz; lo que debe mantenerlas visibles va dentro de la tab.

---

### D4. Configurar el Stack

**a) `screenOptions` vs `options` de un `Stack.Screen`**

`screenOptions` es la configuración **por defecto para todas las pantallas** del Stack. `options` de un `Stack.Screen` aplica **solo a esa pantalla** y tiene prioridad sobre `screenOptions`.

**b) ¿Por qué `(tabs)` tiene `headerShown: false`?**

Porque el navegador de tabs ya maneja sus propios headers por pestaña (y los Stack internos también). Si el Stack raíz mostrara su header encima, se vería **un header duplicado**.

**c) Pantalla `perfil-publico.tsx` no declarada en el Stack**

La pantalla **sí existe**: el archivo ya la convierte en ruta, y se muestra con las opciones por defecto. Declararla con `<Stack.Screen name="perfil-publico" options={{...}} />` sirve para **personalizar sus opciones** (título, presentación, header, etc.).

**d) Valores de `presentation`**

Algunos valores: `card` (por defecto), `modal`, `transparentModal`, `fullScreenModal`, `formSheet`.
Para una hoja inferior que se abre al 50%: `formSheet` (con `sheetAllowedDetents: [0.5]`).

**e) Cambiar el título desde la propia pantalla de detalle**

```jsx
<Stack.Screen options={{ title: 'Producto 7' }} />
```

Se renderiza dentro del componente de la pantalla de detalle (también se puede usar `navigation.setOptions({ title: 'Producto 7' })`).

---

### D5. Tabs y Drawer en SDK 57

**a) ¿Qué cambió con `Tabs`? ¿Qué alternativa experimental existe?**

Desde SDK 56, las tabs de JavaScript vienen **incluidas dentro de `expo-router`** (ya no hace falta instalar `@react-navigation/bottom-tabs` aparte), y `Tabs` ya no se importa desde `expo-router` (esa exportación quedó **deprecada**): ahora se importa desde **`expo-router/js-tabs`**. La alternativa experimental son las **tabs nativas** (`NativeTabs`), que usan la barra nativa de la plataforma, y en SDK 57 se importan desde `expo-router/unstable-native-tabs`.

**b) Paquetes del Drawer y componente para los gestos**

Necesita `react-native-gesture-handler` y `react-native-reanimated` (más `react-native-worklets`). Conviene envolver el layout raíz con **`GestureHandlerRootView`** para que los gestos funcionen.

**c) ¿Hace falta instalar `@react-navigation/drawer` en SDK 57?**

**No.** Desde SDK 56 el Drawer ya viene incluido en `expo-router` (se importa desde `expo-router/drawer`) y usa internamente `react-native-drawer-layout`.

**d) Navegadores anidados: ¿dónde actúa `router.back()`?**

Actúa en el **navegador enfocado** (el más interno, donde está la pantalla activa). Si ese navegador no puede volver atrás (queda una sola pantalla), la acción se propaga al navegador padre.

---

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

**Por qué falla:** los parámetros de la URL **siempre llegan como texto (string)**. `id` vale `"3"`, pero en los productos es el número `3`. Como `p.id === id` usa igualdad estricta, `3 === "3"` es `false` y nunca se encuentra el producto. Por la misma razón `id === 3` nunca se cumple y no se imprime `'Es el chipá'`.

**Corrección:** convertir el parámetro a número antes de comparar.

```jsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNumerico = Number(id);
  const producto = productos.find((p) => p.id === idNumerico);
  if (idNumerico === 3) console.log('Es el chipá');
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

---

### E2. Catch-all

| URL | slug |
|---|---|
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | **No coincide** con `[...slug]` (necesita al menos un segmento); se muestra `docs/index.tsx` si existe, o el 404. Solo con `[[...slug]]` (opcional) coincidiría con `slug` vacío |

---

### E3. Anatomía de una URL

Dada `rutasipf://buscar?q=mate&categoria=bebidas`:

**a)** Scheme: `rutasipf`. Ruta: `buscar`. Parámetros de búsqueda: `q=mate` y `categoria=bebidas`.

**b)** `useLocalSearchParams()` devuelve `{ q: 'mate', categoria: 'bebidas' }`.

**c)** **No** hacen falta corchetes. Los corchetes se usan para segmentos dinámicos **del path** (`/productos/[id]`). Los parámetros de búsqueda (`?q=...`) no forman parte de la ruta, llegan siempre a la pantalla sin necesidad de declararlos en el nombre del archivo.

**d)** `router.setParams({ q: texto })` en lugar de `router.push` porque:
1. **No apila pantallas nuevas**: con `push` cada letra tipeada crearía una entrada en la pila y el usuario tendría que tocar "atrás" decenas de veces.
2. **Actualiza la misma pantalla** (sin remontarla), conservando el foco del input y el estado; además la URL queda actualizada y se puede compartir.

---

### E4. ¿Dónde estoy?

| Hook | En `/productos/3` | En `/buscar?q=chipa` |
|---|---|---|
| `usePathname()` | `'/productos/3'` | `'/buscar'` |
| `useSegments()` | `['(tabs)', 'productos', '[id]']` | `['buscar']` |
| `useLocalSearchParams()` | `{ id: '3' }` | `{ q: 'chipa' }` |

---

### E5. Local vs global

**a)** `useLocalSearchParams` devuelve los parámetros de **la pantalla donde se usa** y solo se actualiza mientras esa pantalla está activa. `useGlobalSearchParams` devuelve los parámetros de **la URL actual de toda la app** y re-renderiza ante cualquier cambio de URL.

La opción por defecto es **`useLocalSearchParams`**: las pantallas debajo en la pila siguen montadas, y con la versión global se re-renderizarían (o leerían parámetros ajenos) cada vez que cambia la URL en otra pantalla.

**b)** `useFocusEffect` ejecuta un efecto cada vez que la pantalla **gana el foco** (y limpia al perderlo). Ejemplo: recargar la lista de pedidos cada vez que el usuario vuelve a esa pantalla, o suscribirse/desuscribirse a un listener mientras la pantalla está visible.

**c)** **No es un error de Expo Router.** El router solo hace coincidir el patrón `/productos/[id]` y abre la pantalla con `id = "mate"`. Validar que el parámetro corresponda a un producto existente es **responsabilidad del desarrollador** (por ejemplo, mostrando un mensaje "no existe").

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a)** `<Redirect href="/productos" />` redirige al usuario a esa ruta apenas se renderiza. Equivale a **`router.replace("/productos")`**.

**b)** Una redirección debe **reemplazar** porque, si apilara, la pantalla que redirige quedaría en la pila. Al tocar "atrás" el usuario volvería a esa pantalla, que lo redirigiría otra vez: quedaría **atrapado en un bucle** y no podría volver hacia atrás.

---

### F2. Stack.Protected

```jsx
<Stack.Protected guard={conSesion}>
  <Stack.Screen name="privado" />
</Stack.Protected>
<Stack.Protected guard={!conSesion}>
  <Stack.Screen name="login" options={{ presentation: 'modal' }} />
</Stack.Protected>
```

**a)** Cuando su `guard` es `false`, la pantalla **deja de ser accesible** (no se puede navegar a ella); además, si pasa de `true` a `false`, **se eliminan todas sus entradas del historial**.

**b)** Porque al iniciar sesión `conSesion` pasa a `true`, el `guard` de `login` pasa a `false` y esa pantalla **desaparece automáticamente del historial**; no hace falta cerrarla a mano.

**c)** Aparece cuando se navega a una ruta que **ningún navegador conoce** en ese momento (por ejemplo, a una pantalla protegida con `guard` en `false`). Se evita navegando solo hacia pantallas accesibles con el estado actual, o esperando a que el estado cambie (por ejemplo dentro de un `useEffect`) antes de navegar.

**d)** La protección queda **centralizada en un solo lugar** (el layout): no se puede olvidar en una pantalla, no hay "parpadeo" del contenido protegido y se limpia el historial automáticamente.

---

### F3. 404, anchor y rutas tipadas

**a) `+not-found.tsx`:** pantalla que se muestra cuando la URL no coincide con ninguna ruta (404). Se define en `src/app/+not-found.tsx`.

**b) `unstable_settings = { anchor: "(tabs)" }`:** indica cuál es la ruta base del navegador. Si la app se abre con un deep link a una pantalla profunda, esa ruta ancla queda **debajo en la pila**, para que "atrás" tenga a dónde volver. Se exporta desde `src/app/_layout.tsx` (layout raíz).

**c) `typedRoutes`:** `<Link href="/prodcutos" />` da un **error de TypeScript** en tiempo de desarrollo, porque la ruta no existe. Los tipos se generan automáticamente al ejecutar `npx expo start` (se activa con `"experiments": { "typedRoutes": true }` en `app.json`) y quedan en la carpeta `.expo/types`.

---

### F4. Deep links

| Dónde | URL |
|---|---|
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7` |

**¿Qué significa `/--/`?** Separa la dirección del servidor de desarrollo (`exp://IP:puerto`) de la **ruta interna de la app** (`/menu/7`).

**¿Por qué el scheme propio no funciona dentro de Expo Go?** Porque en Expo Go la app que se abre es Expo Go, no tu build: el scheme `comedoripf` solo está registrado en el binario de tu app instalada. Expo Go solo responde a `exp://`.

---

### F5. Errores comunes

| Situación | Causa | Solución |
|---|---|---|
| a) `<Link asChild>` con `<Pressable style={[...]}>` → "You are passing an array of styles to a child of `<Slot>`" | `asChild` usa un `Slot` que no admite un **array de estilos** en el hijo | Combinar los estilos en un solo objeto, con `StyleSheet.flatten([estilos.boton, activo && estilos.activo])` |
| b) `src/app/TarjetaProducto.tsx` crea una ruta nueva | Todo archivo dentro de `src/app` es una ruta | Mover el componente a `src/components/` |
| c) Tras login con `router.push("/")`, "atrás" vuelve al login | `push` apila, y el login queda debajo en la pila | Usar `router.replace("/")` (o dejar que `Stack.Protected` limpie el historial) |
| d) Expo Go dice que el proyecto es incompatible tras `npm install` | `npm install` instaló una versión que no es compatible con el SDK | Usar `npx expo install <paquete>` (o `npx expo install --fix` para corregir las versiones) |
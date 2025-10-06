# Parcial 1 - Daniel Reales

## Cómo iniciar el proyecto

1. Entrar al directorio y seguir los pasos descritos a continuación

### Prerequisitos
- API backend corriendo en `http://127.0.0.1:8080/api`

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# Abrir en el navegador
# http://localhost:3000
```

### Scripts disponibles

```bash
npm run dev         # Inicia el servidor de desarrollo con Turbopack
npm run build       # Construye la aplicación para producción
npm run start       # Inicia el servidor de producción
npm run lint        # Ejecuta ESLint
npm test            # Ejecuta las pruebas unitarias
npm run test:watch  # Ejecuta las pruebas en modo watch
```

## Arquitectura de la solución

### 1. Estructura del estado (Data Context y useData)

La aplicación utiliza **React Context API** para el manejo global del estado, implementado en `context/DataContext.tsx`.

#### Data Context
- **Propósito**: Centralizar el estado de autores y libros, y proporcionar métodos CRUD
- **Patrón**: Provider/Consumer con custom hook `useData()`
- **Estado gestionado**:
  - `authors`: Array de autores con sus libros y premios anidados
  - `books`: Array plano de libros (extraído de todos los autores)
  - `loading`: Estado de carga durante el fetch inicial
  - `error`: Mensajes de error de la API
  - `readingStats`: Estadísticas calculadas de progreso de lectura

#### Operaciones disponibles

**Autores:**
- `getAuthorById(id: number)`: Obtiene un autor por ID
- `addAuthor(author)`: Agrega un nuevo autor (local)
- `updateAuthor(id, author)`: Actualiza un autor existente (local)
- `deleteAuthor(id)`: Elimina un autor (local)
- `updateReadingProgress(authorId, progress)`: Actualiza el progreso de lectura

**Libros:**
- `getBookById(id: number)`: Obtiene un libro por ID
- `addBook(book, authorId)`: Agrega un libro a un autor (local)
- `updateBook(id, book)`: Actualiza un libro existente (local)
- `deleteBook(id)`: Elimina un libro (local)

**API:**
- `refreshAuthors()`: Refresca los datos desde el API

#### Integración con API
- **Fetch inicial**: GET `/api/authors` - Carga todos los autores con sus relaciones
- **CRUD local**: Todas las operaciones Create, Update, Delete se manejan en memoria
- **Persistencia**: Los cambios solo persisten durante la sesión (se pierden al refrescar)

#### Progreso de Lectura
- **Frontend-only**: El campo `readingProgress` (0-100) no viene del API
- **Estados**:
  - `0` = "Sin iniciar"
  - `1-99` = "En curso"
  - `100` = "Completado"
- **Estadísticas calculadas**:
  - Promedio de progreso
  - Cantidad por estado (sin iniciar, en curso, completado)

### 2. Componentes y Páginas

La aplicación utiliza el **App Router de Next.js 15** con arquitectura de páginas.

#### Páginas principales

**Libros** (`app/page.tsx`)
- Lista todos los libros en formato de tarjetas
- Muestra: imagen, nombre, autor, descripción, editorial, año, ISBN
- Acciones: Editar, Eliminar
- Botones: Agregar Nuevo Libro, Gestionar Autores

**Autores** (`app/authors/page.tsx`)
- Lista todos los autores en formato de tarjetas
- Muestra: imagen, nombre, descripción, fecha de nacimiento
- **Slider de progreso de lectura** en cada tarjeta
- **Estadísticas globales** en el header (promedio, contadores por estado)
- Acciones: Editar, Eliminar
- Botones: Agregar Nuevo Autor, Volver a Libros

**Crear Libro** (`app/books/new/page.tsx`)
- Formulario con validación Zod
- Campos: nombre, descripción, ISBN, fecha publicación, editorial, imagen, selector de autor
- Validación en tiempo real

**Editar Libro** (`app/books/[id]/edit/page.tsx`)
- Formulario pre-poblado con datos del libro
- Campo `authorId` oculto (los libros no cambian de autor al editar)
- Validación en tiempo real

**Crear Autor** (`app/authors/new/page.tsx`)
- Formulario con validación Zod
- Campos: nombre, fecha nacimiento, descripción, imagen
- Progreso de lectura inicia en 0 automáticamente

**Editar Autor** (`app/authors/[id]/edit/page.tsx`)
- Formulario pre-poblado con datos del autor
- **Slider de progreso de lectura** integrado
- Actualiza el progreso en tiempo real
- Validación en tiempo real

#### Validación de formularios

**Tecnologías:**
- `react-hook-form`: Manejo de formularios
- `zod`: Esquemas de validación
- `@hookform/resolvers`: Integración entre ambos

**Esquemas** (`lib/validation.ts`):

```typescript
// Autor
- name: string (1-100 caracteres)
- birthDate: string en formato YYYY-MM-DD (validado con regex)
- description: string (1-2000 caracteres)
- image: URL válida

// Libro
- name: string (1-200 caracteres)
- isbn: string (requerido)
- publishingDate: string en formato YYYY-MM-DD (validado con regex)
- description: string (1-1000 caracteres)
- image: URL válida
- editorialName: string (1-100 caracteres)
- authorId: string (requerido)
```

#### Tipos TypeScript

Definidos en `lib/types.ts`:

```typescript
interface Author {
  id: number;
  birthDate: string;
  name: string;
  description: string;
  image: string;
  books: Book[];
  prizes: Prize[];
  readingProgress: number; // 0-100 (frontend-only)
}

interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial: Editorial;
}

interface Editorial {
  id: number;
  name: string;
}

interface Prize {
  id: number;
  premiationDate: string;
  name: string;
  description: string;
  organization: Organization;
}

interface Organization {
  id: number;
  name: string;
  tipo: string;
}

type ReadingStatus = 'Sin iniciar' | 'En curso' | 'Completado';

interface ReadingStats {
  average: number;
  sinIniciar: number;
  enCurso: number;
  completado: number;
}
```

### 3. Rutas y Redirecciones

#### Estructura de rutas

```
/                           → Página principal (libros)
/books/new                  → Crear nuevo libro
/books/[id]/edit            → Editar libro

/authors                    → Lista de autores
/authors/new                → Crear nuevo autor
/authors/[id]/edit          → Editar autor
```

#### Navegación
- Uso de `next/link` para navegación del lado del cliente
- `useRouter()` para redirecciones programáticas después de operaciones CRUD
- Botones de "Volver" en todas las páginas de formularios

#### Flujos de redirección
- Después de crear/editar un libro → redirige a `/`
- Después de crear/editar un autor → redirige a `/authors`
- Después de eliminar → permanece en la página actual

### 4. Estilos con Tailwind CSS

La aplicación utiliza **Tailwind CSS v4** con PostCSS para todos los estilos.

#### Sistema de colores
- `gray-50`: Fondos de página (#f7f7f7)
- `gray-100-900`: Escala de grises para texto y bordes
- `red-500`: Color primario para botones y acentos
- `teal-500`: Estado "Completado" en progreso de lectura

### 5. Pruebas Unitarias

La aplicación incluye pruebas unitarias para la funcionalidad de progreso de lectura.

#### Ejecutar pruebas

```bash
npm test            # Ejecuta todas las pruebas
npm run test:watch  # Ejecuta las pruebas en modo watch
```

#### Cobertura de pruebas

**`__tests__/authors.test.tsx`** - Pruebas de progreso de lectura:
- Cambio de progreso individual: Verifica que al cambiar el slider de un autor se actualice el porcentaje y el estado textual ("Sin iniciar" → "En curso" → "Completado")
- Estadísticas de resumen: Verifica que al cambiar múltiples progresos se calculen correctamente el promedio general y los conteos por estado

## Notas importantes

1. **API requerida**: La aplicación necesita que el backend esté corriendo en `http://127.0.0.1:8080/api`
2. **Datos temporales**: Los cambios CRUD se pierden al refrescar la página
3. **Progreso de lectura**: Es una característica frontend-only, no se persiste en el API
4. **Navegación**: Usa el App Router de Next.js, todas las páginas son Server Components excepto las marcadas con 'use client'

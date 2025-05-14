# Países Angular Application

This application is a migration from a Windows Forms application to Angular 18.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI (`npm install -g @angular/cli`)

## Dependencies

This application uses the following key dependencies:

- Angular 18
- Angular Material
- RxJS

## Project Structure

```
paises/
├── components/
│   ├── paises-list/
│   │   ├── paises-list.component.ts
│   │   ├── paises-list.component.html
│   │   └── paises-list.component.scss
│   └── pais-edit/
│       ├── pais-edit.component.ts
│       ├── pais-edit.component.html
│       └── pais-edit.component.scss
├── models/
│   └── pais.model.ts
├── services/
│   └── paises.service.ts
└── paises.module.ts
```

## Installation

1. Add this module to your Angular application
2. Install the required dependencies
3. Import the `PaisesModule` in your application's main module or use lazy loading

```typescript
// In your app-routing.module.ts for lazy loading
const routes: Routes = [
  {
    path: 'paises',
    loadChildren: () => import('./paises/paises.module').then(m => m.PaisesModule)
  },
  // other routes
];
```

## Features

- List of countries with filtering capabilities
- Add, edit, and delete countries
- Responsive design using Angular Material

## API Requirements

This module expects a REST API with the following endpoints:

- `GET /api/paises` - Get list of countries (with optional query parameters `nombre` and `mostrarNoActivos`)
- `GET /api/paises/:id` - Get a specific country
- `POST /api/paises` - Create a new country
- `PUT /api/paises/:id` - Update a country
- `DELETE /api/paises/:id` - Delete a country

## Localization

The application uses the default Angular i18n mechanisms. To add support for different languages, follow the Angular internationalization guide.

## Migration Notes

This Angular application is a migration from a Windows Forms application. The following mapping was applied:

- Windows Forms grid -> Angular Material table
- Windows Forms buttons -> Angular Material buttons
- Windows Forms filters -> Angular reactive forms
- Windows Forms dialogs -> Angular Material dialogs 
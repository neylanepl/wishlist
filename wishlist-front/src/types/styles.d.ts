// Declara que qualquer importação que termine em .css ou .scss
// é um módulo, e exporta um objeto que é um record de chaves string/string.
// Isso simula o comportamento do CSS Modules.
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Opcional: Para imports comuns que não usam CSS Modules
declare module '*.css';
declare module '*.scss';
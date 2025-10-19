describe("Fluxos de usuário - UI e interações", () => {
  const product = {
    code: "p1",
    name: "Camiseta estampada",
    image: "https://via.placeholder.com/150",
    priceInCents: "10000",
    salePriceInCents: "5000",
    rating: 3.5,
    stockAvailable: true,
    details: {
      name: "Camiseta estampada",
      description: "Uma camiseta confortável",
    },
  };

  const product2 = { ...product, code: "p2", name: "Caneca personalizada", priceInCents: "1990", salePriceInCents: "0", rating: 4.5 };

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("navega pela NavBar até a Wishlist e volta pelo breadcrumb", () => {
    cy.intercept("GET", "**/products", { statusCode: 200, body: { total: 0, pageSize: 0, totalPages: 0, products: [] } }).as("getProducts");
    cy.visit("/");
    cy.wait("@getProducts");

    // Navegar usando o link da NavBar
    cy.contains("a", "Wishlist").click();
    cy.location("pathname").should("eq", "/wishlist");

    // Voltar usando o breadcrumb
    cy.get('nav[aria-label="breadcrumb"]').within(() => {
      cy.contains("Home").click();
    });
    cy.location("pathname").should("eq", "/");
  });

  it("adiciona um produto na wishlist na Home e valida na página de Wishlist", () => {
    cy.intercept("GET", "**/products", { statusCode: 200, body: { total: 2, pageSize: 2, totalPages: 1, products: [product, product2] } }).as("getProducts");

    cy.visit("/");
    cy.wait("@getProducts");

    // Salvar o primeiro produto
    cy.get(`article[aria-label="${product.name}"]`).within(() => {
      cy.get('button[aria-label="Salvar na wishlist"]').click();
    });

    // Verifica localStorage
    cy.window().its("localStorage").invoke("getItem", "wishlist").then((item) => {
      const saved = JSON.parse(item || "[]");
      cy.wrap(saved).should('have.length', 1);
      cy.wrap(saved[0]).its('code').should('equal', product.code);
    });

    // Navega para a Wishlist pelo header
    cy.contains("a", "Wishlist").click();
    cy.location("pathname").should("eq", "/wishlist");

    // Verifica que o produto aparece na wishlist e permite remover
    cy.get('article[aria-label]').should('have.length', 1);
    cy.get(`article[aria-label="${product.name}"]`).within(() => {
      cy.get('button[aria-label="Remover da wishlist"]').click();
    });

    cy.get('article[aria-label]').should('have.length', 0);
    cy.window().its('localStorage').invoke('getItem', 'wishlist').then((item) => {
      const saved = JSON.parse(item || '[]');
      cy.wrap(saved).should('have.length', 0);
    });

    // Voltar para Home e esperar a requisição de produtos
    cy.get('nav[aria-label="breadcrumb"]').within(() => {
      cy.contains('Home').click();
    });
    cy.wait('@getProducts');
    cy.location('pathname').should('eq', '/');
  });

  it("exibe meia-estrela na avaliação e preços com desconto no ProductCard", () => {
    // produto com salePrice e avaliação 3.5
    cy.intercept("GET", "**/products", { statusCode: 200, body: { total: 1, pageSize: 1, totalPages: 1, products: [product] } }).as("getProducts");

    cy.visit("/");
    cy.wait("@getProducts");

    cy.get(`article[aria-label="${product.name}"]`).within(() => {
      // imagem com alt e lazy
      cy.get('img[loading="lazy"]').should('have.attr', 'alt', product.name);

      // avaliação com label correta e meia-estrela presente
      cy.get(`div[aria-label="Avaliação ${product.rating} de 5"]`).should('exist');
      cy.get('svg[aria-label="star half"]').should('exist');

      // preços (antigo e atual)
      cy.contains('R$ 100.00').should('be.visible');
      cy.contains('R$ 50.00').should('be.visible');
    });
  });

  it('abre e fecha o dropdown de perfil ao passar o mouse', () => {
    cy.intercept("GET", "**/products", { statusCode: 200, body: { total: 0, pageSize: 0, totalPages: 0, products: [] } }).as("getProducts");
    cy.visit('/');
    cy.wait('@getProducts');

  // Abrir o menu de perfil via focus (adicionado onFocus/onBlur no componente)
  cy.get('div[aria-label="perfil"]').trigger("mouseover");
  cy.get('ul[aria-label="menu de perfil"]').should('be.visible');
  cy.contains('Entrar').should('be.visible');

  cy.get('div[aria-label="perfil"]').trigger("mouseout");
  cy.get('ul[aria-label="menu de perfil"]').should('not.exist');
  });
});

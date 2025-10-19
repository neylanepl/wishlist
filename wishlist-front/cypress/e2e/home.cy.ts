describe("Página Inicial", () => {
  const product = {
    code: "p1",
    name: "Camiseta estampada",
    image: "https://via.placeholder.com/150",
    priceInCents: "1990",
    salePriceInCents: "0",
    rating: 4.5,
    stockAvailable: true,
    details: {
      name: "Camiseta estampada",
      description: "Uma camiseta confortável",
    },
  };

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("deve carregar a página e exibir o título correto", () => {
    cy.intercept("GET", "**/products", { statusCode: 200, body: { total: 0, pageSize: 0, totalPages: 0, products: [] } }).as("getProducts");
    cy.visit("/");
    cy.contains("Home").should("be.visible");
    cy.wait("@getProducts");
  });

  it("exibe estado de carregamento enquanto produtos estão sendo buscados", () => {
    cy.intercept("GET", "**/products", { statusCode: 200, body: { total: 1, pageSize: 1, totalPages: 1, products: [product] }, delayMs: 800 }).as("getProducts");
    cy.visit("/");
    cy.contains("Carregando produtos...").should("be.visible");
  cy.wait("@getProducts");
  cy.contains(product.name).should("be.visible");
  cy.get('article[aria-label]').should('have.length', 1);
    cy.contains("Carregando produtos...").should("not.exist");
  });

  it("mostra mensagem quando não há produtos disponíveis", () => {
    cy.intercept("GET", "**/products", { statusCode: 200, body: { total: 0, pageSize: 0, totalPages: 0, products: [] } }).as("getProducts");
    cy.visit("/");
    cy.wait("@getProducts");
    cy.contains("Nenhum produto disponível no momento.").should("be.visible");
  });

  it("renderiza produtos e permite salvar/remover da wishlist", () => {
    const product2 = { ...product, code: "p2", name: "Caneca personalizada" };
    cy.intercept("GET", "**/products", { statusCode: 200, body: { total: 2, pageSize: 2, totalPages: 1, products: [product, product2] } }).as("getProducts");

    cy.visit("/");
  cy.wait("@getProducts");

  cy.contains(product.name).should("be.visible");
  cy.contains(product2.name).should("be.visible");
  cy.get('article[aria-label]').should('have.length', 2);

    // Ao clicar no botão de wishlist do primeiro produto, ele deve ser salvo
    cy.get(`article[aria-label="${product.name}"]`).within(() => {
      cy.get('button[aria-label="Salvar na wishlist"]').click();
      cy.get('button[aria-label="Remover da wishlist"]').should("exist");
    });

    // Verifica localStorage
    cy.window().its('localStorage').invoke('getItem', 'wishlist').then((item) => {
      const saved = JSON.parse(item || '[]');
      cy.wrap(saved).should('have.length', 1);
      cy.wrap(saved[0]).its('code').should('equal', product.code);
    });

    // Clicar novamente deve remover da wishlist
    cy.get(`article[aria-label="${product.name}"]`).within(() => {
      cy.get('button[aria-label="Remover da wishlist"]').click();
      cy.get('button[aria-label="Salvar na wishlist"]').should("exist");
    });

    cy.window().its('localStorage').invoke('getItem', 'wishlist').then((item) => {
      const saved = JSON.parse(item || '[]');
      cy.wrap(saved).should('have.length', 0);
    });
  });
});

describe("Página Wishlist", () => {
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

	it("deve exibir mensagem quando não há produtos salvos", () => {
		cy.visit("/wishlist");
		cy.contains("Wishlist").should("be.visible");
		cy.contains("Nenhum produto salvo na wishlist.").should("be.visible");
	});

	it("renderiza produtos salvos e permite remover da wishlist", () => {
		const product2 = { ...product, code: "p2", name: "Caneca personalizada" };

		// Preenche o localStorage antes do app carregar
		cy.visit("/wishlist", {
			onBeforeLoad(win) {
				win.localStorage.setItem("wishlist", JSON.stringify([product, product2]));
			},
		});

		// Deve mostrar os dois produtos
		cy.get('article[aria-label]').should("have.length", 2);
		cy.contains(product.name).should("be.visible");
		cy.contains(product2.name).should("be.visible");
		cy.contains("Nenhum produto salvo na wishlist.").should("not.exist");

		// Remover o primeiro produto
		cy.get(`article[aria-label="${product.name}"]`).within(() => {
			cy.get('button[aria-label="Remover da wishlist"]').click();
		});

		cy.get('article[aria-label]').should('have.length', 1);
		cy.window().its('localStorage').invoke('getItem', 'wishlist').then((item) => {
			const saved = JSON.parse(item || '[]');
			cy.wrap(saved).should('have.length', 1);
			cy.wrap(saved[0]).its('code').should('equal', product2.code);
		});

		// Remover o segundo (último) produto deve mostrar a mensagem de vazio
		cy.get(`article[aria-label="${product2.name}"]`).within(() => {
			cy.get('button[aria-label="Remover da wishlist"]').click();
		});

		cy.get('article[aria-label]').should('have.length', 0);
		cy.contains("Nenhum produto salvo na wishlist.").should("be.visible");
		cy.window().its('localStorage').invoke('getItem', 'wishlist').then((item) => {
			const saved = JSON.parse(item || '[]');
			cy.wrap(saved).should('have.length', 0);
		});
	});

	it("mantém itens salvos após recarregar a página", () => {
		cy.visit("/wishlist", {
			onBeforeLoad(win) {
				win.localStorage.setItem("wishlist", JSON.stringify([product]));
			},
		});

		cy.get('article[aria-label]').should('have.length', 1);
		cy.reload();
		cy.get('article[aria-label]').should('have.length', 1);
	});

    it("trata e remove localStorage inválido na página de Wishlist", () => {
        cy.visit('/wishlist', {
        onBeforeLoad(win) {
            win.localStorage.setItem('wishlist', 'not a json');
        },
        });

        cy.contains('Nenhum produto salvo na wishlist.').should('be.visible');
        cy.window().its('localStorage').invoke('getItem', 'wishlist').should('be.null');
    });

	it("exibe breadcrumb com link para Home e o rótulo Wishlist", () => {
		cy.visit('/wishlist');
		cy.get('nav[aria-label="breadcrumb"]').within(() => {
			cy.contains('Home').should('be.visible');
			cy.contains('Wishlist').should('be.visible');
			cy.get('a').contains('Home').should('have.attr', 'href', '/');
		});
	});
});


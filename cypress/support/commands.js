// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("containsAssert", (ele, text) => {
  cy.get(ele).contains(text);
});

Cypress.Commands.add("searchWithText", (ele, searchText) => {
  cy.get(ele)
    .should("have.value", "")
    .type(searchText)
    .should("have.value", searchText);
});

Cypress.Commands.add("clickWebElement", (ele) => {
  cy.get(ele).click();
});

Cypress.Commands.add("pageTitle", (text) => {
  cy.title().should("eq", text);
});

Cypress.Commands.add("showAllBrand", (ele) => {
  //'[id="brandsRefinements"] > #filter-p_123'
  cy.isElementVisible(ele).contains("See more").click();
});

Cypress.Commands.add("watchBrandFilter", (brand) => {
  cy.get('[id="brandsRefinements"] > #filter-p_123').contains(brand).click();
});

Cypress.Commands.add("isElementVisible", (webElement) => {
  cy.get(webElement).should("be.visible");
});

Cypress.Commands.add("sliderDrag", (ele, value) => {
  cy.get(ele)
    .should("exist")
    .invoke("val", value)
    .trigger("input", { force: true })
    .trigger("change", { force: true });
});

Cypress.Commands.add(
  "validatePriceList",
  (ele, priceLists, lowPrice, highPrice) => {
    cy.get(ele, { timeout: 5000 })
      .each(($el) => {
        cy.wrap($el)
          .invoke("text")
          .then((price) => {
            const cleaned = price.replace(/[^\d]/g, "");
            const priceList = parseInt(cleaned, 10);
            cy.log(priceList);
            priceLists.push(priceList);
          });
      })
      .then(() => {
        priceLists.forEach((price) => {
          expect(price).to.be.at.least(lowPrice);
          expect(price).to.be.at.most(highPrice);
        });
      });
  }
);

Cypress.Commands.add("priceFilter", (ele, option, type, typeEle) => {
  cy.get(ele)
    .click()
    .then(() => {
      cy.get(option).contains(type).should("be.visible");
      cy.get(typeEle).click();
    });
});

Cypress.Commands.add("openNewTab", (ele) => {
  cy.get(ele)
    .first()
    .invoke("removeAttr", "target") // Remove target="_blank"
    .click();
});

Cypress.Commands.add("validateText", (ele, productTitle) => {
  cy.get(ele)
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq(productTitle);
    });
});

Cypress.Commands.add("getTitleText", (ele, productTitle) => {
  cy.get(ele)
    .first()
    .invoke("text")
    .then((text) => {
      productTitle += text.trim();
      cy.log(`Text of Product : ${productTitle}`);
    });
});

Cypress.Commands.add("urlIncludeValidate", (text) => {
  cy.url().should("include", text);
});

Cypress.Commands.add("urlNotIncludeValidate", (text) => {
  cy.url().should("not.include", text);
});

Cypress.Commands.add("navigateBack", () => {
  cy.go("back");
});

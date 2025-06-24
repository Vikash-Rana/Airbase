export class AmazonPage {
  constructor(lowEle, highEle, productTitleEle) {
    this.lowEle = lowEle;
    this.highEle = highEle;
    this.productTitleEle = productTitleEle;
  }

  sliderPriceRanges() {
    let lowPrice = 0;
    let highPrice = 0;

    // Start chain
    return cy
      .get(this.lowEle)
      .invoke("text")
      .then((priceText) => {
        const cleaned = priceText.replace(/[^\d]/g, "");
        lowPrice = parseInt(cleaned, 10);
        expect(lowPrice).to.be.greaterThan(50);
      })
      .then(() => {
        return cy.get(this.highEle).invoke("text");
      })
      .then((priceText) => {
        const trimmedText = priceText.trim();
        if (trimmedText.endsWith("+")) {
          const cleaned = trimmedText.replace(/[₹,+]/g, "").replace(/,/g, "");
          highPrice = parseInt(cleaned, 10);
          expect(highPrice).to.be.lessThan(Infinity);
          highPrice = Infinity;
        } else {
          const cleaned = trimmedText.replace(/[₹,]/g, "");
          highPrice = parseInt(cleaned, 10);
          expect(highPrice).to.be.lessThan(Infinity);
        }

        return cy.wrap({ lowPrice, highPrice });
      });
  }

  getTextFromDetailPage() {
    return cy
      .get(this.productTitleEle)
      .first()
      .invoke("text")
      .then((text) => {
        const productTitle = text.trim();
        cy.log(`Text of Product: ${productTitle}`);
        return cy.wrap(productTitle); // ✅ Return wrapped value
      });
  }
}

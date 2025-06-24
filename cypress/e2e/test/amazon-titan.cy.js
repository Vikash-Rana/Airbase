import { AmazonPage } from "../page/amazon.page";

describe("Verify the Amazon", function () {
  let amazon;
  let productTitle = "";
  let priceLists = [];
  let config;

  beforeEach(function () {
    // Load fixture
    cy.fixture("object/amazon").then((data) => {
      config = data;
      amazon = new AmazonPage(
        config.lowRangeEle,
        config.highRangeEle,
        config.productTitleEle
      );
    });

    cy.visit("https://www.amazon.in/", { timeout: 100000 });
  });

  it("Verify the title", () => {
    cy.pageTitle(config.titleText);
  });

  it("Search by Text", () => {
    cy.searchWithText(config.searchBoxEle, config.searchText);
    cy.clickWebElement(config.searchIcon);
    cy.containsAssert(config.searchResult, config.searchText);
  });

  it(`Verify user is able to select the Titan Brand from Filter`, () => {
    cy.searchWithText(config.searchBoxEle, config.searchText);
    cy.clickWebElement(config.searchIcon);
    cy.containsAssert(config.searchResult, config.searchText);
    cy.showAllBrand(config.brandFilter);
    cy.watchBrandFilter(config.brandTitan);
  });

  it("Validate the Slider and Check the watched displayed with range", () => {
    cy.searchWithText(config.searchBoxEle, config.searchText);
    cy.clickWebElement(config.searchIcon);
    cy.containsAssert(config.searchResult, config.searchText);
    cy.showAllBrand(config.brandFilter);
    cy.watchBrandFilter(config.brandTitan);
    cy.isElementVisible(config.lowerSlider);
    cy.isElementVisible(config.higherSlider);
    cy.sliderDrag(config.lowerSlider, 45);
    cy.sliderDrag(config.higherSlider, 80);
    cy.clickWebElement(config.goButton);
    amazon.sliderPriceRanges().then(({ lowPrice, highPrice }) => {
      cy.validatePriceList(
        config.priceElement,
        priceLists,
        lowPrice,
        highPrice
      );
    });
  });

  it("Verify the Sort price from high to low", () => {
    // Reuse steps
    cy.searchWithText(config.searchBoxEle, config.searchText);
    cy.clickWebElement(config.searchIcon);
    cy.containsAssert(config.searchResult, config.searchText);
    cy.showAllBrand(config.brandFilter);
    cy.watchBrandFilter(config.brandTitan);
    cy.sliderDrag(config.lowerSlider, 45);
    cy.sliderDrag(config.higherSlider, 80);
    cy.clickWebElement(config.goButton);
    amazon.sliderPriceRanges().then(({ lowPrice, highPrice }) => {
      cy.validatePriceList(
        config.priceElement,
        priceLists,
        lowPrice,
        highPrice
      );
    });
    cy.priceFilter(
      config.priceFilterEle,
      config.priceFilterOption,
      config.priceFilterType,
      config.priceFilterTypeEle
    );
  });

  it("Open the product with the highest price in New Tab", () => {
    cy.searchWithText(config.searchBoxEle, config.searchText);
    cy.clickWebElement(config.searchIcon);
    cy.containsAssert(config.searchResult, config.searchText);
    cy.showAllBrand(config.brandFilter);
    cy.watchBrandFilter(config.brandTitan);
    cy.sliderDrag(config.lowerSlider, 45);
    cy.sliderDrag(config.higherSlider, 80);
    cy.clickWebElement(config.goButton);
    amazon.sliderPriceRanges().then(({ lowPrice, highPrice }) => {
      cy.validatePriceList(
        config.priceElement,
        priceLists,
        lowPrice,
        highPrice
      );
    });
    cy.priceFilter(
      config.priceFilterEle,
      config.priceFilterOption,
      config.priceFilterType,
      config.priceFilterTypeEle
    );
    cy.getTitleText(config.productTitleEle, productTitle);
    amazon.getTextFromDetailPage().then((productTitle) => {
      cy.openNewTab(config.openOnTabEle);
      cy.validateText(config.validateTitleEle, productTitle);
    });
  });

  it("Check the product details & add product to the cart on New Tab", () => {
    cy.searchWithText(config.searchBoxEle, config.searchText);
    cy.clickWebElement(config.searchIcon);
    cy.containsAssert(config.searchResult, config.searchText);
    cy.showAllBrand(config.brandFilter);
    cy.watchBrandFilter(config.brandTitan);
    cy.sliderDrag(config.lowerSlider, 45);
    cy.sliderDrag(config.higherSlider, 80);
    cy.clickWebElement(config.goButton);
    amazon.sliderPriceRanges().then(({ lowPrice, highPrice }) => {
      cy.validatePriceList(
        config.priceElement,
        priceLists,
        lowPrice,
        highPrice
      );
    });
    cy.priceFilter(
      config.priceFilterEle,
      config.priceFilterOption,
      config.priceFilterType,
      config.priceFilterTypeEle
    );
    cy.getTitleText(config.productTitleEle, productTitle);
    amazon.getTextFromDetailPage().then((productTitle) => {
      cy.openNewTab(config.openOnTabEle);
      cy.validateText(config.validateTitleEle, productTitle);
      cy.clickWebElement(config.addToCartText);
      cy.urlIncludeValidate(config.urlCartText);
    });
  });

  it("Verify product has been added to the cart", () => {
    cy.searchWithText(config.searchBoxEle, config.searchText);
    cy.clickWebElement(config.searchIcon);
    cy.containsAssert(config.searchResult, config.searchText);
    cy.showAllBrand(config.brandFilter);
    cy.watchBrandFilter(config.brandTitan);
    cy.sliderDrag(config.lowerSlider, 45);
    cy.sliderDrag(config.higherSlider, 80);
    cy.clickWebElement(config.goButton);
    amazon.sliderPriceRanges().then(({ lowPrice, highPrice }) => {
      cy.validatePriceList(
        config.priceElement,
        priceLists,
        lowPrice,
        highPrice
      );
    });
    cy.priceFilter(
      config.priceFilterEle,
      config.priceFilterOption,
      config.priceFilterType,
      config.priceFilterTypeEle
    );
    cy.getTitleText(config.productTitleEle, productTitle);
    amazon.getTextFromDetailPage().then((productTitle) => {
      cy.openNewTab(config.openOnTabEle);
      cy.validateText(config.validateTitleEle, productTitle);
      cy.clickWebElement(config.addToCartText);
      cy.urlIncludeValidate(config.urlCartText);
      cy.validateText(config.validateCartEle, config.cartText);
    });
  });

  it("Close the new window and return to the main window", () => {
    cy.searchWithText(config.searchBoxEle, config.searchText);
    cy.clickWebElement(config.searchIcon);
    cy.containsAssert(config.searchResult, config.searchText);
    cy.showAllBrand(config.brandFilter);
    cy.watchBrandFilter(config.brandTitan);
    cy.sliderDrag(config.lowerSlider, 45);
    cy.sliderDrag(config.higherSlider, 80);
    cy.clickWebElement(config.goButton);
    amazon.sliderPriceRanges().then(({ lowPrice, highPrice }) => {
      cy.validatePriceList(
        config.priceElement,
        priceLists,
        lowPrice,
        highPrice
      );
    });
    cy.priceFilter(
      config.priceFilterEle,
      config.priceFilterOption,
      config.priceFilterType,
      config.priceFilterTypeEle
    );
    amazon.getTextFromDetailPage().then((productTitle) => {
      cy.openNewTab(config.openOnTabEle);
      cy.validateText(config.validateTitleEle, productTitle);
      cy.clickWebElement(config.addToCartText);
      cy.urlIncludeValidate(config.urlCartText);
      cy.validateText(config.validateCartEle, config.cartText);
      cy.navigateBack();
      cy.urlNotIncludeValidate(config.urlCartText);
      cy.validateText(config.validateTitleEle, productTitle);
    });
  });
});

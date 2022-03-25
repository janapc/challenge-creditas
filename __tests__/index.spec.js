import { mountForm } from "../src/index";

function initializeAppMock() {
  document.body.innerHTML = `
  <div class="container">
  <nav class="nav-container">
    <a href="#" title="Creditas">
      <img
        class="nav-logo"
        src="../assets/creditas-logo.png"
        alt="Creditas"
      />
    </a>
    <a class="nav-link" href="#ajuda" title="Ajuda">Ajuda</a>
  </nav>
  <main class="main-container">
    <section class="section-container">
      <header>
        <h1 id="title-section">
          Realize uma <strong>simulação de crédito</strong> utilizando seu bem como garantia.
        </h1>
      </header>
      <div class="articles-container">
        <article class="article-form">
          <form id="form">
            <div class="fields">
              <div class="field">
                <label for="warranty" id="label-warranty">Garantia</label>
                <select
                  class="select"
                  name="warranty"
                  id="warranty"
                  required
                >
                  <option value="vehicle">Veículo</option>
                  <option value="immobile">Imóvel</option>
                </select>
              </div>
              <div class="field">
                <label for="number-parcel" id="label-parcel">Número de parcelas</label>
                <select
                  name="number-parcel"
                  id="number-parcel"
                  required
                ></select>
              </div>

              <div class="field field-range">
                <label for="warranty-value" id="label-warranty-value">Valor da Garantia</label>
                <input
                  class="input-form"
                  type="number"
                  required
                  name="warranty-value"
                  id="warranty-value"
                  value="0"
                />
                <div class="range">
                  <input
                    type="range"
                    class="slider"
                    name="warranty-value-range"
                    id="warranty-value-range"
                    min="0"
                    max="0"
                    step="10"
                    aria-label="warranty value range"
                  />
                  <div class="range-values" id="range-values-warranty">
                    <span>0</span>
                    <span>0</span>
                  </div>
                </div>
              </div>

              <div class="field field-range">
                <label for="load-value" id="label-load-value">Valor do Empréstimo</label>
                <input
                  type="text"
                  class="input-form"
                  required
                  name="load-value"
                  id="load-value"
                  value=""
                />
                <div for="load-value-range" class="range">
                  <input
                    class="slider"
                    type="range"
                    name="load-value-range"
                    id="load-value-range"
                    min="0"
                    max="0"
                    step="10"
                    aria-label="load value range"
                  />
                  <div class="range-values" id="range-values-load">
                    <span>0</span>
                    <span>0</span>
                  </div>
                </div>
              </div>
              <div style="display:none" class="error-message" id="error-message">
                <span
                  >Algum campo está inválido por favor verifique os campos preeenchidos.</span>
              </div>
            </div>
          </form>
        </article>
        <div class="arrow-right">
          <img id="image-arrow" src="../assets/arrow.png" alt="arrow-right" />
        </div>
        <article class="article-result">
          <div class="result-container">
            <div class="parcel-container">
              <h2 id="result-value-parcel">Valor da Parcela</h2>
              <div class="parcel" id="result-parcel">
                <strong>R$</strong>
                <span id="parcel-value">138,90</span>
              </div>
            </div>
            <div class="amount-container">
              <h2 id="result-amount">Total a pagar</h2>
              <p id="amount-value">3.333,60</p>
            </div>
            <div class="tax-container">
              <h2 id="result-tax">Taxa de juros (mês)</h2>
              <p id="tax-value">2.34%</p>
            </div>
            <button class="btn-apply" id="btn-apply">Solicitar</button>
          </div>
        </article>
      </div>
    </section>
  </main>
  <footer>
    <p>© 2022 - Creditas Challenge</p>
  </footer>

  <div style="display:none" class="modal-container" id="modal">
    <div class="card-modal">
      <p>
        Sua solicitação foi envida com sucesso.<br />Entraremos em contato em breve.
      </p>
      <button id="close-modal">Fechar</button>
    </div>
  </div>
</div>
  `;
}

function clean() {
  document.body.innerHTML = "";
}

describe("Creditas Challenge", () => {
  beforeEach(() => {
    initializeAppMock();
    mountForm();
  });

  afterEach(() => {
    clean();
  });

  it("Should render the navbar", () => {
    const navContainer = document.querySelector(".nav-container");
    const navLogo = document.querySelector(".nav-logo");
    const navLink = document.querySelector(".nav-link");

    expect(navContainer).toBeTruthy();
    expect(navLogo.getAttribute("src")).toEqual("../assets/creditas-logo.png");
    expect(navLink.innerHTML).toEqual("Ajuda");
  });

  it("Should render the header of section", () => {
    const titleSection = document.querySelector("#title-section");

    expect(
      titleSection.textContent.includes(
        "Realize uma simulação de crédito utilizando seu bem como garantia."
      )
    ).toBeTruthy();
  });

  it("Should render the form", () => {
    const form = document.querySelector("#form");
    const labelWarranty = document.querySelector("#label-warranty");
    const warrantySelect = document.getElementById("warranty");
    const labelParcel = document.querySelector("#label-parcel");
    const numberParcelSelect = document.getElementById("number-parcel");
    const labelWarrantyValue = document.querySelector("#label-warranty-value");
    const warrantyValueInput = document.getElementById("warranty-value");
    const warrantyValueRangeSelect = document.getElementById(
      "warranty-value-range"
    );
    const rangeValuesWarranty = document.querySelectorAll(
      "div#range-values-warranty > span"
    );
    const labelLoadValue = document.querySelector("#label-load-value");
    const loadValueInput = document.getElementById("load-value");
    const loadValueRangeSelect = document.getElementById("load-value-range");
    const rangeValuesLoad = document.querySelectorAll(
      "div#range-values-load > span"
    );
    const errorMessage = document.querySelectorAll("#error-message > span");
    const errorMessageVisibity = document.getElementById("error-message");

    expect(form).toBeTruthy();
    expect(labelWarranty.innerHTML).toEqual("Garantia");
    expect(warrantySelect.value).toEqual("vehicle");
    expect(labelParcel.innerHTML).toEqual("Número de parcelas");
    expect(numberParcelSelect.value).toEqual("24");
    expect(labelWarrantyValue.innerHTML).toEqual("Valor da Garantia");
    expect(warrantyValueInput.value).toEqual("5000");
    expect(warrantyValueRangeSelect.value).toEqual("");
    expect(rangeValuesWarranty[0].textContent).toEqual("R$ 5.000,00");
    expect(rangeValuesWarranty[1].textContent).toEqual("R$ 3.000.000,00");
    expect(labelLoadValue.innerHTML).toEqual("Valor do Empréstimo");
    expect(loadValueInput.value).toEqual("3000");
    expect(loadValueRangeSelect.value).toEqual("");
    expect(rangeValuesLoad[0].textContent).toEqual("R$ 3.000,00");
    expect(rangeValuesLoad[1].textContent).toEqual("R$ 100.000,00");
    expect(
      errorMessage[0].textContent.includes(
        "Algum campo está inválido por favor verifique os campos preeenchidos."
      )
    ).toBeTruthy();
    expect(
      errorMessageVisibity.style.display
    ).toEqual("none");
  });

  it("Should render the form vehicle", () => {
    const warrantySelect = document.getElementById("warranty");
    const numberParcelSelect = document.querySelectorAll("#number-parcel > option");
    const rangeValuesWarranty = document.querySelectorAll(
      "div#range-values-warranty > span"
    );
    const rangeValuesLoad = document.querySelectorAll(
      "div#range-values-load > span"
    );

    expect(warrantySelect.value).toEqual("vehicle");
    expect(numberParcelSelect[0].value).toEqual("24");
    expect(numberParcelSelect[1].value).toEqual("36");
    expect(numberParcelSelect[2].value).toEqual("48");
    expect(rangeValuesWarranty[0].textContent).toEqual("R$ 5.000,00");
    expect(rangeValuesWarranty[1].textContent).toEqual("R$ 3.000.000,00");
    expect(rangeValuesLoad[0].textContent).toEqual("R$ 3.000,00");
    expect(rangeValuesLoad[1].textContent).toEqual("R$ 100.000,00");
  });

  it("Should render the form immobile", () => {
    const warrantySelect = document.getElementById("warranty");
    warrantySelect.value = "immobile";
    mountForm();

    const numberParcelSelect = document.querySelectorAll("#number-parcel > option");
    const rangeValuesWarranty = document.querySelectorAll(
      "div#range-values-warranty > span"
    );
    const rangeValuesLoad = document.querySelectorAll(
      "div#range-values-load > span"
    );

    expect(warrantySelect.value).toEqual("immobile");
    expect(numberParcelSelect[0].value).toEqual("120");
    expect(numberParcelSelect[1].value).toEqual("180");
    expect(numberParcelSelect[2].value).toEqual("240");
    expect(rangeValuesWarranty[0].textContent).toEqual("R$ 50.000,00");
    expect(rangeValuesWarranty[1].textContent).toEqual("R$ 100.000.000,00");
    expect(rangeValuesLoad[0].textContent).toEqual("R$ 30.000,00");
    expect(rangeValuesLoad[1].textContent).toEqual("R$ 4.500.000,00");
  });

  it("Should render arrow", () => {
    const imageArrow = document.getElementById("image-arrow");

    expect(imageArrow.src).toEqual("http://localhost/assets/arrow.png");
  });

  it("Should render results", () => {
    const resultValueParcel = document.getElementById("result-value-parcel");
    const resultParcel = document.querySelector("#result-parcel");
    const resultParcelStrong = document.querySelector("#result-parcel > strong");
    const resultAmount = document.getElementById("result-amount");
    const amountValue = document.getElementById("amount-value");
    const resultTax = document.getElementById("result-tax");
    const taxValue = document.getElementById("tax-value");
    const btnApply = document.getElementById("btn-apply");

    expect(resultValueParcel.innerHTML).toEqual("Valor da Parcela");
    expect(resultParcelStrong.textContent.includes("R$")).toBeTruthy();
    expect(resultParcel.textContent.includes("138,90")).toBeTruthy();
    expect(resultAmount.innerHTML).toEqual("Total a pagar");
    expect(amountValue.innerHTML).toEqual("3.333,60");
    expect(resultTax.innerHTML).toEqual("Taxa de juros (mês)");
    expect(taxValue.innerHTML).toEqual("2.34%");
    expect(btnApply.innerHTML).toEqual("Solicitar");
  });

  it("Should render footer", () => {
    const footerText = document.querySelector("footer > p");

    expect(footerText.innerHTML).toEqual("© 2022 - Creditas Challenge");
  });

  it("Should render modal", () => {
    const cardModal = document.getElementById("modal");
    const cardModalText = document.querySelector(".card-modal > p");
    const cardModalBtn = document.querySelector(".card-modal > button");

    expect(cardModalText.textContent.includes("Sua solicitação foi envida com sucesso.Entraremos em contato em breve.")).toBeTruthy();
    expect(cardModalBtn.innerHTML).toEqual("Fechar");
    expect(cardModal.style.display).toEqual("none");
  });

  it("Should to close modal", () => {
    document.getElementById("btn-apply").click();

    const cardModal = document.getElementById("modal");
    const cardModalBtn = document.querySelector(".card-modal > button");

    expect(cardModal.style.display).toEqual("flex");
    expect(cardModalBtn.innerHTML).toEqual("Fechar");

    cardModalBtn.click();

    expect(cardModal.style.display).toEqual("none");
  });

  it("Should show error if the value is invalid", () => {
    const warrantyValueInput = document.getElementById(
      "warranty-value"
    );
    const errorMessageVisibity = document.getElementById("error-message");

    warrantyValueInput.value = 1000000000;
    warrantyValueInput.dispatchEvent(new Event("change", { bubbles: true }));

    expect(warrantyValueInput.value).toEqual("1000000000");
    expect(errorMessageVisibity.style.display).toEqual("block");
  });

  it("Should not show modal if the value is invalid", () => {
    const warrantyValueInput = document.getElementById(
      "warranty-value"
    );
    const errorMessageVisibity = document.getElementById("error-message");
    const modalVisibity = document.getElementById("modal");

    warrantyValueInput.value = 1000000000;
    warrantyValueInput.dispatchEvent(new Event("change", { bubbles: true }));
    document.getElementById("btn-apply").click();

    expect(warrantyValueInput.value).toEqual("1000000000");
    expect(errorMessageVisibity.style.display).toEqual("block");
    expect(modalVisibity.style.display).toEqual("none");
  });

  it("Should change value input warranty by range", () => {
    const warrantyValueRange = document.getElementById(
      "warranty-value-range"
    );
    const warrantyValueInput = document.getElementById(
      "warranty-value"
    );
    warrantyValueRange.value = 32990;
    warrantyValueRange.dispatchEvent(new Event("change", { bubbles: true }));
    document.getElementById("btn-apply").click();

    expect(warrantyValueRange.value).toEqual("32990");
    expect(warrantyValueInput.value).toEqual("32990");
  });

  it("Should submit form", () => {
    const warrantyValueInput = document.getElementById(
      "warranty-value"
    );
    const errorMessageVisibity = document.getElementById("error-message");
    const loadValueInput = document.getElementById("load-value");
    const resultParcel = document.querySelector("#result-parcel");
    const amountValue = document.getElementById("amount-value");
    const taxValue = document.getElementById("tax-value");
    const cardModal = document.getElementById("modal");

    warrantyValueInput.value = 10000;
    warrantyValueInput.dispatchEvent(new Event("change", { bubbles: true }));
    loadValueInput.value = 20000;
    loadValueInput.dispatchEvent(new Event("change", { bubbles: true }));

    document.getElementById("btn-apply").click();

    expect(warrantyValueInput.value).toEqual("10000");
    expect(loadValueInput.value).toEqual("20000");
    expect(errorMessageVisibity.style.display).toEqual("none");
    expect(resultParcel.textContent.includes("926,00")).toBeTruthy();
    expect(amountValue.innerHTML).toEqual("R$&nbsp;22.224,00");
    expect(taxValue.innerHTML).toEqual("2.34%");
    expect(cardModal.style.display).toEqual("flex");
  });
});

import "./styles.css";

const typeWarranty = {
  vehicle: {
    minLoad: 3000,
    maxLoad: 100000,
    parcels: [24, 36, 48],
    minWarranty: 5000,
    maxWarranty: 3000000
  },
  immobile: {
    minLoad: 30000,
    maxLoad: 4500000,
    parcels: [120, 180, 240],
    minWarranty: 50000,
    maxWarranty: 100000000
  }
};

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

function handleFormValues(params) {
  params.forEach((items) => {
    const item = items;
    item.inputValue.value = item.minValue;
    item.inputValue.min = item.minValue;
    item.inputValue.max = item.maxValue;
    item.inputValueRange.min = item.minValue;
    item.inputValueRange.max = item.maxValue;

    const rangeValuesFormated = document.querySelectorAll(item.rangeValues);
    rangeValuesFormated[0].innerHTML = formatCurrency(item.minValue);
    rangeValuesFormated[1].innerHTML = formatCurrency(item.maxValue);

    item.inputValueRange.addEventListener("change", (event) => {
      item.inputValue.value = event.target.value;
    });
  });
}

function handleParcels(parcels) {
  const numberOfParcelsElement = document.querySelector("#number-parcel");
  numberOfParcelsElement.innerHTML = "";

  parcels.forEach((item) => {
    const li = document.createElement("option");
    li.textContent = item;
    li.value = item;
    numberOfParcelsElement.appendChild(li);
  });
}

function creditSimulation() {
  const loadValueElement = document.getElementById("load-value");
  const numberOfParcelsElement = document.getElementById("number-parcel");

  const iof = 6.38 / 100;
  const interestRate = 2.34 / 100;
  const deadline = numberOfParcelsElement.value / 1000;
  const loadValue = loadValueElement.value;

  const totalPayable = (iof + interestRate + deadline + 1) * loadValue;

  const valueOfParcels = totalPayable / numberOfParcelsElement.value;

  return {
    valueOfParcels: formatCurrency(valueOfParcels),
    totalPayable: formatCurrency(totalPayable)
  };
}

function submitForm(formElement) {
  formElement.addEventListener("change", (event) => {
    event.preventDefault();

    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.style.display = "none";

    if (formElement.checkValidity()) {
      const result = creditSimulation();

      const parcelValueElement = document.getElementById("parcel-value");
      const amountValueElement = document.getElementById("amount-value");

      parcelValueElement.innerHTML = result.valueOfParcels.substring(3);
      amountValueElement.innerHTML = result.totalPayable;
    } else {
      errorMessageElement.style.display = "block";
    }
  });
}

function mountForm() {
  const fieldsForm = {
    load: {
      inputValue: document.getElementById("load-value"),
      inputValueRange: document.getElementById("load-value-range"),
      rangeValues: "div#range-values-load > span"
    },
    warranty: {
      inputValue: document.getElementById("warranty-value"),
      inputValueRange: document.getElementById("warranty-value-range"),
      rangeValues: "div#range-values-warranty > span"
    }
  };

  submitForm(document.querySelector("#form"));

  const warrantyValue = document.getElementById("warranty").value;

  handleFormValues([
    {
      ...fieldsForm.load,
      minValue: typeWarranty[warrantyValue].minLoad,
      maxValue: typeWarranty[warrantyValue].maxLoad
    },
    {
      ...fieldsForm.warranty,
      minValue: typeWarranty[warrantyValue].minWarranty,
      maxValue: typeWarranty[warrantyValue].maxWarranty
    }
  ]);
  handleParcels(typeWarranty[warrantyValue].parcels);

  document.getElementById("warranty").addEventListener("change", () => mountForm());

  document.getElementById("btn-apply").onclick = () => {
    if (document.getElementById("error-message").style.display !== "block") {
      document.getElementById("modal").style.display = "flex";
    }
  };

  document.getElementById("close-modal").onclick = () => {
    document.getElementById("modal").style.display = "none";
  };
}

export { mountForm, submitForm };

document.addEventListener("DOMContentLoaded", () => mountForm());

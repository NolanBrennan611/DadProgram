const nameInput = document.getElementById("name");
const displayName = document.getElementById("display-name");
const dateInput = document.getElementById("date-picker");
const displayDate = document.getElementById("display-date");
const itemTypeBoxOne = document.getElementById("expense-category");
const displayItemDescription = document.getElementById("display-item-one");
const itemOneAmountInput = document.getElementById("item-one-amount-input");
const displayItemOneAmount = document.getElementById("show-item-one-amount");
const invoiceNumberInput = document.getElementById("invoice-no-input");
const displayInvoiceNumber = document.getElementById("invoice-number-field");
const amountInput = document.getElementById("amount-input");
const displayAmount = document.getElementById("money-output");

nameInput.addEventListener("change", function () {
    const nameValue = this.value;
    displayName.textContent = nameValue;
    nameInput.classList.add("hidden");
    displayName.classList.remove("hidden");
});

dateInput.addEventListener("change", function () {
    const dateValue = this.value;
    if (dateValue) {
        const [year, month, day] = dateValue.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        displayDate.textContent = formattedDate;

        // Hide the date picker
        dateInput.classList.add("hidden");
        displayDate.classList.remove("hidden");
    }
});

itemTypeBoxOne.addEventListener("change", function () {
    const type = this.value;
    displayItemDescription.textContent = `${type}`;
    itemTypeBoxOne.classList.add("hidden");
    displayItemDescription.classList.remove("hidden");
});

itemOneAmountInput.addEventListener("change", function () {
    const amount = this.value.replace(/[^0-9.]/g, "");
    displayItemOneAmount.textContent = ` $${amount}`;
    itemOneAmountInput.classList.add("hidden");
    displayItemOneAmount.classList.remove("hidden");
});

amountInput.addEventListener("change", function () {
    const amount = this.value.replace(/[^0-9.]/g, "");
    displayAmount.textContent = ` $${amount}`;
    amountInput.classList.add("hidden");
    displayAmount.classList.remove("hidden");
});

invoiceNumberInput.addEventListener("change", function () {
    const invoiceNo = this.value;
    document.getElementById("invoice-number-field").textContent = invoiceNo;
    invoiceNumberInput.classList.add("hidden");
    displayInvoiceNumber.classList.remove("hidden");
});

    document.getElementById("show-name-input")
        .addEventListener("click", function () {
            nameInput.classList.remove("hidden");
            displayName.classList.add("hidden");
        });

    document.getElementById("show-datepicker")
        .addEventListener("click", function () {
            dateInput.classList.remove("hidden");
            displayDate.classList.add("hidden");
        });

    document.getElementById("show-amount-input")
        .addEventListener("click", function () {
            amountInput.classList.remove("hidden");
            displayAmount.classList.add("hidden");
        });
document.addEventListener("DOMContentLoaded", function () {
    const billInput = document.getElementById("bill");
    const tipButtons = document.querySelectorAll(".tip-btn");
    const customTipInput = document.getElementById("custom-tip");
    const peopleInput = document.getElementById("people");
    const tipAmountDisplay = document.getElementById("tip-amount");
    const totalAmountDisplay = document.getElementById("total-amount");
    const resetBtn = document.getElementById("reset-btn");

    let bill = 0;
    let tipPercentage = 0;
    let people = 1;

    function clearActiveState() {
        tipButtons.forEach(button => {
            button.classList.remove("active");
        });
    }

    tipButtons.forEach(button => {
        button.addEventListener("click", function () {
            clearActiveState();
            this.classList.add("active");
            tipPercentage = parseFloat(this.dataset.tip);
            customTipInput.value = ''; 
            calculateTip();
        });
    });

    customTipInput.addEventListener("input", function () {
        clearActiveState(); 
        tipPercentage = parseFloat(customTipInput.value);
        calculateTip();
    });

    billInput.addEventListener("input", function () {
        bill = parseFloat(billInput.value);
        calculateTip();
    });

    peopleInput.addEventListener("input", function () {
        people = parseFloat(peopleInput.value) || 1; 
        calculateTip();
    });

    function calculateTip() {
        if (bill > 0 && tipPercentage > 0 && people > 0) {
            const tipAmount = (bill * (tipPercentage / 100)) / people;
            const totalAmount = (bill + bill * (tipPercentage / 100)) / people;

            tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
            totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
        }
    }

    resetBtn.addEventListener("click", function () {
        billInput.value = '';
        customTipInput.value = '';
        peopleInput.value = '';
        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
        clearActiveState();
        tipPercentage = 0;
        bill = 0;
        people = 1;
    });
});

const mainContainer = document.querySelector("#main-container");
const allButtons = mainContainer.querySelectorAll("div > button");

const displayResult = document.querySelector("#display-result")

allButtons.forEach((button) => {
    button.addEventListener("click", () => {
        displayResult.textContent += button.textContent;
    })
})
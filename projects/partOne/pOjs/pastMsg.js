const formInput = document.querySelector("#formInput");
const btn = document.querySelector("#btnSubmit");
const form = document.querySelector("#msg");
const output = document.querySelector("#outPut");
const elseValue = document.querySelector(".elseValue")



form.addEventListener("submit", function (e) {
    e.preventDefault();
});


const addMsg = () => {
    const userIpt = formInput.value;

    if (formInput.value === "") {
        output.classList.add("show")
        setTimeout(function () {
            output.classList.remove("show")
        }, 2000)
    } else {
        elseValue.textContent = formInput.value
        formInput.vlaue = ""
    }

}
const formInput = document.querySelector("#formInput");
const btn = document.querySelector("#btnSubmit");
const form = document.querySelector("#msg");
const output = document.querySelector("#outPut");
const elseValue = document.querySelector(".elseValue")



btn.addEventListener("click", addMsg());


const addMsg = (e) =>{
    e.preventDefaulft();
    const userIpt = formInput.value;

    if (formInput.value === ""){
        output.classList.add("show")
        setTimeout(fucniton(){
            output.classList.remove("show")
        }, 2000)
    } else {
        elseValue.textContent = formInput.value
        formInput.vlaue = "";
    }

}
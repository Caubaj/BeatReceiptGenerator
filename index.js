// const element = document.getElementById("bill-container");
// const inputContainer = document.getElementById("input-container");
// let interval = setInterval(()=> {
//     let height = window.getComputedStyle(element).height;
//     inputContainer.style.height = height;
// }, 1000);
// const manager = document.getElementById("manager-name");
// const managerInput = document.getElementById("manager-input");
// const address = document.getElementById("address-name");
// const addressInput = document.getElementById("address-input");
// const address = document.getElementById("address-name");
// const addressInput = document.getElementById("address-input");


let userInputs = document.querySelectorAll("[id$='-input']");
let userLabels = document.querySelectorAll("[id$='-name']");
let beatInputs = document.querySelectorAll("[id$='-price']");
let beatLabel = document.querySelectorAll("[id$='-label']");
let checkBoxes = document.querySelectorAll(`input[type="checkbox"]`);
let purchases = document.getElementById("purchases")
let beatsDiv = purchases.querySelectorAll('.beat');
const subTotal = document.getElementById("sub-total");
const taxDisplay = document.getElementById("tax-display");
const taxInput = document.getElementById("tax-in");
const finalTotal = document.getElementById("final-total");
const dateDisplay = document.getElementById("date-number");
const currentDate = new Date();
const billContainer = document.getElementById("bill-container");
billContainer.style.display ="none"
let total = 0;
let taxx = 0;

function display()
{
    total = 0;
    
    userInputs.forEach((input, index)=>
    {
        if(input.value === "")
        {
            userLabels[index].textContent = "No input"
        }
        else{
            userLabels[index].textContent = input.value;
        }
    });

    checkBoxes.forEach((check, index)=>
    {
        if(check.checked && beatInputs[index].value !== "")
        {
            document.getElementById("purchases").append(beatsDiv[index]);
            beatLabel[index].textContent = `$${parseFloat(beatInputs[index].value).toFixed(2)}`;
            subTotal.textContent = `$${subTotalFunc(Number(beatInputs[index].value))}`;
        }
        else{    
           try
           {
                if(beatsDiv[index])
                {
                    purchases.removeChild(beatsDiv[index]);
                }
                else{
                    console.error(`Element at index ${index} does not exist.`);
                }
            }
           catch(error)
           {
            console.error('Error Removing Element', error);
           }
        }
    });

    dateDisplay.textContent = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;

    taxDisplay.textContent = `${(Number(taxInput.value))}%`;
   
    addTax(Number(taxInput.value));
    finalTotal.textContent = `$${total.toFixed(2)}`;
   
    JsBarcode(".barcode") .init();
    billContainer.style.display ="flex"
}

function subTotalFunc(price){
    total += price;
    return total.toFixed(2);
}   

function addTax(tax)
{
    total = total + total*(tax / 100);
}



import "/style/main.less";
import * as Model from "./model";
import init from "./radioPrograms";

import * as noUiSlider from 'nouislider';

import 'nouislider/dist/nouislider.css';

const data: object = Model.getData()
// функция принимает ставку чекбокса
function updateResultsView(results: Model.IResults): void {
  document.querySelector("#total-percent").innerHTML = results.rate * 100 + "%";
}
//функция стоимости недвижимости
function costInput(results: Model.IResults): void {

 
  const input: any = document.querySelector("#input-cost");
  const input_: any = document.querySelector("#input-downpayment");
  input.value = results.cost
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });
  input.addEventListener('change', function() {

      if (this.value < 350000) {
        this.value = 350000
        input_.value = 52500
      }
      if (this.value > 100000000) {
        this.value = 100000000
        input_.value = 15000000
      }
    
    
   
    this.value * 0.9 > input_.value ? input_.value = this.value * 0.9 : input_.value
    this.value * 0.15 < input_.value ? input_.value = this.value * 0.15 : input_.value
    results.firstPayment = input_.value
    results.cost = this.value;
    
    sum(results)
    payment(results)
    overpay(results)
  })
}
// //функция первоначального взноса
function firstpayment(results: Model.IResults): void {
  
  const input: any = document.querySelector("#input-downpayment");
  input.value > results.cost * 0.9 ? input.value = results.cost * 0.9 : input.value; 
  input.value < results.cost * 0.15 ? input.value = results.cost * 0.15 : input.value; 
  // results.firstPayment = input.value;
  input.value = results.firstPayment
  if (results.rate === 0.12) {
    
    input.value = 0
    results.firstPayment = 0
    console.log(results.firstPayment)
  }
  // results.firstPayment = input.value;
  input.value = results.firstPayment
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });
  input.addEventListener('change', function() {
    this.value > results.cost * 0.9 ? this.value = results.cost * 0.9 : this.value;
    this.value < results.cost * 0.15 ? this.value = results.cost * 0.15 : this.value;
    console.log(results.rate)
    if (results.rate === 0.12) {
      input.value = 0
      results.firstPayment = 0
    } else {
      results.firstPayment = input.value;
    }
    sum(results)
    payment(results)
    overpay(results)
  })
}
//Сумма кредита
function sum(results: Model.IResults): void {
  const total: HTMLElement = document.querySelector("#total-cost");
  results.sum = results.cost - results.firstPayment
  total.innerHTML = results.sum + ' ₽ '
}

//Ежемесячный платеж
function payment(results: Model.IResults):  void {
  const input: any = document.querySelector('#input-term')
  const show_payment: HTMLInputElement = document.querySelector('#total-month-payment')
  
  input.value = results.term
  let a = (results.rate * 100) / 12 / 100
  let b = results.sum
  let c = (1 + a) ** (results.term * 12)
  results.payment = (b * a * c / (c - 1)).toFixed(0)
  show_payment.innerHTML = `${results.payment} ₽ `
  input.addEventListener('change', function() {
    this.value > 30 || this.value < 1 ? this.value = 1 : this.value
    results.term = this.value
    let a = (results.rate * 100) / 12 / 100
    let b = results.sum
    let c = (1 + a) ** (results.term * 12)
    results.payment = (b * a * c / (c - 1)).toFixed(0)
    show_payment.innerHTML = `${results.payment} ₽ `
    overpay(results)
  })
}
//  переплата
function overpay(results: Model.IResults): void {
  const values = document.querySelector('#total-overpayment')
  let pereplata =  results.payment * (results.term * 12) - results.sum
  results.overpay = pereplata
  values.innerHTML = `${pereplata.toFixed(0)} ₽ `
  
} 


//window.onload
window.onload = function (): void {



  const base_value: HTMLInputElement = document.querySelector("#base-value");
  base_value.checked = true
  let results = Model.getResults();
  const getData = Model.getData


  const slider_cost: any = document.querySelector('#slider-cost');
  const slider_downpayment: any = document.querySelector('#slider-downpayment')
  const slider_term: any = document.querySelector('#slider-term')

  noUiSlider.create(slider_cost, {
   start: results.cost,
   connect: 'lower',
   step: 100000,
   range: {
       'min': [375000],
       '1%': [400000, 100000],
       '50%': [10000000,500000],
       'max': [100000000]
   },
 });
 slider_cost.noUiSlider.on('slide', () => {
  let sliderValue = slider_cost.noUiSlider.get()
  results.cost = sliderValue.split('.')[0]
  results.firstPayment = results.cost * slider_downpayment.noUiSlider.get() / 100

  init(getData)
  costInput(results)
  firstpayment(results)
  sum(results)
  payment(results)
  overpay(results)
})

 noUiSlider.create(slider_downpayment, {
    start: 15,
    connect: 'lower',
    step: 1,
    range: {
       'min': [15],
       'max': [90]
   },
 })
 slider_downpayment.noUiSlider.on('slide', () => {
  let downValue = slider_downpayment.noUiSlider.get()
  results.firstPayment = Math.ceil(+downValue / 100 * results.cost)
  
  firstpayment(results)
  updateResultsView(results);
  init(getData)
  costInput(results)
  sum(results)
  payment(results)
  overpay(results)

 })
 
 noUiSlider.create(slider_term, {
  start: 1,
  connect: 'lower',
  step: 1,
  range: {
      'min': [1],
      'max': [30]
  },
});
slider_term.noUiSlider.on('slide', () => {
 let sliderValue = slider_term.noUiSlider.get()
 results.term = sliderValue.split('.')[0]


 init(getData)
 costInput(results)
 firstpayment(results)
 sum(results)
 payment(results)
 overpay(results)
})




  updateResultsView(results);
  init(getData)
  costInput(results)
  firstpayment(results)
  sum(results)
  payment(results)
  overpay(results)
  //handler, диспатч
  document.addEventListener("updateForm", (e: any) => {
    Model.setData(e.detail);
    const data = Model.getData()
    const results = Model.getResults()
    costInput(results)
    firstpayment(results)
    sum(results)
    payment(results)
    overpay(results)
    updateResultsView(results)
    

    if (results.rate === 0.12) {
      const from = document.querySelector("#percents-from");
      from.innerHTML = "0%";
    } else {
      const from = document.querySelector("#percents-from");
      from.innerHTML = "15%";
    }
  });
};

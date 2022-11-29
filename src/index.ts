import "/style/main.less";
import * as Model from "./model";
import init from "./radioPrograms";
import { convertTypeAcquisitionFromJson, isThisTypeNode, setCommentRange, TypeFormatFlags } from "typescript";

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
  results.firstPayment = input.value;
  if (results.rate === 0.12) {
    input.value = 0
    results.firstPayment = 0
  }
  results.firstPayment = input.value;
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "");
  });
  input.addEventListener('change', function() {
    this.value > results.cost * 0.9 ? this.value = results.cost * 0.9 : this.value;
    this.value < results.cost * 0.15 ? this.value = results.cost * 0.15 : this.value;
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
  total.innerHTML = results.sum + ' ¤'
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
  show_payment.innerHTML = `${results.payment} ¤`
  input.addEventListener('change', function() {
    this.value > 30 || this.value < 1 ? this.value = 1 : this.value
    results.term = this.value
    let a = (results.rate * 100) / 12 / 100
    let b = results.sum
    let c = (1 + a) ** (results.term * 12)
    results.payment = (b * a * c / (c - 1)).toFixed(0)
    show_payment.innerHTML = `${results.payment} ¤`
    overpay(results)
  })
}
//  переплата
function overpay(results: Model.IResults): void {
  const values = document.querySelector('#total-overpayment')
  let pereplata =  results.payment * (results.term * 12) - results.sum
  results.overpay = pereplata
  values.innerHTML = `${pereplata.toFixed(0)} ¤`
  
} 


//window.onload
window.onload = function (): void {
  const base_value: HTMLInputElement = document.querySelector("#base-value");
  base_value.checked = true
  let results = Model.getResults();
  const getData = Model.getData
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

  //Отправка формы

  const openForm: HTMLInputElement = document.querySelector('#openFormBtn')
  const orderForm: any = document.querySelector('#orderForm')
  const submitForm: any = document.querySelector('#submitFormBtn')


  openForm.addEventListener('click', () => {
    orderForm.classList.toggle('none')
  })
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(orderForm)
    submitForm.setAttribute('disabled', true)
    submitForm.innerHTML = 'Отправка...'

    orderForm.querySelectorAll('input').forEach(x => x.setAttribute('disabled', true));
    
    fetchData()
    async function fetchData() {

      const results: Model.IResults | any = Model.getResults()

      let url = document.location.href

      const response = await fetch(url + 'mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'aplication/json;charset=utf-8',
        },
        body: JSON.stringify({
          form: {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone')
          }
        }, results)
      })

      const api = await response.text()
      submitForm.removeAttribute('disabled', true)
      submitForm.innerHTML = 'Оформить заявку'
      orderForm.querySelectorAll('input').forEach(x => x.removeAttribute('disabled', true));
      orderForm.reset()
      orderForm.classList.add('none')


      if (api === 'SUCCES') {
        document.getElementById('succes').classList.remove('none')
      } else {
        document.getElementById('error').classList.remove('none')
      }
    }
  })
};

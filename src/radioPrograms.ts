import { setData } from "./model";


function init(getData) {
  type Input = HTMLInputElement | null;

  //получаем процентную ставку
  const { base, it, gov, zero } = getData().programs;

  //прописываем процентную ставку
  const base_value: Input = document.querySelector("#base-value");
  if (base_value) {
    base_value.value = base;
  }
  const it_value: Input = document.querySelector("#it-value");
  if (it_value) {
    it_value.value = it;
  }
  const gov_value: Input = document.querySelector("#gov-value");
  if (gov_value) {
    gov_value.value = gov;
  }
  const zero_value: Input = document.querySelector("#zero-value");
  if (zero_value) {
    zero_value.value = zero;
  }
  //Выводим значения
  const base_text: Input = document.querySelector("#base-text");
  if (base_text) {
    base_text.innerText = base * 100 + "%";
  }
  const it_text: Input = document.querySelector("#it-text");
  if (it_text) {
    it_text.innerHTML = it * 100 + "%";
  }
  const gov_text: Input = document.querySelector("#gov-text");
  if (gov_text) {
    gov_text.innerHTML = gov * 100 + "%";
  }
  const zero_text: Input = document.querySelector("#zero-text");
  if (zero_text) {
    zero_text.innerHTML = zero * 100 + "%";
  }

  //Процентная ставка при загрузке (исправляем баг)
  const total_percent: Input = document.querySelector("#total-percent");
  total_percent.innerHTML = getData().selectedProgram * 100 + "%";

  //выбор программы по процентной ставке
  const radioBtns = document.querySelectorAll('input[name="program"]');
  radioBtns.forEach((x) => {
    x.addEventListener("change", function () {
      
      //!!!
      this.dispatchEvent(
        new CustomEvent("updateForm", {
          bubbles: true, // Глобал
          detail: {
            // пользовательские данные
            selectedProgram: parseFloat(this.value),
            onUpdate: "radioProgram",
            id: this.id,
          },
        })
        
      );
    });
  });
}

export default init;

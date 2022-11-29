export interface IData {
  selectedProgram: number;
  programs: {
    base: number;
    it: number;
    gov: number;
    zero: number;
  };
}
export interface IResults {
    rate: number;
    cost: number;
    firstPayment: number;
    sum: number;
    term: number;
    payment: number | any;
    overpay: number;
}

let data: IData = {
  selectedProgram: 0.1,
  programs: {
    base: 0.1,
    it: 0.05,
    gov: 0.06,
    zero: 0.12,
  },
};
//значение чекбокса
let results: IResults = {
  rate: data.selectedProgram,
  cost: 5000000,
  firstPayment: 750000,
  sum: 4250000,
  term: 1,
  payment: 0,
  overpay: 0
};
// получаем объект
const getData = (): object => {
  return { ...data };
};
// получаем значение чекбокса
const getResults = (): IResults =>  {
  return { ...results };
};
// Обновляем объект data новыми данными
const setData = (newData: object): void => {
  data = {
    ...data,
    ...newData,
  };
  results = {
    rate: data.selectedProgram,
    cost: 5000000,
    firstPayment: 750000,
    sum: 4250000,
    term: 1,
    payment: 0,
    overpay: 0
  };
};

export { getData, setData, getResults };

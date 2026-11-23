export default class kernelModeCore{

#item =[
{productId: 1, stocks: 20, price:10},
{productId:2, stocks:35, price:20},
{productId:3, stocks:10, price:30}
];

#process =[];

  productInfo(){
    return this.#item;
  }

  pushProcess(processObj) {
    this.#process.push(processObj);
  }

 deductStock(productId, qty) {
    const target = this.#item.find(item => item.productId === Number(productId));
    if (target && target.stocks >= Number(qty)) {
        target.stocks -= qty;
    }

}
}
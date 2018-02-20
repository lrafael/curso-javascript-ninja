(function(win, doc){
    /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */

  let visor = doc.querySelector('[data-js="visor"]');
  let buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
  let buttonCE = doc.querySelector('[data-js="button-ce"]');
  let buttonsOperations = doc.querySelectorAll('[data-js="button-operation"]');
  let buttonEqual = doc.querySelector('[data-js="button-equal"]');

  Array.prototype.forEach.call(buttonsNumbers, function(button){
    button.addEventListener('click', handleClickNumber, false);
  });
  Array.prototype.forEach.call(buttonsOperations, function(button){
    button.addEventListener('click', handleClickOperations, false);
  });
  buttonCE.addEventListener('click', handleClickCE, false);
    buttonEqual.addEventListener('click', handleClickEqual, false);

  function handleClickNumber(){
    visor.value += this.value;
  };

  function handleClickCE(){
    visor.value = 0;
  };

  function handleClickOperations(){
    removeLastItemIfItIsAnOperator();
    visor.value += this.value;
  };

  function handleClickEqual(){
    let regex = /[+\-*/]/g;
    removeLastItemIfItIsAnOperator();
    let allValues = visor.value.match(/(?:\d+)|[/*\-+]/g);
    //console.log(visor.value.split(/[+\-*/]/));
    //console.log(allValues.some(arrVal => regex.test(allValues)));
    Array.prototype.forEach.call(buttonsOperations, function(buttonOperation){
      while(allValues.some(arrVal => buttonOperation.value === arrVal)){
        let opIndex = allValues.indexOf(buttonOperation.value);
        let result = doOperation(allValues[opIndex-1], allValues[opIndex], allValues[opIndex+1]);
        console.log(allValues[opIndex-1] + buttonOperation.value +  allValues[opIndex+1]);
        console.log(result);
        console.log(allValues);
        allValues.splice(opIndex-1, 3, result);
        console.log(allValues);
      }
    });
    visor.value = allValues[0];
    // while(allValues.some(arrVal => regex.test(allValues))
    // {
    //   allValues.indexOf()
    // }
  };

  function doOperation(a, op, b){
    switch (op) {
      case '+':
        return Number(a) + Number(b);
      case '-':
        return Number(a) - Number(b);
      case '/':
        return Number(a) / Number(b);
      case '*':
        return Number(a) * Number(b);
    }
  };

  function removeLastItemIfItIsAnOperator(){
    let regex = /[+\-*/]$/g;
    if(regex.test(visor.value))
      visor.value = visor.value.slice(0, -1)
  };


})(window, document);

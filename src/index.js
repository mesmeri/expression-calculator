function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.trim().split('').filter(el => el !== ' ');
    let infix = [];
    let temp = '';

 /* Соединяем разбитые числа */
    for (let i = 0; i < expr.length; i++) {
        if (!isNaN(expr[i])) {
            (i === expr.length - 1) ? infix.push(temp += expr[i]) : temp += expr[i];
        } else {
            if (temp !== '') {
                infix.push(temp);
                temp = ''; 
                };
            infix.push(expr[i]);
        } 
    }

/* Приоритеты операторов */
    let priority = {
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1,
    };

/* Функции операторов */
    let operations = {
        '*': (a, b) => a * b,
        '/': (a, b) => {
                try {
                    res = a / b;
                    if (b === 0) {
                        throw 'TypeError: Division by zero.';
                    };
                } catch (e) {
                    throw (e);
                }
                return res;
            },
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    };

/* Конвертирование в постфиксную запись */
    let output = [];
    let transition = [];

    for (char of infix)  {
        switch (char) {

            case ')' :
              for (let i = transition.length - 1; i >= 0; i--) {
                  try {
                      if (transition[i] === '(') {
                         transition.pop();
                         break;
                       } else if (i === 0) {
                         throw 'ExpressionError: Brackets must be paired';
                       } else {
                         output.push(transition.pop());
                       }
                       
                   } catch (e) {
                       throw (e);
                   }            
                }
              break;

            case '(' :
                transition.push(char);
                break;
            case '*' :
            case '/' :
            case '-' :
            case '+' :
              let lastChar = transition[transition.length - 1];
              if (lastChar == '(') {
                  transition.push(char);
                  break;
              }
              let lastCharLevel = priority[lastChar];
              let charLevel = priority[char];
              if (charLevel <= lastCharLevel) {
                        while (lastChar !== '(' && charLevel <= lastCharLevel) {
                            output.push(transition.pop());
                            lastChar = transition[transition.length - 1];
                            lastCharLevel = priority[lastChar];
                        }
                        transition.push(char);
                 } else {
                     transition.push(char);
                 }
              break;
              
            default : 
              output.push(parseInt(char));
        }
    }
    
    let postfix = output.concat(transition.reverse());   
    try {
        if ((postfix.includes(')')) ||
            (postfix.includes('('))) {
                throw 'ExpressionError: Brackets must be paired';
        }
    } catch (e) {
        throw (e);
    }
    
/* Вычисление результата */
    let result = [];

    for (char of postfix) {
        if (typeof char === 'number') {
            result.push(char);
        } else {
            let b = result.pop();
            let a = result.pop();
            result.push(operations[char](a, b));
        }
    }

    return result[0];
}


module.exports = {
    expressionCalculator
}
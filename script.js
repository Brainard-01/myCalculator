

let display = document.getElementById('display');
var resultStatus = false

function displayInput(button) {

    let inputValue = button.value;

    if (resultStatus === true) {
        display.value = inputValue
        resultStatus = false
    }

    else {
        display.value += inputValue;
    }
    
}

function displayOperaator(button){
    let inputValue = button.value;
    let lastChar = display.value.slice(-1);

    if (["sin", "cos", "tan"].includes(inputValue)) {
        if (display.value !== "" && !isNaN(lastChar) && lastChar !== "") {
            display.value += "*";
        }
        display.value += inputValue + "(";
        resultStatus = false
    }
    
    else {
        display.value += inputValue;
        resultStatus = false;
    }

}




function evaluating() {

    let expression = display.value;

    try {
        // Function to evaluate trigonometric expressions
        const evaluateTrig = (expr, func) => {
            let innerExpression = expr.match(new RegExp(`${func}\\(([^)]+)\\)`));

            if (!innerExpression) throw "Invalid input";
            let evaluatedInnerExpression = eval(innerExpression[1]);

            if (isNaN(evaluatedInnerExpression)) throw "Invalid input";
            switch (func) {
                case "sin":
                    return Math.sin(evaluatedInnerExpression * (Math.PI / 180));
                case "cos":
                    return Math.cos(evaluatedInnerExpression * (Math.PI / 180));
                case "tan":
                    return Math.tan(evaluatedInnerExpression * (Math.PI / 180));
                default:
                    throw "Invalid function";
            }

        };
        let openParentheses = (expression.match(/\(/g) || []).length;
        let closeParentheses = (expression.match(/\)/g) || []).length;
        while (openParentheses > closeParentheses) {
            expression += ")";
            closeParentheses++;
        }

        // Replacing and evaluating trigonometric expressions in the main expression
        let result = expression;

        if (expression.includes("sin(")) {
            result = result.replace(/sin\([^)]+\)/g, match => evaluateTrig(match, "sin"));
        }
        if (expression.includes("cos(")) {
            result = result.replace(/cos\([^)]+\)/g, match => evaluateTrig(match, "cos"));
        }
        if (expression.includes("tan(")) {
            result = result.replace(/tan\([^)]+\)/g, match => evaluateTrig(match, "tan"));
        }

        // Evaluating the final expression

        result = eval(result);
        
        if (display.value === "") {
            display.value = 0;
            // alert("Hello world")
        } else {
            display.value = result;
            resultStatus = true;
        }

        } catch (error) {
            display.value = 'Error';
            resultStatus = true
            }
}

function clearDisplay() {
    display.value = '';
}

function d() {
    // display.value = display.value.slice(0,-1);
    if (display.value.endsWith("sin(")) {
        display.value = display.value.slice(0, -4);
    } else if (display.value.endsWith("cos(")) {
        display.value = display.value.slice(0, -4);
    } else if (display.value.endsWith("tan(")) {
        display.value = display.value.slice(0, -4);
    } else if (display.value.endsWith("Error")) {
        display.value = display.value.slice(0, -5);
    } else {
        display.value = display.value.slice(0, -1);
    }
}


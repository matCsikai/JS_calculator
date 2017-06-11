// Get all the buttons from document
var buttons = document.querySelectorAll('#calculator span'); // Get all elements in the document with id = calculator tag = span ?
var operators = ['+', '-', 'x', '/'];
var decimalAdded = false; // ???"We can solve it easily using a flag 'decimalAdded' which we'll set once the decimal is added and prevent more decimals to be added once it's set. "

// Add onclick event to all the buttons and perform operations
for(var i = 0; i < buttons.length; i++) {
	buttons[i].onclick = function(calculation) {
		// Get the input and button values
		var input = document.querySelector('.display');
		var inputValue = input.innerHTML;
		var buttonValue = this.innerHTML;
		
		// Now, just append the key values (buttonValue) to the input string and finally use javascript's eval function to get the equation
		// If clear key is pressed, erase everything
		if(buttonValue == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}
		
		// If eval key is pressed, calculate and display the equation
		else if(buttonValue == '=') {
			var equation = inputValue;
			var lastChar = equation[equation.length - 1];
			
			
			// Final thing left to do is checking the last character of the equation. If it's an operator or a decimal, remove it
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
			
			if(equation)
				input.innerHTML = eval(equation);
				
			decimalAdded = false;
		}
		
		// Basic functionality of the calculator is complete. But there are some problems like 
		// 1. No two operators should be added consecutively.
		// 2. The equation shouldn't start from an operator except minus
		// 3. not more than 1 decimal should be there in a number
		
		// We'll fix these issues using some simple checks
		
		// indexOf works only in IE9+
		else if(operators.indexOf(buttonValue) > -1) {
			// Operator is clicked
			// Get the last character from the equation
			var lastChar = inputValue[inputValue.length - 1];
			
			// Only add operator if input is not empty and there is no operator at the last
			if(inputValue != '' && operators.indexOf(lastChar) == -1) 
				input.innerHTML += buttonValue;
			
			// Allow minus if the string is empty
			else if(inputValue == '' && buttonValue == '-') 
				input.innerHTML += buttonValue;
			
			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputValue.length > 1) {
				// Here, '.' matches any character while $ denotes the end of string, so anything (will be an operator in this case) at the end of string will get replaced by new operator
				input.innerHTML = inputValue.replace(/.$/, buttonValue);
			}
			
			decimalAdded =false;
		}
		
		// Now only the decimal problem is left. We can solve it easily using a flag 'decimalAdded' which we'll set once the decimal is added and prevent more decimals to be added once it's set. It will be reset when an operator, eval or clear key is pressed.
		else if(buttonValue == '.') {
			if(!decimalAdded) {
				input.innerHTML += buttonValue;
				decimalAdded = true;
			}
		}
		
		// if any other key is pressed, just append it
		else {
			input.innerHTML += buttonValue;
		}
		
		// prevent page jumps
		calculation.preventDefault();
	} 
}

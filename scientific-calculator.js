
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '.') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        if(this.previousOperand === '%'){
            this.compute2()
        }
        this.operation=operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }



    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case 'x':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          case 'x^y':
                computation = Math.pow(prev, current)
                break    
       
          default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
      }




      compute2() {
        let computation2
        const prev2 = parseFloat(this.previousOperand)
        if (isNaN(prev2)) return
        switch (this.operation) {
          case '%':
            computation2 = prev2 / 100 
            break
          case 'x²':
            computation2 = prev2* prev2 
            break
          case '√':
            computation2 = Math.sqrt(prev2) 
            break
          case '1/x':
            computation2 = 1/ prev2 
            break
          case 'log10':
            computation2 = Math.log10(prev2)
            break

          case '|x|':
                computation2 = Math.abs(prev2)
                break    
          case '10^x':
                computation2 = Math.pow(10,prev2)
                break 

            
    
          
          default:
            return
        }
        this.currentOperand = computation2
        this.operation = undefined
        this.previousOperand = ''
      }
    

      getDisplayNumber(number){
          const numberString = number.toString()
          const integerDigits = parseFloat(numberString.split('.')[0])
          const decimalDigits = numberString.split('.')[1]
          let integerDisplay

          if(isNaN(integerDigits)){
              integerDisplay = ''
          }else{
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
          if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
          } else {
          return integerDisplay
        }
      }

      updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          if(this.operation === '+'|| this.operation === '-' || this.operation === 'x' || this.operation === '÷' ){
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
          }else{
     
              if(this.operation === '1/x'){
                this.previousOperandTextElement.innerText =
                `${'1/(' + this.previousOperand }`
              }else if(this.operation === '%'){
                this.previousOperandTextElement.innerText =
                `${this.previousOperand + '%'}`
      
              } else if(this.operation === 'x²'){
                this.previousOperandTextElement.innerText =
                `${'sqrt(' + this.previousOperand + ')'}`
              } else if(this.operation === '√'){
                this.previousOperandTextElement.innerText =
                `${'√(' + this.previousOperand + ')'}`
              } else if(this.operation === 'log10'){
                this.previousOperandTextElement.innerText =
                `${'log(' + this.previousOperand + ')'  }`
              }else if(this.operation === '|x|'){
                this.previousOperandTextElement.innerText =
                `${'abs(' + this.previousOperand + ')'  }`
              }else if(this.operation === 'x^y'){
                this.previousOperandTextElement.innerText =
                `${ this.previousOperand +'^'  }`
              }else if(this.operation === '10^x'){
                this.previousOperandTextElement.innerText =
                `${ '10 ^ (' + this.previousOperand +')'  }`
              }
              
          }
        } else {
          this.previousOperandTextElement.innerText = ''
        }
      }
    }






    const numberButtons = document.querySelectorAll('[data-number]')
    const operationButtons = document.querySelectorAll('[data-operation]')
    const equalsButton = document.querySelector('[data-equals]')
    const deleteButton = document.querySelector('[data-delete]')
    const allClearButton = document.querySelector('[data-all-clear]')
    const previousOperandTextElement = document.querySelector('[data-previous-operand]')
    const currentOperandTextElement = document.querySelector('[data-current-operand]')
    
    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
    
    numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
      })
    })
    
    operationButtons.forEach(button => {
      button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
      })
    })
    
    equalsButton.addEventListener('click', button => {
      calculator.compute()
      calculator.compute2()

      calculator.updateDisplay()
    })
    
    allClearButton.addEventListener('click', button => {
      calculator.clear()
      calculator.updateDisplay()
    })
    
    deleteButton.addEventListener('click', button => {
      calculator.delete()
      calculator.updateDisplay()
    })
    














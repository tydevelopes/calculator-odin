## Simple Calculator app

## Odin calculator

## VARIABLES

- [x] leftOperand = “”
- [x] rightOperand = “”
- [x] Operator = “”
- [x] accumulator = “”
- [x] percentSignForLeftOperand = false
- [x] percentSignForRightOperand = false

## TOP LABEL DISPLAY

- {leftOperand if not empty} {percentSignForLeftOperand if true} {Operator if not empty} {rightOperand if not empty} {percentSignForRightOperand if true}

## FUNCTIONS

- [x] reset()
- [x] isFreshStart()
- [x] hasLeftOperandOnly()
- [x] removeLast(n) - // n.split('').slice(0, -1).join('')
- [x] hasLeftOperandAndOperatorOnly()
- [x] hasLeftOperandAndOperatorAndRightOperand()
- [x] toggleSign(operand)
- [x] operate(operator, leftOperand, rightOperand)
- [x] calcPercentage(operand)
- [x] displayTopLabels()
- [x] displayAnswer()

## HOW THE CALCULATOR WORKS

- [ ] When C is clicked
  - [ ] If isFreshStart()
    - [ ] return
  - [ ] reset()
- [ ] When CE is clicked
  - [ ] If isFreshStart()
    - [ ] return
  - [ ] If hasLeftOperandOnly()
    - [ ] If percentSignForLeftOperand
      - [ ] percentSignForLeftOperand = false
    - [ ] Else leftOperand = removeLast(leftOperand)
  - [ ] If hasLeftOperandAndOperatorOnly()
    - [ ] Operator = removeLast(operator)
  - [ ] If hasLeftOperandAndOperatorAndRightOperand()
    - [ ] If percentSignForRightOperand
      - [ ] percentSignForRightOperand = false
    - [ ] Else rightOperand = removeLast(rightOperand)
  - [ ] displayTopLabels()
  - [ ] displayAnswer()

## - [ ] When % is clicked

    - [ ] If isFreshStart()
        - [ ] return
    - [ ] If hasLeftOperandOnly()
        - [ ] If leftOperand.endsWith(“.”)
            - [ ] leftOperand = removeLast(leftOperand)
        - [ ] If percentSignForLeftOperand
            - [ ] return
        - [ ] percentSignForLeftOperand = true
    - [ ] If hasLeftOperandAndOperatorOnly()
        - [ ] return
    - [ ] If hasLeftOperandAndOperatorAndRightOperand()
        - [ ] If rightOperand.endsWith(“.”)
            - [ ] rightOperand = removeLast(rightOperand)
        - [ ] If percentSignForRightOperand
            - [ ] return
        - [ ] Accumulator = operate(operator, leftOperand, rightOperand)
        - [ ] leftOperand = accumulator
        - [ ] percentSignForLeftOperand = true
        - [ ] rightOperand = “”
        - [ ] Operator = “%”
    - [ ] displayTopLabels()
    - [ ] displayAnswer()

- [ ] When +/- is clicked
  - [ ] If isFreshStart()
    - [ ] return
  - [ ] If hasLeftOperandOnly()
    - [ ] If leftOperand.endsWith(“.”)
      - [ ] leftOperand = removeLast(leftOperand)
    - [ ] If percentSignForLeftOperand
      - [ ] leftOperand = calcPercentage(leftOperand)
      - [ ] percentSignForLeftOperand = false
    - [ ] leftOperand = toggleSign(leftOperand)
  - [ ] If hasLeftOperandAndOperatorOnly()
    - [ ] return
  - [ ] If hasLeftOperandAndOperatorAndRightOperand()
    - [ ] If rightOperand.endsWith(“.”)
      - [ ] rightOperand = removeLast(rightOperand)
    - [ ] If percentSignForRightOperand
      - [ ] rightOperand = calcPercentage(rightOperand)
      - [ ] percentSignForRightOperand = false
    - [ ] rightOperand = toggleSign(rightOperand)
  - [ ] displayTopLabels()
  - [ ] displayAnswer()
- [ ] When dot is clicked
  - [ ] If isFreshStart()
    - [ ] leftOperand = “0.”
  - [ ] If hasLeftOperandOnly()
    - [ ] If !leftOperand.includes(“.”)
      - [ ] leftOperand += “.”
  - [ ] If hasLeftOperandAndOperatorOnly()
    - [ ] rightOperand = “0.”
  - [ ] If hasLeftOperandAndOperatorAndRightOperand()
    - [ ] If !rightOperand.includes(“.”)
      - [ ] rightOperand += “.”
  - [ ] displayTopLabels()
  - [ ] displayAnswer()
- [ ] When = is clicked
  - [ ] If isFreshStart() or hasLeftOperandAndOperatorOnly()
    - [ ] return
  - [ ] If hasLeftOperandOnly()
    - [ ] If percentSignForLeftOperand
      - [ ] Accumulator = calcPercentage(leftOperand)
      - [ ] leftOperand = accumulator
      - [ ] percentSignForLeftOperand = false
    - [ ] Else return
  - [ ] If hasLeftOperandAndOperatorAndRightOperand()
    - [ ] If percentSignForRightOperand
      - [ ] rightOperand = calcPercentage(rightOperand)
      - [ ] percentSignForRightOperand = false
    - [ ] Accumulator = operate(operator, leftOperand, rightOperand)
    - [ ] leftOperand = accumulator
  - [ ] displayTopLabels()
  - [ ] displayAnswer()
  - [ ] When / or \* or - or + is clicked
  - [ ] If isFreshStart()
    - [ ] return
  - [ ] If hasLeftOperandOnly()
    - [ ] If leftOperand.endsWith(“.”)
      - [ ] leftOperand = removeLast(leftOperand)
    - [ ] If percentSignForLeftOperand
      - [ ] leftOperand = calcPercentage(leftOperand)
      - [ ] percentSignForLeftOperand = false
    - [ ] Operator = operator clicked
  - [ ] If hasLeftOperandAndOperatorOnly()
    - [ ] Operator = operator clicked
  - [ ] If hasLeftOperandAndOperatorAndRightOperand()
    - [ ] If rightOperand.endsWith(“.”)
      - [ ] rightOperand = removeLast(rightOperand)
    - [ ] If percentSignForRightOperand
      - [ ] rightOperand = calcPercentage(rightOperand)
      - [ ] percentSignForRightOperand = false
    - [ ] Accumulator = operate(operator, leftOperand, rightOperand)
    - [ ] leftOperand = accumulator
    - [ ] Operator = operator clicked
  - [ ] displayTopLabels()
  - [ ] displayAnswer()
  - [ ] When a digit is clicked
  - [ ] If isFreshStart()
    - [ ] leftOperand = digit clicked
  - [ ] If hasLeftOperandOnly()
    - [ ] If percentSignForLeftOperand
      - [ ] Accumulator = operate(operator, leftOperand, rightOperand) // calc modulus
      - [ ] leftOperand = accumulator
      - [ ] percentSignForLeftOperand = false
    - [ ] Else leftOperand += digit clicked
  - [ ] If hasLeftOperandAndOperatorOnly()
    - [ ] rightOperand = digit clicked
  - [ ] If hasLeftOperandAndOperatorAndRightOperand()
    - [ ] If percentSignForRightOperand
      - [ ] return
    - [ ] Else rightOperand += digit clicked
  - [ ] displayTopLabels()
  - [ ] displayAnswer()

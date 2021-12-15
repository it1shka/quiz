import React from 'react'
import './Question.css'

export default class Question extends React.Component {
  constructor(props) {
    super(props)

    this.q = this.props.question
    
    this.answers = this.q.incorrect_answers.map(e => ({
      answer: e, correct: false
    }))
    this.answers.push({answer: this.q.correct_answer, correct: true})
    this.answers.sort(() => 0.5 - Math.random())

    this.state = {
      answered: false
    }
  }

  render() {
    return (
      <li className='question'>
        <h2>{this.q.category}, {this.q.difficulty}</h2>
        <small>Type: {this.q.type}</small>
        <div className='main'>
          <p>{this.q.question}</p>
          <ul>
            {this.answers.map(({answer, correct}, i) => {
              return <Answer 
                key={i}
                answer={answer} 
                answered={this.state.answered} 
                correct={correct} 
                onClick={() => {
                  this.setState({ answered: true })
                  if(correct) this.props.onCorrect()
                  else this.props.onIncorrect()
                }} />
            })}
          </ul>
        </div>
      </li>
    )
  }
}

function Answer({answer, answered, correct, onClick}) {
  const $class = (() => {
    if(answered && correct) return 'answer-button--correct'
    if(answered && !correct) return 'answer-button--incorrect'
    return 'answer-button'
  })()

  return (
    <li>
      <button onClick={onClick} className={$class}>{answer}</button>
    </li>
  )
}
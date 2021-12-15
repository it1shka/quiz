import React from 'react'
import './Quiz.css'
import Question from './Question'

export default class Quiz extends React.Component {

  constructor(props) {
    super(props)
    console.log(this.props.quiz)

    const questions = this.props.quiz.results
    this.questions = questions

    this.state = {
      score: 0,
      mistakes: 0,
      left: questions.length
    }

    this.onCorrect = this.onCorrect.bind(this)
    this.onIncorrect = this.onIncorrect.bind(this)
  }

  onCorrect() {
    this.setState(prev => ({
      ...prev,
      score: prev.score + 1,
      left: prev.left - 1
    }))
  }

  onIncorrect() {
    this.setState(prev => ({
      ...prev,
      mistakes: prev.mistakes + 1,
      left: prev.left - 1
    }))
  }

  render() {
    if(this.state.left <= 0)
      return (
        <div className='quiz-container'>
          <h2>Your score is {this.state.score}/{this.questions.length} with {this.state.mistakes} mistakes</h2>
          <h2>Congrats!</h2>
          <button className='pretty-button' onClick={this.props.cancel}>Back to menu</button>
        </div>
      )

    return (
      <div className='quiz-container'>
        <h1>Quiz</h1>
        <h2>Total score: {this.state.score}/{this.questions.length}, {this.state.mistakes} mistakes, {this.state.left} are left</h2>
        <button className='pretty-button' onClick={this.props.cancel}>Back to menu</button>
        <hr />
        <ul>
          {this.questions.map((question, i) => {
            return <Question key={i} question={question} onCorrect={this.onCorrect} onIncorrect={this.onIncorrect}/>
          })}
        </ul>
      </div>
    )
  }
}
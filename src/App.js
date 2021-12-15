import React from 'react'
import ParamsForm from './components/ParamsForm'
import Quiz from './components/Quiz'

function makeApiUrl(amount, diff) {
  return `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${diff}`
}

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      quiz: null
    }

    this.submitQuizParams = this.submitQuizParams.bind(this)
    this.cancelQuiz = this.cancelQuiz.bind(this)
  }

  submitQuizParams(questions, difficulty) {
    const url = makeApiUrl(questions, difficulty)
    console.log(`Fetching: ${url}`)
    fetch(url)
      .then(res => res.json())
      .then(quizData => {
        this.setState({
          quiz: quizData
        })
      })
  }

  cancelQuiz() {
    this.setState({
      quiz: null
    })
  }

  render() {
    if(!this.state.quiz)
      return <ParamsForm submitQuizParams={this.submitQuizParams} />

    return <Quiz quiz={this.state.quiz} cancel={this.cancelQuiz}/>
  }
}
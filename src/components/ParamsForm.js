import React from 'react'
import './ParamsForm.css'

function DefaultState() {
  this.questions = 10
  this.difficulty = 'easy'
}

// props.submitQuizParams(questions, difficulty)
export default class ParamsForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = new DefaultState()
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
    this.handleQuestionsChange = this.handleQuestionsChange.bind(this)
    this.handleChooseParams = this.handleChooseParams.bind(this)
  }

  handleQuestionsChange(event) {
    const value = event.target.value
    this.setState(prev => ({
      ...prev, questions: value
    }))
  }

  handleDifficultyChange(event) {
    const value = event.target.value
    this.setState(prev => ({
      ...prev, difficulty: value
    }))
  }

  handleChooseParams(event) {
    event.preventDefault()
    this.props.submitQuizParams(this.state.questions, this.state.difficulty)
    // this.setState(new DefaultState())
  }

  render() {
    return (
      <div className='container'>
        <div className='double-container'>
          <h2>Take new quiz</h2>
          <form className='quiz-params' onSubmit={this.handleChooseParams}>
            <div>
              <label>Number of questions:</label>
              <input value={this.state.questions} onChange={this.handleQuestionsChange}type='number' />
            </div>
            <div>
              <label>Difficulty:</label>
              <select value={this.state.difficulty} onChange={this.handleDifficultyChange}>
                <option value='easy'>Easy</option>
                <option value='meduim'>Meduim</option>
                <option value='hard'>Hard</option>
              </select>
            </div>
            <button className='pretty-button'>Take!</button>
          </form>
        </div>
      </div>
    )
  }
}
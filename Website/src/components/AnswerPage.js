import React, { Component } from 'react';
import Timer from './timer';
import '../App.css';

class AnswerPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        question: '', // Initialize with an empty question.
        options: [], // Initialize with an empty array of options.
        timer: 10, // Set the initial timer value.
        goToNextQuestion: false //redirect flag
      };
    }
  
    componentDidMount() {
      // Fetch your random question from a database or API.
      // Update the state with the fetched question and options.
      this.fetchRandomQuestion();
    }
  
    fetchRandomQuestion = () => {
      // Implement your logic to fetch a random question and options.
      // Update the state with the question and options.
    };
  
    handleAnswerClick = (selectedOption) => {
      // Implement your logic to handle the selected answer.
    };
    handleTimerCompletion = () => {
      this.setState({  });
    };
  
    render() {
      const { question, options, timer } = this.state;
  
      return (
        <div className="answer-page">
          <div className="timer">
            <Timer initialTime={timer * 1000}  onCompletion={this.handleTimerCompletion}/> {10000}
          </div>
          <div className="logo">
            <img src="planet.png" alt="Logo" />
          </div>
          <div className="question">
            <h2>{question}</h2>
          </div>
          <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => this.handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }
  }
  
  export default AnswerPage;
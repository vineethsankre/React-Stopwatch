import React, { Component } from 'react'
import './index.css'

const initialState = {
  isRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 0,
}

class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearStopwatch()
  }

  clearStopwatch = () => clearInterval(this.intervalId)

  onResetStopWatch = () => {
    this.clearStopwatch()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const { timerLimitInMinutes, timeElapsedInSeconds } = this.state
    this.setState((prevState) => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onClickStart = () => {
    const { isRunning } = this.state
    if (!isRunning) {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
      this.setState({ isRunning: true })
    }
  }
  onClickStop = () => {
    const { isRunning } = this.state
    if (isRunning) {
      clearInterval(this.intervalId)
      this.setState({ isRunning: false })
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const { timerLimitInMinutes, timeElapsedInSeconds } = this.state
    const totalRemainingSeconds = timerLimitInMinutes * 60 + timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    return (
      <div className="app-container">
        <div className="stopwatch-app-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="stopwatch-container">
            <div className="timer-text-container">
              <img
                className="timer-image"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="timer-text">Timer</p>
            </div>
            <h1 className="stopwatch-display">{this.getElapsedSecondsInTimeFormat()}</h1>
            <div className="stopwatch-controls-container">
              <button className="button start-btn" type="button" onClick={this.onClickStart}>
                Start
              </button>
              <button className="button stop-btn" type="button" onClick={this.onClickStop}>
                Stop
              </button>
              <button className="button reset-btn" type="button" onClick={this.onResetStopWatch}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch


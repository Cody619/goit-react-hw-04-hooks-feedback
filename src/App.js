import './App.css'
import { Component, useMemo, useState } from 'react'
import { Statistics } from './components/Statistics.js'
import { FeedbackOptions } from './components/FeedbackOptions.js'
import { Section } from './components/Section.js'
import { Notification } from './components/Notification.js'

export const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodIncrement = () => setGood((good) => good + 1)
  const handleNeutralIncrement = () => setNeutral((neutral) => neutral + 1)
  const handleBadIncrement = () => setBad((bad) => bad + 1)

  const handleIncrement = (name) => {
    switch (name) {
      case 'good':
        handleGoodIncrement()
        break
      case 'neutral':
        handleNeutralIncrement()
        break
      case 'bad':
        handleBadIncrement()
        break
    }
  }

  const total = useMemo(() => {
    return good + neutral + bad
  }, [good, neutral, bad])

  const positivePercentage = useMemo(() => {
    return Math.round((good / total) * 100)
  }, [good, total])

  return (
    <div>
      <Section title="Please Leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleIncrement}
        />
      </Section>

      <Section title="Statistics">
        {total === 0 ? (
          <Notification message={'No feedback given'} />
        ) : (
          <Statistics
            total={total}
            positivePercentage={positivePercentage}
            good={good}
            neutral={neutral}
            bad={bad}
          />
        )}
      </Section>
    </div>
  )
}

import { useState } from 'react';
//
import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';
//

export const App = () => {
  const [votes, setVotes] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const { good, neutral, bad } = votes;

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    if (total) {
      return Math.round((good * 100) / total);
    } else {
      return 0;
    }
  };

  const feedbackHandler = option => {
    setVotes(prevVotes => {
      return {
        ...prevVotes,
        [option]: prevVotes[option] + 1,
      };
    });
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(votes)}
          onLeaveFeedback={feedbackHandler}
        />
      </Section>

      {countTotalFeedback() ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </>
  );
};

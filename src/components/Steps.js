import React from 'react';
import styles from './Steps.scss';

const Steps = ({ complete, step, steps }) => {
  const className = `${styles.steps} ${complete ? styles.complete : ''}`;
  return (
    <ol className={className}>
      {steps.map((name, index) => {
        const classNames = `${styles.step} ${index < step ? styles. : ''} ${index == step ? styles.active : ''}`;
        return <li key={index} className={classNames}>{name}</li>;
      })}
    </ol>
  );
}

Steps.propTypes = {
  step: React.PropTypes.number,
  steps: React.PropTypes.array,
  complete: React.PropTypes.bool
};

export default Steps;

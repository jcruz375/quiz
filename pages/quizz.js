/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

const QuestionImg = styled.img`
  width: 150%;
  height: 150px;
  object-fit: cover;
  margin-left: -50px;
`;

const LoadingWidget = () => {
  return (
    <h1>
      LOADING ...
    </h1>
  );
};

const QuestionWidget = ({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
}) => {
  const questionId = `question__${questionIndex}`;

  return (
    <>
      <Widget>
        <Widget.Header>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </Widget.Header>
        <Widget.Content>
          <QuestionImg src={question.image} alt="img question" />
          <p style={{ fontSize: 20 }}>{question.title}</p>
          <p>{question.description}</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            {question.alternatives.map((alternative, index) => {
              const alternativeIndex = `alternative__${index}`;
              return (
                <Widget.Topic as="label" htmlFor={alternativeIndex}>
                  {alternative}
                  <input id={alternativeIndex} name={questionId} type="radio" value={index} />
                </Widget.Topic>
              );
            })}
            <Button type="submit">Confirmar</Button>
          </form>
        </Widget.Content>
      </Widget>
    </>
  );
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && (
          <div> Parabéns você acertou </div>
        )}
      </QuizContainer>
    </QuizBackground>
  );
}

QuestionWidget.propTypes = {
  question: PropTypes.object.isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

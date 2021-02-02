/* eslint-disable arrow-body-style */
import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import { QuizContainer } from './index';

const QuestionImg = styled.img`
  width: 100%;
  height: 190px;
`;

const QuestionButton = styled.button`
  width: 80%;
  height: 30px;
  margin: 5px;

  background: ${db.theme.colors.primary};
  color: ${db.theme.colors.contrastText};

  cursor: pointer;
  transition: 0.5s;
  font-weight: 400;

  & :hover {
    background: ${db.theme.colors.secondary};
  }
`;

export default function quizz() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>pergunta 1 de 5</Widget.Header>
          <Widget.Content>
            <QuestionImg src={db.questions[0].image} alt="img question" />
            <p style={{ fontSize: 20 }}>{db.questions[0].title}</p>
            <p>
              {db.questions[0].description}
            </p>
            {db.questions[0].alternatives.map((alternative, index) => {
              // eslint-disable-next-line react/no-array-index-key
              return <QuestionButton key={index}>{alternative}</QuestionButton>;
            })}
          </Widget.Content>
        </Widget>
      </QuizContainer>
    </QuizBackground>
  );
}

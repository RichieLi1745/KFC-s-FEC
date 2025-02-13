import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerItem from './AnswerItem.jsx';
const AnswerList = ({ question_id, token, forImageID, product_id, id}) => {
  const [answers, setAnswers] = useState([]);
  const [displayedAnswers, setDisplayedAnswers] = useState(2);
  const handleLoadMore = () => {
    setDisplayedAnswers(prevDisplayedAnswers=> prevDisplayedAnswers + 2);
  }
  const minAnswers = answers.slice(0, displayedAnswers);
  const handleAnswersList = () => {

    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/rfp/qa/questions/${question_id}/answers/?count=11`, token)
      .then((results) => {
        const answersList = results.data.results;
        setAnswers(answersList);
      })
      .catch((err) => {
        console.error("Error getting answers list:", err);
      })
  }
  useEffect(()=> {
    handleAnswersList();
    setDisplayedAnswers(2);
  }, [question_id, id])
  return (
    <div className="answer-list-container">
      {minAnswers.map(answer => {
        return <AnswerItem
        key={answer.answer_id}
        answers={answers}
        answer={answer}
        handleAnswersList={handleAnswersList}
        token={token}
        forImageID={forImageID}
        />
      })}
      {answers.length > displayedAnswers && (
        <button onClick={handleLoadMore} >Load More Answers</button>
      )}
    </div>

  )

}

export default AnswerList;
import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import 'styles/faq.scss';
import { Link, useHistory } from 'react-router-dom';

export default function QARow({ index, question, answer, isLast }) {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const questionID = params.get('question');

  const innerAnswer = useRef();
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [heightAnswer, setHeightAnswer] = useState();
  const [classIconAnswer, setClassIconAnswer] = useState('collapse-answer');

  const handleChangeShowAnswer = (e) => {
    e.preventDefault();
    setIsShowAnswer(!isShowAnswer);
  };

  useEffect(() => {
    if (isShowAnswer) {
      setClassIconAnswer('collapse-answer');
    } else {
      setClassIconAnswer('');
    }
    setHeightAnswer(innerAnswer.current.clientHeight + 1);
  }, [isShowAnswer]);

  // HANDLE SCROLL TO QUESTION ID ACCORDING TO URL
  useEffect(() => {
    document.body.scrollTo(0, document.getElementById(`question-${questionID}`)?.offsetTop - 100);
  }, []);

  // HANDLE OPEN ANSWER WHEN PAGE LOAD
  useEffect(() => {
    if (questionID === index) {
      setIsShowAnswer(true);
    }
  }, [questionID]);

  const currentHeightAnswer = isShowAnswer ? heightAnswer : 0;

  return (
    <div className="overflow-hidden" id={`question-${index}`}>
      <button
        className={`text-left text-primary w-full ${(!isLast || isLast & isShowAnswer) && 'border-b border-gray-300'}`}
        onClick={(e) => handleChangeShowAnswer(e)}
      >
        <Link to={`/faq?question=${index}`} className="w-full py-5 relative flex items-center justify-between">
          <p className="mr-14 whitespace-pre-line text-2xl">{`${index}. ${question}`}</p>

          <div className={`${classIconAnswer} icon-answer-container absolute right-0`}>
            {isShowAnswer ? (
              <FiMinus className={`text-2xl text-primary w-6 h-6`} />
            ) : (
              <FiPlus className={`  text-2xl text-primary w-6 h-6`} />
            )}
          </div>
        </Link>
      </button>

      <div style={{ height: currentHeightAnswer + 'px' }} className="ease-in duration-300 transition-all">
        <div className={`text-primary py-5 text-md w-full ${!isLast && 'border-b border-gray-300'}`} ref={innerAnswer}>
          <p className="whitespace-pre-line text-white text-xl text-justify">{answer}</p>
        </div>
      </div>
    </div>
  );
}

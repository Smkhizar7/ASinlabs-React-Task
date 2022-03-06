import { useEffect, useState } from "react";
import QuestionData from "../../assets/data/questions.json";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./css/index.css";
function Quiz() {
  const [point, setPoint] = useState(0);
  const [questionNo, setQuestionNo] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [status, setStatus] = useState("");
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState(QuestionData[questionNo-1]);
  useEffect(()=>{
    let arr = [];
    arr.push(question.correct_answer)
    question.incorrect_answers.map((v,i)=>{
        arr.push(v)
    })
    setOptions(arr);
  }
  ,[question])
  function check(option) {
    setClicked(true);
    if (question.correct_answer === option) {
      setPoint(1);
      setStatus("Correct Answer!");
    } else {
      setPoint(0);
      setStatus("Wrong Answer!");
    }
  }
  return (
    <div className="main_div">
      <div className="quiz_box">
        {questionNo <= 20 ? (
          <>
            <h5 className="category">{question.category}</h5>
            <h1 className="question_no">
              Question {questionNo} of {QuestionData.length}
            </h1>
            <div className="star_div">
              {question.difficulty === "easy" ? (
                <>
                  <AiFillStar color="yellow" size={25} />
                  <AiOutlineStar size={25} />
                  <AiOutlineStar size={25} />
                </>
              ) : question.difficulty === "medium" ? (
                <>
                  <AiFillStar color="yellow" size={25} />
                  <AiFillStar color="yellow" size={25} />
                  <AiOutlineStar size={25} />
                </>
              ) : (
                <>
                  <AiFillStar color="yellow" size={25} />
                  <AiFillStar color="yellow" size={25} />
                  <AiFillStar color="yellow" size={25} />
                </>
              )}
            </div>
            <h3 className="question">{question.question}</h3>
            <div className="options">
              {options.map((v,i)=> {
                return (
                  <span className={clicked?"disabled_option":"option"} onClick={!clicked?() => check(v):null} key={i}>
                    {v}
                  </span>
                );
              })}
            </div>
            <div className="div_space">
              <div className={clicked ? "btn_div" : "hidden"}>
                <p className={status === "Correct Answer!" ? "right" : "wrong"}>
                  {status}
                </p>
                <button
                  className="next_btn"
                  onClick={() => {
                    setScore(score + point);
                    if(questionNo<20){
                        setQuestion(QuestionData[questionNo]);
                    }
                    setClicked(false);
                    setQuestionNo(questionNo + 1);
                  }}
                >
                  Next Question
                </button>
              </div>
            </div>
            <div className="score">
              <span className="current_score">
                {console.log(score)}
                Score: {((score / questionNo) * 100).toFixed(0) || 0}%
              </span>
              <span className="max_score">
                Max Score: {(score / 20) * 100 + ((20 - questionNo + 1) / 20) * 100}
                %
              </span>
            </div>
            <ProgressBar className="progress">
              <ProgressBar variant="danger" now={(score / 20) * 100} key={1} />
              <ProgressBar
                variant="warning"
                now={(score / questionNo - score / 20) * 100}
                key={2}
              />
              <ProgressBar
                variant="success"
                now={
                  (score / 20 +
                    (20 - questionNo + 1) / 20 -
                    score / questionNo) *
                  100
                }
                key={3}
              />
            </ProgressBar>
          </>
        ) : (
          <div>
            <h1>Your score is {score/20}</h1>
            <div className="score">
              <span className="current_score">
                Score: {((score / questionNo) * 100).toFixed(0) || 0}%
              </span>
              <span className="max_score">
                Max Score: {(score / 20) * 100 + ((20 - questionNo) / 20) * 100}
                %
              </span>
            </div>
            <ProgressBar className="progress">
              <ProgressBar variant="danger" now={(score / 20) * 100} key={1} />
              <ProgressBar
                variant="warning"
                now={(score / questionNo - score / 20) * 100}
                key={2}
              />
              <ProgressBar
                variant="success"
                now={
                  (score / 20 +
                    (20 - questionNo - 1) / 20 -
                    score / questionNo) *
                  100
                }
                key={3}
              />
            </ProgressBar>
          </div>
        )}
      </div>
    </div>
  );
}
export default Quiz;

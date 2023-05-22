import React, { useState, useEffect } from "react";
import he from "he";
import Shuffle from "./shuffle";
import cloudOne from "../images/cloud1.png";
import cloudTwo from "../images/cloud2.png";
export default function Quiz(props) {
  const [quizFetch, setQuizFetch] = useState({
    isLoading: true,
    errorMessage: "",
    data: null,
  });

  const [ques, setQues] = useState([]);
  const [ans, setAns] = useState([]);
  const [ansOne, setAnsOne] = useState([]);
  const [ansTwo, setAnsTwo] = useState([]);
  const [ansThree, setAnsThree] = useState([]);
  const [ansFour, setAnsFour] = useState([]);
  const [ansFive, setAnsFive] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [selectedThree, setSelectedThree] = useState(null);
  const [selectedFour, setSelectedFour] = useState(null);
  const [selectedFive, setSelectedFive] = useState(null);
  const [ansSelected, setAnsSelected] = useState({
    ans1: null,
    ans2: null,
    ans3: null,
    ans4: null,
    ans5: null,
  });
  const [trueAns, setTrueAns] = useState();
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function getQuiz() {
      try {
        console.log("Fetching!");
        const url = "https://opentdb.com/api.php?amount=5&type=multiple";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Something went wrong, Error ${response.status}`);
        }
        const json = await response.json();
        const { response_code, results } = json;
        if (response_code === 1) {
          throw new Error("Bad API request - no results!");
        } else if (response_code === 2) {
          throw new Error("Bad API request - invalid parameter!");
        }
        const decodedResults = results.map((item) => {
          return {
            ...item,
            question: he.decode(item.question),
            correct_answer: he.decode(item.correct_answer),
            incorrect_answers: item.incorrect_answers.map((incorrect) =>
              he.decode(incorrect)
            ),
          };
        });
        setQuizFetch({
          isLoading: false,
          errorMessage: "",
          data: decodedResults,
        });
      } catch (err) {
        setQuizFetch({
          isLoading: false,
          errorMessage: "Something went wrong, try again later",
          data: null,
        });
        console.log(err);
      }
    }
    getQuiz();
  }, []);

  useEffect(() => {
    function getQues() {
      if (quizFetch.data) {
        const questions = [];
        quizFetch.data.map((item) => {
          questions.push(item.question);
        });
        setQues(questions);
      }
    }
    getQues();
  }, [!quizFetch.isLoading]);

  useEffect(() => {
    function getAns() {
      if (quizFetch.data) {
        const corrAnswers = [];
        const falseAnswers = [];
        quizFetch.data.map((item) => {
          corrAnswers.push(item.correct_answer);
          falseAnswers.push(item.incorrect_answers);
        });
        const ans = [...corrAnswers, ...falseAnswers].flat();
        const ansOne = [ans[0], ans[5], ans[6], ans[7]];
        const ansTwo = [ans[1], ans[8], ans[9], ans[10]];
        const ansThree = [ans[2], ans[11], ans[12], ans[13]];
        const ansFour = [ans[3], ans[14], ans[15], ans[16]];
        const ansFive = [ans[4], ans[17], ans[18], ans[19]];

        const ansOneSwapped = Shuffle(ansOne);
        const ansTwoSwapped = Shuffle(ansTwo);
        const ansThreeSwapped = Shuffle(ansThree);
        const ansFourSwapped = Shuffle(ansFour);
        const ansFiveSwapped = Shuffle(ansFive);

        setAns(ans);
        setTrueAns(corrAnswers);
        setAnsOne(ansOneSwapped);
        setAnsTwo(ansTwoSwapped);
        setAnsThree(ansThreeSwapped);
        setAnsFour(ansFourSwapped);
        setAnsFive(ansFiveSwapped);
      }
    }
    getAns();
  }, [!quizFetch.isLoading]);

  const handleClickOne = (item, id) => {
    setSelectedOne(id);
    setAnsSelected((preVal) => {
      return { ...preVal, ans1: item };
    });
    if (trueAns.includes(item)) {
      setCount((preVal) => preVal + 1);
    }
  };

  const handleClickTwo = (item, id) => {
    setSelectedTwo(id);
    setAnsSelected((preVal) => {
      return { ...preVal, ans2: item };
    });
    if (trueAns.includes(item)) {
      setCount((preVal) => preVal + 1);
    }
  };
  const handleClickThree = (item, id) => {
    setSelectedThree(id);
    setAnsSelected((preVal) => {
      return { ...preVal, ans3: item };
    });
    if (trueAns.includes(item)) {
      setCount((preVal) => preVal + 1);
    }
  };
  const handleClickFour = (item, id) => {
    setSelectedFour(id);
    setAnsSelected((preVal) => {
      return { ...preVal, ans4: item };
    });
    if (trueAns.includes(item)) {
      setCount((preVal) => preVal + 1);
    }
  };
  const handleClickFive = (item, id) => {
    setAnsSelected((preVal) => {
      return { ...preVal, ans5: item };
    });
    setSelectedFive(id);
    if (trueAns.includes(item)) {
      setCount((preVal) => preVal + 1);
    }
  };

  console.log(trueAns);
  console.log(count);
  return (
    <div>
      <img src={cloudOne} className="cloud-one" />
      <img src={cloudTwo} className="cloud-two" />

      {!props.getAns ? (
        <div>
          {quizFetch.isLoading ? (
            <div className="loading"></div>
          ) : (
            <div className="ques--block--container">
              <div className="ques--block--one">
                <p className="question">{ques[0]}</p>
                <div className="ques--block--one--answers">
                  {ansOne.map((item, id) => {
                    return (
                      <div
                        className="answer--item"
                        key={id}
                        id={id}
                        onClick={() => handleClickOne(item, id)}
                        style={{
                          background:
                            selectedOne === id ? "#D6DBF5" : "#F5F7FB",
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
                <hr />
              </div>
              <div className="ques--block--two">
                <p className="question">{ques[1]}</p>
                <div className="ques--block--two--answers">
                  {ansTwo.map((item, id) => {
                    return (
                      <div
                        className="answer--item"
                        key={id}
                        id={id}
                        onClick={() => handleClickTwo(item, id)}
                        style={{
                          background:
                            selectedTwo === id ? "#D6DBF5" : "#F5F7FB",
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
                <hr />
              </div>
              <div className="ques--block--three">
                <p className="question">{ques[2]}</p>
                <div className="ques--block--three--answers">
                  {ansThree.map((item, id) => {
                    return (
                      <div
                        className="answer--item"
                        key={id}
                        id={id}
                        onClick={() => handleClickThree(item, id)}
                        style={{
                          background:
                            selectedThree === id ? "#D6DBF5" : "#F5F7FB",
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
                <hr />
              </div>
              <div className="ques--block--four">
                <p className="question">{ques[3]}</p>
                <div className="ques--block--four--answers">
                  {ansFour.map((item, id) => {
                    return (
                      <div
                        className="answer--item"
                        key={id}
                        id={id}
                        onClick={() => handleClickFour(item, id)}
                        style={{
                          background:
                            selectedFour === id ? "#D6DBF5" : "#F5F7FB",
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
                <hr />
              </div>
              <div className="ques--block--five">
                <p className="question">{ques[4]}</p>
                <div className="ques--block--five--answers">
                  {ansFive.map((item, id) => {
                    return (
                      <div
                        className="answer--item"
                        key={id}
                        id={id}
                        onClick={() => handleClickFive(item, id)}
                        style={{
                          background:
                            selectedFive === id ? "#D6DBF5" : "#F5F7FB",
                        }}
                      >
                        {item}
                      </div>
                    );
                  })}
                </div>
                <hr />
              </div>
              <button className="check" onClick={props.click}>
                Check Answers
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="ques--block--container">
            <div className="ques--block--one">
              <p className="question">{ques[0]}</p>
              <div className="ques--block--one--answers">
                {ansOne.map((item, id) => {
                  return (
                    <div
                      className="answer--item"
                      key={id}
                      id={id}
                      style={{
                        background: trueAns.includes(item)
                          ? "#94D7A2"
                          : id === selectedOne
                          ? "#F8BCBC"
                          : "#F5F7FB",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
            <div className="ques--block--two">
              <p className="question">{ques[1]}</p>
              <div className="ques--block--two--answers">
                {ansTwo.map((item, id) => {
                  return (
                    <div
                      className="answer--item"
                      key={id}
                      id={id}
                      style={{
                        background: trueAns.includes(item)
                          ? "#94D7A2"
                          : id === selectedTwo
                          ? "#F8BCBC"
                          : "#F5F7FB",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
            <div className="ques--block--three">
              <p className="question">{ques[2]}</p>
              <div className="ques--block--three--answers">
                {ansThree.map((item, id) => {
                  return (
                    <div
                      className="answer--item"
                      key={id}
                      id={id}
                      style={{
                        background: trueAns.includes(item)
                          ? "#94D7A2"
                          : id === selectedThree
                          ? "#F8BCBC"
                          : "#F5F7FB",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
            <div className="ques--block--four">
              <p className="question">{ques[3]}</p>
              <div className="ques--block--four--answers">
                {ansFour.map((item, id) => {
                  return (
                    <div
                      className="answer--item"
                      key={id}
                      id={id}
                      onClick={() => handleClickFour(id)}
                      style={{
                        background: trueAns.includes(item)
                          ? "#94D7A2"
                          : id === selectedFour
                          ? "#F8BCBC"
                          : "#F5F7FB",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
            <div className="ques--block--five">
              <p className="question">{ques[4]}</p>
              <div className="ques--block--four--answers">
                {ansFive.map((item, id) => {
                  return (
                    <div
                      className="answer--item"
                      key={id}
                      id={id}
                      onClick={() => handleClickFive(id)}
                      style={{
                        background: trueAns.includes(item)
                          ? "#94D7A2"
                          : id === selectedFive
                          ? "#F8BCBC"
                          : "#F5F7FB",
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
              <hr />
            </div>
            <div className="end">
              <p className="score">You scored {count}/5 correct answers</p>
              <button className="play" onClick={props.reset}>
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

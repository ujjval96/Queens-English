import * as React from "react";
import axios from "axios";
import "./game.css";

const Game: React.FC<{}> = () => {
  const { useState, useEffect } = React;
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const loadQuestion = () => {
    axios.get("https://jservice.io/api/random")
    .then((data) => {
      setQues(data.data[0].question);
      setAns(data.data[0].answer);
    });

    setTimeout(() => setResult(""), 500);
  }

  function changeHandler(e: React.SyntheticEvent): void {
    let target = e.target as HTMLInputElement;
    setInput(target.value);
  }

  function submitHandler(): void {
    if (input === ans) {
      setResult("Correct Answer");
    } else {
      setResult("Incorrect Answer");
    }
    setInput("");
    setTimeout(loadQuestion, 500);
  }

  useEffect(loadQuestion, []);

  return (
    <div>
      <h3 className={result === "Incorrect Answer" ? `result-wrong` : `result-right`}>{result}</h3>
      <h1>Trivia Game</h1>
      <div className="question-div">
        <h2>Question : - <span>{ques}</span></h2>
      </div>
      <h3>Enter Your Answer </h3>
      <input value={input} onKeyUp={(e) => e.key === 'Enter' && submitHandler()} onChange={changeHandler} />
      <button disabled={!input} onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default Game;

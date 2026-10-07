import React,{useState} from "react";
import{createRoot}from"react-dom/client";
import"./styles.css";
import quizData from "../public/quiz.json";

function App(){
 const[currentId,setCurrentId]=useState(quizData.root);
 const[selected,setSelected]=useState(null);
 const[finished,setFinished]=useState(false);
 const[history,setHistory]=useState([]);
 const current=quizData.nodes[currentId];

 const choose=(option)=>{
  setSelected(option.id);
  setHistory(h=>[...h,{question:current.question,option:option.text}]);
  setTimeout(()=>{
   if(option.next&&quizData.nodes[option.next]){setCurrentId(option.next);setSelected(null);}
   else setFinished(true);
  },300);
 };

 const restart=()=>{setCurrentId(quizData.root);setSelected(null);setFinished(false);setHistory([]);};

 if(finished)return <div className="page"><div className="card result">
   <div className="emoji">🎉</div><h1>Quiz Complete!</h1>
   <p>You have reached the end of the quiz.</p>
   <div className="summary"><b>Your choices</b>{history.map((x,i)=>
    <div className="row" key={i}><span>{i+1}</span><div><small>{x.question}</small><strong>{x.option}</strong></div></div>)}</div>
   <button className="primary" onClick={restart}>Play Again</button>
 </div></div>;

 if(!current)return <div className="page"><div className="card"><h1>Quiz Error</h1><p>Question not found in quiz.json.</p></div></div>;

 return <div className="page"><div className="card">
   <div className="top"><span className="badge">QUIZ</span><span>Question {history.length+1}</span></div>
   <div className="question"><small>Choose one option</small><h1>{current.question}</h1></div>
   <div className="options">{current.options.map((o,i)=><button key={o.id}
    className={"option "+(selected===o.id?"selected":"")} disabled={selected!==null} onClick={()=>choose(o)}>
    <span className="letter">{String.fromCharCode(65+i)}</span><span>{o.text}</span><span>→</span>
   </button>)}</div>
   <div className="footer">Select an answer to continue</div>
 </div></div>;
}
createRoot(document.getElementById("root")).render(<App/>);
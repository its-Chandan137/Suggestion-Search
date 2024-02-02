import React,{useEffect,useState} from 'react'

function Msg() {
  let [msg,setMsg] = useState(false);
  var change1 = "Click"
  function change(x){
    change1 = x ? change1 = "No" : change1 = "Yes";
    return change1;
  }

  return (
    <div>
      <h1>{change(!msg)}</h1>
      <button onClick={() => {setMsg(!msg)}}>{change(msg)}</button>
    </div>
  )
}

export default Msg
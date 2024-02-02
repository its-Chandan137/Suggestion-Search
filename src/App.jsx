import React, { useEffect, useRef, useState } from 'react'
import "./App.css";
import Pill from "./components/Pill";

function App() {
  const [search,setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selected, setSelected] = useState([])
  const [selectedSet, setSelectedSet] = useState(new Set())

  const inputRef = useRef(null);


  useEffect(()=>{
    const fetchUser = () => {
      if(search.trim()==="")
      {
        setSuggestion([]);
        return;
      }
  
      fetch(`https://dummyjson.com/users/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => setSuggestion(data))
      .catch((err) => {
        console.error(err);
      });
    }
    fetchUser();
  },[search]);

  const handleSecectedUser = (user) => {
    setSelected([...selected, user]);
    setSelectedSet(new Set([...selectedSet,user.email]))
    setSearch("");
    setSuggestion([]);
    inputRef.current.focus();
  }

  const removeSelected = (user) => {

    const updatedUsers = selected.filter(
      (selected) => selected.id !== user.id
    );
    setSelected(updatedUsers);

    const updatedEmail = new Set(selectedSet);
    updatedEmail.delete(user.email);
    setSelectedSet(updatedEmail);

  };

  const handleKeyDown = (e) => {
    if(e.key === 'Backspace' && e.target.value === "" && selected.length > 0)
    {
      const lastUser = selected[selected.length - 1];
      removeSelected(lastUser);
      setSuggestion([]);
    }
  }

  console.log(selected);

  return (
    <div className='user-search-container'>
      <div className="user-search-input">
        {/* pills */}

        {/* inputing and suggestion */}
        <div className='input-box'>
          <input ref= {inputRef} 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder='Search for User...'
          onKeyDown={handleKeyDown}
          
          />


        </div>
      </div>
      {
          selected.map((user) => {
            return <Pill key={user.email}
            image= {user.image}
            text= {`${user.firstName} ${user.lastName}`}
            onClick= {() => removeSelected(user)}
            />
          })
        }

          <ul className='suggestion-list'>
            {suggestion?.users?.map((user,i) => {

              return !selectedSet.has(user.email)? (

                <li key= {user.email} onClick={() => handleSecectedUser(user)}>

                <img src= {user.image} alt= {`${user.firstName} ${user.firstName}`} />

                <span>{user.firstName} {user.firstName}</span>

              </li>
              ) : <></>
            })}
          </ul>
    </div>
  )
}

export default App
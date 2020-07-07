import React, {useState, useEffect} from 'react';
import { Button, Input, InputLabel, FormControl } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase'
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]); 
  //todos variable is an array, useState is for creating a record in short term memory where todos are  
  //setTodos will keep appending to the array without refreshing, but its short term memory so if we refresh then its gone
  const [input, setInput] = useState('');
  //connect the <input> line 14 to our unput state
  
  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id ,todo: doc.data().todo}))) 
      //taking the single todo from the array of objects todos(read from the database and collect the todos)
      //this is always listening to the database whether update is happening or not 
      //we also have id of each todo document in the database   
    })
  }, []);
  //useEffect(function,dependencies);
  //this fires when the app.js loads
  //[] if we leave it blank then the useEffect will run once, if we add [any variable] then it run once and 
  //when any changes are made to the variable eg: [input] so every single time input loads it will fire this up 
  
  const addTodo = (event) => {
    //this will fireoff when we click the button
    event.preventDefault();
    //it will stop the refresh on submitting the button
    
    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() 
    })

    setTodos([...todos,input]);
    //...is spreading what previously already existing and appending the new todo; short term memory
    setInput(''); //clear input after submitting the button
  }
  return (
    <div className="App">
      <h1>Welcome to To-Do List 🔥!</h1>
      <h3>~ MS</h3>
      <form>    
        
        <FormControl>
          <InputLabel>✅ Write a Todo</InputLabel>
          <Input value = {input} onChange={event => setInput(event.target.value)}/>
          {/*whatever we will type will get stored in var input and then we are setting that 
          input to the state of input(line 8); setInput knows that we have changed the input so
          it will rerender the input field  */}
        </FormControl>
                
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>//passing the todo as prop name text
          //<li>{todo}</li>
        ))}
      </ul>
      {/*.map will run a loop where all the elements inside todos will be give the element one by one thus todos:todo*/}

    </div>
  );
}

export default App;

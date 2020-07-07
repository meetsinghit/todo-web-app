//rfce react fuctional component with export
//component is something we write once but use it several times
//hooks are functional component, we are using functional component
//props stand for properties and allows us to diffrentiate one component from another 
//we are passing the todo here from app.js 
//text is name of the prob and has each individual todo element string
//here in todo.js we can all the complexities here without having to put all in the same app.js file 
//benefit : clean code and render seperately: even if this is loading the rest is not
import React, { useState } from 'react'
import { List, ListItem, ListItemText, ListItemAvatar, Modal, makeStyles, Button } from '@material-ui/core'
import './Todo.css'
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '400',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid $000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const updateTodo = () => {
        //update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true});
        setOpen(false);

    }

    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
        >
            <div className={classes.paper}>
                <h1>I am a modal</h1>
                <input placeholder ={props.todo.todo} value = {input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateTodo}>Update Todo</Button>
            </div>
        </Modal>
        <List className="todo_list">
            <ListItem>
                <ListItemAvatar>
               </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Dummy Deadline ⏰"/>
                {/*todo is prop name or todo object and todo is key name or text part*/}
            </ListItem>
            <button onClick={e => setOpen(true)}>Edit</button>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
        </List>
        </>
    )
}

export default Todo

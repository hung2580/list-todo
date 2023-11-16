
import React from "react";
import { useState } from "react";
import AddTodo from "./AddTodo";
import { ToastContainer, toast } from 'react-toastify';
class ListTodo extends React.Component {
    
    
    state = {
        listTodos: [
            { id: 'todo1', title: 'doing home' ,isDone : 'false'},
            { id: 'todo2', title: 'making video',isDone : 'false' },
            { id: 'todo3', title: 'cooking dinner',isDone : 'false' },
        ],
        editTodo: {}
    }

    addNewTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo]
        })

        toast.success("success!")
    }

    handleDeleteTodo = (todo) => {
        let currentTodo = this.state.listTodos;
        currentTodo = currentTodo.filter(item => item.id !== todo.id);
        this.setState({
            listTodos: currentTodo
        })
        toast.success("delete success!")
    }


    handleEditTodo = (todo) => {
        let { editTodo, listTodos } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        //save
        if (isEmptyObj === false && editTodo.id === todo.id) {
            let listTodoCopy = [...listTodos];
            let objIndex = listTodoCopy.findIndex((item => item.id === todo.id));

            //Update object's name property.
            listTodoCopy[objIndex].title = editTodo.title;
            this.setState({
                listTodos: listTodoCopy,
                editTodo: {}//editTodo= rong de set trang thai cua nut save thanh edit
            })
            toast.success("update success!")
            return;

        }

        this.setState({
            editTodo: todo
        })


    }

    handleOnchangeTitle = (e) => {
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = e.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }

    handleDoneTodo = () => {
        let currentTodo = this.state.listTodos;
        // currentTodo = currentTodo.map(item => item.id !== todo.id);
        // this.setState({
        //     listTodos: currentTodo
        // })

        this.setState({
            isDone: !this.state.isDone,
          });
          <span style={{ textDecoration: this.state.isDone ? 'line-through' : 'none' }}>{currentTodo.text}</span>
        toast.success("work done!")
    }

    render() {
        let { listTodos, editTodo } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;

        return (
            <div className="list-todo-container">
                <AddTodo
                    addNewTodo={this.addNewTodo} />
                <div className="list-todo-content">
                    {listTodos && listTodos.length > 0 &&
                        listTodos.map((item, index) => {
                            return (
                                <div className="todo-child" key={item.id}>
                                    {isEmptyObj === true ?
                                        <span>{index + 1} - {item.title}</span>
                                        :
                                        <>
                                            {editTodo.id === item.id ?
                                                <span>
                                                    {index + 1} - <input value={editTodo.title}
                                                        onChange={e => this.handleOnchangeTitle(e)} />
                                                </span>
                                                :
                                                <span>
                                                    {index + 1} - {item.title}
                                                </span>
                                            }
                                        </>

                                    }
                                    <button className="edit"
                                        onClick={() => this.handleEditTodo(item)}
                                    >
                                        {isEmptyObj === false && editTodo.id === item.id ?
                                            'Save' : 'Edit'
                                        }</button>
                                    <button className="delete"
                                        onClick={() => this.handleDeleteTodo(item)}
                                    >Delete</button>
                                    <button className="done"
                                        onClick={() => this.handleDoneTodo()}
                                        >Done
                                    </button>
                                </div>
                            )
                        })}


                </div>
            </div>
        );
    }
}
export default ListTodo;
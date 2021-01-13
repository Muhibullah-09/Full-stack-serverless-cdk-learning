import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import shortid from "shortid";

const GET_TODOS = gql`
  query {
    getTodos {
      id
      title
      done
    }
  }
`
const CREATE_TODO = gql`
  mutation createTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      id
      title
      done
    }
  }
`
const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(todoId: $id)
  }
`
const UPDATE_TODO = gql`
  mutation updateTodo($todo: TodoInput!) {
    updateTodo(todo: $todo){
      id
      done
    }
  }
`

const Index = () => {
  const [title, setTitle] = useState("");
  const { data, loading, refetch } = useQuery(GET_TODOS);
  const [createTodo] = useMutation(CREATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  const handleSubmit = async () => {
    const todo = {
      id: shortid.generate(),
      title,
      done: false,
    }
    console.log("Creating Todo:", todo)
    setTitle("")
    await createTodo({ variables: { todo } })
    refetch();
  };

  // const deleteTodoButton = async e => {
  //   e.preventDefault()
  //   deleteTodo({
  //     variables: { id: item.id },
  //     refetchQueries: [{ query: GET_TODOS }]
  //   })
  // }
  return (
    <div>
      {loading && <h1>Loading ...</h1>}
      <label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter Your Todo Here..."
        />
      </label>
      <button onClick={() => handleSubmit()}>Create Todo</button>
      {!loading &&
        data &&
        data.getTodos.map(item => (
          <div style={{ marginLeft: "1rem", marginTop: "2rem" }} key={item.id}>
            {item.title} {item.done ? "DONE" : "NOT COMPLETED"}
            <div>
              <button
                onClick={
                  async e => {
                    e.preventDefault()
                    deleteTodo({ variables: { id: item.id }, refetchQueries: [{ query: GET_TODOS }] })
                  }}
              >Delete Todo</button>
              <button
                onClick={e => {
                  e.preventDefault()
                  updateTodo({
                    variables: { id: item.id, done: !item.done},
                    refetchQueries: [{ query: GET_TODOS }]
                  })
                }}
              >Done</button>
            </div>
            {/* <div>
              <button onClick={ e => {item.done == true}}>Done</button>
            </div> */}
          </div>
        ))
        // <button onClick={() => { deleteTodo({ variables: { id: todo.id },refetchQueries: [{ query: GET_TODOS }]})>Delete Todo</button>
      }
    </div>
  );
}

export default Index;
import React, { useState } from "react";
// import { useQuery, gql, useMutation } from "@apollo/client";
import { API } from 'aws-amplify';

const GET_TODOS =`
  query {
    getTodos {
      id
      title
      done
    }
  }
`
const CREATE_TODO =`
  mutation createTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      id
      title
      done
    }
  }
`
const DELETE_TODO =`
  mutation deleteTodo($id: String!) {
    deleteTodo(todoId: $id)
  }
`
const UPDATE_TODO =`
  mutation updateTodo($todo: TodoInput!) {
    updateTodo(todo: $todo){
      id
      done
    }
  }
`

const Index = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const fetchData = async () =>{
    const result = await API.graphql({query:GET_TODOS});
    console.log(result);
    // setData(result.getTodos)
  }
  // const { data, loading, refetch } = useQuery(GET_TODOS);
  // // const [createTodo] = useMutation(CREATE_TODO);
  // // const [deleteTodo] = useMutation(DELETE_TODO);
  // // const [updateTodo] = useMutation(UPDATE_TODO);
  // // const fetchData = async () =>{
  // //   const result = await API.graphql({query:GET_TODOS});
  // // }
  // const handleSubmit = async () => {
  //   const todo = {
  //     id: shortid.generate(),
  //     title,
  //     done: false,
  //   }
  //   console.log("Creating Todo:", todo)
  //   setTitle("");
  //   return await API.graphql({
  //     query: CREATE_TODO,
  //     variables: { todo },
  //   });
    // await createTodo({ variables: { todo } })
    // refetch();
  // };

  // const deleteTodoButton = async e => {
  //   e.preventDefault()
  //   deleteTodo({
  //     variables: { id: item.id },
  //     refetchQueries: [{ query: GET_TODOS }]
  //   })
  // }
  return (
    <div>
      {/* {loading && <h1>Loading ...</h1>} */}
      <label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter Your Todo Here..."
        />
      </label>
      <button onClick={ async e =>{
        e.preventDefault()
        await API.graphql({
          query:CREATE_TODO,
          variables:{id: 'mk'+Math.random(), title, done:false},
          // refetchQueries: [{ query: GET_TODOS }]
        });
        setTitle('');
        fetchData();
      }}>Create Todo</button>
      {data &&
        data.map(item => (
          <div style={{ marginLeft: "1rem", marginTop: "2rem" }} key={item.id}>
            {item.title} {item.done ? "DONE" : "NOT COMPLETED"}
            <div>
              <button
                onClick={
                  async e => {
                    e.preventDefault()
                    await API.graphql({
                      query:DELETE_TODO,
                      variables: { id: item.id},
                      // refetchQueries: [{ query: GET_TODOS }]
                    })
                    // deleteTodo({ variables: { id: item.id }, refetchQueries: [{ query: GET_TODOS }] })
                  }}>Delete Todo</button>
              {/* <button
                onClick={e => {
                  e.preventDefault()
                  updateTodo({
                    variables: { id: item.id, done: !item.done},
                    refetchQueries: [{ query: GET_TODOS }]
                  })
                }}
              >Done</button> */}
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
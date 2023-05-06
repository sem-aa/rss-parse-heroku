import React from "react";
import { Route, Routes } from "react-router-dom";
import PostsList from "./components/PostsList/PostsList";
import PostForm from "./components/PostsForm/PostForm";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/routes/PrivateRoute";
import Container from "./components/Container/Container";

function App() {
  return (
    <Container>
      <Routes>
        <Route exact path="/" element={<PostsList />} />
        <Route exact path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/posts/create" element={<PostForm />} />
          <Route exact path="/posts/:id/edit" element={<PostForm />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;

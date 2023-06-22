import React from "react";
import { Container } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FormDataComponent from "./components/FormDataComponent";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Header />
        <FormDataComponent />
      </Container>
    </div>
  );
}

export default App;

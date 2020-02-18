import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from "./menu";
import Usuarios from "./Usuarios";
import Publicaciones from "./Publicaciones";
import Tareas from "../components/Tareas";
import TareasGuardar from "../components/Tareas/Guardar";

const App = () => (
  <Router>
    <Menu />
    <div className="margen">
      <Route exact path="/" component={Usuarios} />
      <Route exact path="/tareas" component={Tareas} />
      <Route exact path="/tareas/guardar" component={TareasGuardar} />
      <Route
        exact
        path="/tareas/guardar/:usu_id/:tar_id"
        component={TareasGuardar}
      />
      <Route exact path="/publicaciones/:key" component={Publicaciones} />
    </div>
  </Router>
);

export default App;

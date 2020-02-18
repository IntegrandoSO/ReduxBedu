import React from "react";
import { connect } from "react-redux";
import * as usuariosActions from "../../actions/usuariosactions";
import Spinner from "../general/Spinner.js";
import Fatal from "../General/Fatal.js";
import Tabla from "./Tabla";

class Usuarios extends React.Component {
  /*constructor() {
    super();
    this.state = {
      usuarios: []
    };
  }*/

  componentDidMount() {
    this.props.traerTodos();
  }

  ponerContenido = () => {
    if (this.props.cargando) return <Spinner />;

    if (this.props.error) return <Fatal mensaje={this.props.error} />;

    return <Tabla />;
  };

  render() {
    return (
      <div>
        <h1>Usuarios</h1>
        <div>{this.ponerContenido()}</div>
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usuarios;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);

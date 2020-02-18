import React from "react";
import { connect } from "react-redux";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import Comentarios from './Comentarios';

import * as usuariosActions from "../../actions/usuariosactions";
import * as publicacionesActions from "../../actions/publicacionesactions";

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario, abrirCerrar, traerComentarios } = publicacionesActions;

class Publicaciones extends React.Component {
  async componentDidMount() {
    const {
      usuariosTraerTodos,
      traerPorUsuario,
      match: {
        params: { key }
      }
    } = this.props;

    if (!this.props.usuarios.usuarios.length) {
      /*await this.props.usuariosTraerTodos();*/
      await usuariosTraerTodos();
    }

    if (this.props.usuarios.error) {
      return;
    }
    /*if (!('publicaciones_key' in this.props.usuarios.usuarios[this.props.match.params.key])) {*/
    if (!("publicaciones_key" in this.props.usuarios.usuarios[key])) {
      /*this.props.traerPorUsuario(this.props.match.params.key)*/
      traerPorUsuario(key);
    }
  }

  ponerUsuario = () => {
    const {
      usuarios,
      match: {
        params: { key }
      }
    } = this.props;

    if (usuarios.error) {
      return <Fatal mensaje={usuarios.error} />;
    }
    if (!usuarios.usuarios.length || usuarios.cargando) {
      return <Spinner />;
    }

    const nombre = usuarios.usuarios[key].name;
    return <h1>Publicaciones de {nombre}</h1>;
  };

  ponerPublicaciones = () => {
    const {
      usuarios: { usuarios },
      publicacionesreducers,
      publicacionesreducers: { publicaciones },
      match: {
        params: { key }
      }
    } = this.props;

    if (!usuarios.length) {
      return;
    }

    if (usuarios.error) {
      return;
    }

    if (publicacionesreducers.cargando) {
      return <Spinner />;
    }

    if (publicacionesreducers.error) {
      return <Fatal mensaje={publicacionesreducers.error} />;
    }

    if (!publicaciones.length) {
      return;
    }

    if (!("publicaciones_key" in usuarios[key])) return;

    const { publicaciones_key } = usuarios[key];
    return this.mostrarInfo(
      publicaciones[publicaciones_key],
      publicaciones_key
    )
  };

  mostrarInfo = (publicaciones, pub_key) => (
    publicaciones.map((publicacion, com_key) => (
      <div 
          className="pub_titulo" 
          key={publicacion.id}
          onClick={() => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)}
      >
        <h2>{publicacion.title}</h2>
        <h3>{publicacion.body}</h3>
        {
          (publicacion.abierto) ? <Comentarios comentarios={ publicacion.comentarios }/> : ''
        }
      </div>
    ))
  )

  mostrarComentarios = (pub_key, com_key, comentarios) => {
    this.props.abrirCerrar(pub_key, com_key);
    if (!comentarios.length) {
      this.props.traerComentarios(pub_key, com_key);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.ponerUsuario()}
        {this.ponerPublicaciones()}
      </div>
    );
  }
}

const mapStateToProp = ({ usuarios, publicacionesreducers }) => {
  return { usuarios, publicacionesreducers };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  traerPorUsuario,
  abrirCerrar,
  traerComentarios
};

export default connect(mapStateToProp, mapDispatchToProps)(Publicaciones);

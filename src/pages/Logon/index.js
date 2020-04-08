import React from "react";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function Logon() {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Logotipo" />
        <form>
          <h1>Faça o seu Login</h1>
          <input type="text" placeholder="Digite o seu ID" />
          <button type="submit">Entrar</button>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}

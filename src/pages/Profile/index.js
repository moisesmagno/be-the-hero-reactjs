import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./styles.css";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const idONG = localStorage.getItem("ongID");
  const nameONG = localStorage.getItem("nameONG");

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function returnIncidents() {
      const response = await api.get("profile", {
        headers: {
          authorization: idONG,
        },
      });
      setIncidents(response.data);
    }
    returnIncidents();
  }, [idONG]);

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the hero" />
        <span>Bem vindo(a), {nameONG}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button">
          <FiPower />
        </button>
      </header>

      {incidents.length === 0 && (
        <h1 style={{ width: "100%", textAlign: "center", color: "#3a3a3a" }}>
          Sem casos cadastrados :()
        </h1>
      )}

      {incidents.length !== 0 && (
        <>
          <h1>Casos cadastrados</h1>

          <ul>
            {incidents.map((incident) => (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}</p>

                <strong>VALOR:</strong>
                <p>R$ {incident.value}</p>

                <button type="button">
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

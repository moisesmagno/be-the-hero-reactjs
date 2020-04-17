import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./styles.css";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const history = useHistory();
  const idONG = localStorage.getItem("ongID");
  const nameONG = localStorage.getItem("nameONG");

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function returnIncidents() {
      const response = await api.get("profile", {
        headers: {
          Authorization: idONG,
        },
      });
      setIncidents(response.data);
    }
    returnIncidents();
  }, [idONG]);

  async function handleDelete(id) {
    try {
      await api.delete(`incidents/${id}`, {
        Authorization: idONG,
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert("Ocorreu um erro ao tentar excluir o caso.");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the hero" />
        <span>Bem vindo(a), {nameONG}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={() => handleLogout()}>
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
                <p>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(incident.value)}
                </p>

                <button type="button" onClick={() => handleDelete(incident.id)}>
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

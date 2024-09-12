// src/components/AgentList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AgentCard from "./AgentCard";
import AgentModal from "./AgentModal";
import "./AgentList.css";

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [agentsPerPage] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("https://valorant-api.com/v1/agents");
        let filteredAgents = response.data.data.filter(
          (agent) => agent.isPlayableCharacter
        );
        filteredAgents = filteredAgents.sort(() => Math.random() - 0.5);
        setAgents(filteredAgents);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch agents");
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (agent) => {
    setSelectedAgent(agent);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAgent(null);
  };

  return (
    <div className="agent-list">
      <h1>Valorant Agents</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error && <p>{error}</p>}
          <div className="agents-container">
            {currentAgents.map((agent) => (
              <AgentCard key={agent.uuid} agent={agent} onClick={openModal} />
            ))}
          </div>

          <div className="pagination">
            {Array.from(
              { length: Math.ceil(agents.length / agentsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className="pagination-btn"
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </>
      )}

      {modalOpen && selectedAgent && (
        <AgentModal agent={selectedAgent} closeModal={closeModal} />
      )}
    </div>
  );
};

export default AgentList;

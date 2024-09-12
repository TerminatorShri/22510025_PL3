import React from "react";
import "./AgentModal.css";

const AgentModal = ({ agent, closeModal }) => {
  const { displayName, displayIcon, description, backgroundGradientColors } =
    agent;

  const gradientBackground = {
    background: `linear-gradient(135deg, #${backgroundGradientColors[0]}, #${backgroundGradientColors[1]}, #${backgroundGradientColors[2]}, #${backgroundGradientColors[3]})`,
  };
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        style={gradientBackground}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-left">
          <img
            src={agent.fullPortrait}
            alt={agent.displayName}
            className="modal-image"
          />
        </div>
        <div className="modal-right">
          <h2>{agent.displayName}</h2>
          <p>
            <strong>Role:</strong> {agent.role.displayName}
          </p>
          <p>
            <strong>Role Description: </strong>
            {agent.role.description}
          </p>
          <div className="modal-abilities">
            <p>
              <strong>Abilities:</strong>
            </p>
            <div className="abilities-container">
              {agent.abilities.map((ability, index) => (
                <div className="ability">
                  <img
                    key={index}
                    src={ability.displayIcon}
                    alt={ability.displayName}
                    className="ability-image"
                  />
                  <p>{ability.displayName}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={closeModal} className="close-modal-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentModal;

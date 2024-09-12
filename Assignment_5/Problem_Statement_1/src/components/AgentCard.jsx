import React from "react";
import "./AgentCard.css";

const AgentCard = ({ agent, onClick }) => {
  const { displayName, displayIcon, description, backgroundGradientColors } =
    agent;

  const gradientBackground = {
    background: `linear-gradient(135deg, #${backgroundGradientColors[0]}, #${backgroundGradientColors[1]}, #${backgroundGradientColors[2]}, #${backgroundGradientColors[3]})`,
  };

  return (
    <div
      className="agent-card"
      style={gradientBackground}
      onClick={() => onClick(agent)}
    >
      <img src={displayIcon} alt={displayName} className="agent-icon" />
      <h2>{displayName}</h2>
      <p>{description}</p>
    </div>
  );
};

export default AgentCard;

import React from "react";
import styled from "styled-components";
import AiLogo from '../assets/ai logo.png';

const Loader = () => {
  return (
    <StyledOverlay>
      <StyledWrapper>
        <img
          src={AiLogo} // logo import
          alt="AI Logo"
          className="logo"
        />
      </StyledWrapper>
    </StyledOverlay>
  );
};

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);
`;

const StyledWrapper = styled.div`
  .logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
    animation: float 1.5s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

export default Loader;

import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center gap-2 mt-3">
      <p className="text-sm text-text-light dark:text-text">
        Developed and maintained by:
      </p>
      <a href="https://www.emeraldlabs.tech" target="_blank" rel="noopener noreferrer">
        <img src="/EmeraldLabs.png" alt="EmeraldLabs Logo" className="h-8" />
      </a>
    </div>
  );
};

export default Footer;

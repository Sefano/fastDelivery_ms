import React from "react";
import "./forbidden.scss";

const Forbidden = () => {
  return (
    <div className="forbidden">
      <div className="forbidden__code">403</div>
      <div className="forbidden__message">Доступ запрещен</div>
    </div>
  );
};

export default Forbidden;

// import React from "react";

// const Header = () => {
//   return (
//     <header className="d-flex justify-content-between align-items-center pb-4 border-bottom border-secondary">
//       <h1 className="h4 text-warning">YD Systems | Orders</h1>
//       <div className="text-secondary">12:15</div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useEffect } from "react";

const Header = ({ title }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="d-flex justify-content-between align-items-center pb-4 border-bottom border-secondary">
      <h1 className="h4 text-warning">YD Systems | Orders</h1>
      <div className="text-secondary">{currentTime.toLocaleTimeString()}</div>
    </header>
  );
};

export default Header;

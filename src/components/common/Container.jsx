import React from "react";

const Container = ({ children }) => {
  return (
    <div className="px-[16px] max-w-[1440px] mx-auto md:px-[106px]">
      {children}
    </div>
  );
};

export default Container;

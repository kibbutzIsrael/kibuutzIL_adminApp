import React from "react";

const Footer = () => {
  var d = new Date();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Developed by{" "}
          {/* <a href="http://dexignlab.com/" target="_blank" rel="noreferrer"> */}
          kibbutzIL
          {/* </a>{" "} */}
          {d.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;

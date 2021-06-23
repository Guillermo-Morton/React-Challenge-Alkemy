import React from "react";
import ReactLoading from "react-loading";
import './loading.scss'

const LoadingScreen = () => {
  return (
      <div style={{minHeight: '80vh'}} className='d-flex align-items-center justify-content-center'>
        <ReactLoading
          className="mx-auto fadeIn"
          type={"spinningBubbles"}
          color={"#404040"}
        ></ReactLoading>
      </div>
  );
};

export default LoadingScreen;
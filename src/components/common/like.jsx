import React from "react";

const Like = (props) => {
  const className = "fa fa-heart" + (props.liked ? "" : "-o");
  return (
    <i
      onClick={props.onLike}
      className={className}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  );
};

export default Like;

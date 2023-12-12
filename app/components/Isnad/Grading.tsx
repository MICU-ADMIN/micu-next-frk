import React from "react";
import Badge from "../Badge/Badge";

function Grading() {
  return (
    <div className="slideInDown">
      <hr className="my-2" />
      <div className="flex flex-row">
        <Badge className="mr-2 cursor-pointer hover:shadow-sm">Sahih</Badge>
      </div>
    </div>
  );
}

export default Grading;

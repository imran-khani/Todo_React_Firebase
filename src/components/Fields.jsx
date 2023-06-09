import React from "react";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const Fields = (props) => {
  let { data, index, id, name, setData, database } = props;

  const delItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    const itemRef = database.ref(`todos/${id}`); // use the unique identifier as the path
    itemRef.remove();
  };

  return (
    <div>
      <div className="mx-auto ms-auto mt-5 grid  max-w-6xl grid-cols-2 p-5 text-center shadow-sm">
        <span>{name}</span>
        <span>
          <Button
            onClick={() => delItem(index)}
            variant="outlined"
            color="error"
          >
            <Delete />
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Fields;

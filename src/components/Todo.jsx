import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Fields from "./Fields";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
// load animated spinner form mui library
import CircularProgress from "@mui/material/CircularProgress";

const firebaseConfig = {
  // Add your Firebase project's configuration object here
  apiKey: "AIzaSyCQryKSv8Ar_96uZnw6r8nqX_7P7QlcS6I",
  authDomain: "todo-react-d5699.firebaseapp.com",
  projectId: "todo-react-d5699",
  storageBucket: "todo-react-d5699.appspot.com",
  messagingSenderId: "391413668014",
  appId: "1:391413668014:web:f586349531287f0fbaf53f",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const Todo = () => {
  const [name, setName] = useState("");

  const [data, setData] = useState([]);

  // Load the data from Firebase when the component mounts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database.ref("todos").on("value", (snapshot) => {
      const data = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        data.push(childData);
      });
      setData(data);
      setLoading(false);
    });
  }, []);

  const addData = () => {
    let obj = { name };
    if (!name) {
      return null;
    } else {
      const newData = [...data, obj];
      setData(newData);
      localStorage.setItem("data", JSON.stringify(newData));
      const newItemRef = database.ref("todos").push(); // create a new item reference
      const newItemKey = newItemRef.key; // get the unique identifier generated by Firebase
      newItemRef.set({
        id: newItemKey, // set the unique identifier as the "id" property
        name,
      });

      setName("");
      obj.id = newItemKey; // add the id property to the object
      return obj;
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-6xl  p-5">
        <div className="flex justify-center gap-4">
          <TextField
            value={name}
            className="w-[300px]"
            onChange={(e) => setName(e.target.value)}
            id="standard"
            label="Do something"
            variant="standard"
          />
          <Button
            variant="contained"
            onClick={addData}
            disabled={name.length < 1}
            className="disabled:bg-slate-600"
          >
            <AddIcon />
          </Button>
        </div>
      </div>
      <div className="mx-auto  mt-5 grid bg-slate-100 rounded-lg text-slate-800  max-w-6xl grid-cols-2 p-5 text-center shadow-sm">
        <span className="text-xl font-bold">Name</span>
        <span className="text-xl font-bold">Remove</span>
      </div>
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24"></svg>
          <span className="text-center">
            <CircularProgress />
            <p>Please wait Loading Data</p>
            <div></div>
          </span>
        </div>
      ) : (
        <>
          {data.length > 0 ? (
            data.map((item, index) => {
              const { name, id } = item;
              return (
                <Fields
                  data={data}
                  key={index}
                  index={index}
                  id={id}
                  name={name}
                  setData={setData}
                  database={database}
                />
              );
            })
          ) : (
            <div className="flex h-40 items-center justify-center">
              <span>No data available.</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Todo;

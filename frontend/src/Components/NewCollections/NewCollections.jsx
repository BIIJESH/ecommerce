import React, { useEffect, useState, forwardRef } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";

const NewCollections = forwardRef((props, ref) => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((response) => response.json())
      .then((data) => setNewCollection(data))
      .catch((error) => console.error("Error fetching collections:", error));
  }, []);

  return (
    <div ref={ref} className="container new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
});

export default NewCollections;

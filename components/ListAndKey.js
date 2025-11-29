import React from "react";

const fruits = ["Apple", "Banana", "Cherry"];

const users = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Charlie" },
];

const ListAndKey = () => {
  return (
    <div>
      <ul className="bg-yellow-200">
        {fruits.map((fruit, index) => (
          <li key={index}>
            {index} {fruit}
          </li> // key assigned here
        ))}
      </ul>

      <ul className="bg-blue-200">
        {users.map((user) => (
          <li key={user.id}>
            {user.id} {user.name}
          </li> // use stable unique id as key
        ))}
      </ul>
    </div>
  );
};

export default ListAndKey;

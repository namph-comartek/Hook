import { useState, memo, useMemo, useRef } from "react";
import Content from "./Content";
import "./App.css";
function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState([]);
  const nameRef = useRef();
  const handleSubmit = () => {
    setProduct([...product, { name, price: +price }]);
    setName("");
    setPrice("");
    nameRef.current.focus();
  };
  const total = useMemo(() => {
    return product.reduce((total, item) => {
      return total + item.price;
    }, 0);
  }, [product]);
  const [user, setUser] = useState([]);
  const getData = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input ref={nameRef} value={name} placeholder="Enter name product" onChange={(e) => setName(e.target.value)} />
      <br />
      <input value={price} placeholder="Enter price product" onChange={(e) => setPrice(e.target.value)} />
      <br />
      <button onClick={handleSubmit}> Add</button>
      <br />
      Total: {total}
      <ul>
        {product.map((product, index) => (
          <li key={index}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={getData}>Get Data</button>
        <ul>
          {user.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <p>{item.website}</p>
              <p>{item.company.name}</p>
              <p>{item.company.catchPhrase}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

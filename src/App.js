import './App.css';
import { useState, useEffect } from 'react';

//npm run server

// 4 - custom hook 
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState([]);

  //4 - Custom hook e 5 - refatrando post e 6 - loading
  const { data: items, httpConfig, loading, error } = useFetch(url)

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  //1 - Resgatado dados
  /*   useEffect(() => {
      async function getData() {
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data);
      }
      getData();
  
    }, []); */

  //2 - add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      name,
      price,
    }
    /* 
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(product),
        });
    
        // 3 - Carregamento dinâmico
        const addedProduct = await res.json();
        setProducts((prevProducts) => [...prevProducts, addedProduct])
     */

    // 5 - refatorando post
    httpConfig(product, "POST");
    setName("")
    setPrice("")

  }


  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/** 6 - Loading */}
      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - R${product.price} </li>
        ))}
      </ul>
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
          <label >
            Nome:
            <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} />
          </label>
          <label >
            Preço:
            <input type="text" value={price} name="price" onChange={(e) => setPrice(e.target.value)} />
          </label>
          {/** 7 -  state de loading  no post*/}
          {!loading && <input type="submit" value="Criar" />}

        </form>
      </div>

    </div>
  );
}

export default App;

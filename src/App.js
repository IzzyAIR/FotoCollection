import React from 'react';
import './index.scss';
import {Collection} from'./collection';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];


function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);



  const [searchValue, setSearchValue] = React.useState("");
  const [collect, setCollect] = React.useState([]);

  React.useEffect(() =>{
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : '';



    fetch(`https://630e0b62109c16b9abf365e0.mockapi.io/collection?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then((json) => {
      setCollect(json);
    }).catch((err) => { 
      console.warn(err);
     }).finally(() => setIsLoading(false)); 
  }, [categoryId, page]);



  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, index) => <li 
            onClick={() => setCategoryId(index)} 
            className={categoryId === index ? 'active' : ''} 
            key={obj.name}>{obj.name}</li>)
          }
        </ul>
        <input 
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)} 
            className="search-input" 
            placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
         isLoading ?( 
         <h2> Идёт загрузка ... </h2>
         ) : (
          collect.filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
         .map((obj, index) => (
           <Collection key={index}
             name={obj.name}
             images={obj.photos}
           />))
          )
        }
      </div>
      <ul className="pagination">
        {
          [...Array(4)].map((_, index) => (
            <li 
              onClick={() => setPage(index + 1)} 
              className={page === index + 1 ? 'active' : ''}>
              {index + 1}</li>)
          )
        }
      </ul>
    </div>
  );
}

export default App;

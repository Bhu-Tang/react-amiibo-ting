import { useState } from "react";
import './App.css'

// app "globals" and utils
const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

const loadXHR = (url, callback) => {
  const xhr =  new XMLHttpRequest();

  xhr.onload = () =>
  {
    if(xhr.status == "404")
    {
      console.log("File not found.");
      callback([{content: `NOTFOUND ${url}`}])
      return;
    }
    const text = xhr.responseText;
    let json;
    try{
      json = JSON.parse(text);
    }
    catch(err){
        json = "Error. Check console for details."
        console.log(`ERR: ${err}`);
    }
    finally
    {
      callback(json);
    }
    
  };

  xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
  xhr.open("GET",url);
  xhr.setRequestHeader("Accept","application/json");
  xhr.send();
};

const searchAmiibo = (name, callback) => {
  loadXHR( `${baseurl}${name}`, callback);
};

const parseAmiiboResult = xhr => {
  // get the `.responseText` string
  const json = xhr;
  // declare a json variable
  // try to parse the string into a json object
  
  // log out number of results (length of `json.amiibo`)
  console.log(`Number of results=${json.amiibo.length}`);
  
  // loop through `json.amiibo` and log out the character name
  json.amiibo.forEach((amiibo) => console.log(amiibo.character));
};

const App = () => {
  return <>
    <header>
      <h1>Amiibo Finder</h1>
    </header>
    <hr />
    <main>
      <button>Search</button>
      <label>
        Name: 
        <input />
      </label>
    </main>
    <hr />
    <footer>
      <p>&copy; 2023 Ace Coder</p>
    </footer>
  </>;
};

searchAmiibo("mario", parseAmiiboResult);
export default App;
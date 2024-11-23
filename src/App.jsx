import { useEffect, useState, useMemo } from "react";
import './App.css'
import {loadXHR} from "./ajax";
import { readFromLocalStorage, writeToLocalStorage } from "./storage";
import Footer from "./Footer";
import Header from "./Header";
import AmiiboList from "./AmiiboList";
import AmiiboSearchUI from "./AmiiboSearchUi";

// app "globals" and utils
const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";


const App = () => {
  const savedTerm = useMemo(() => readFromLocalStorage("term") || "", []);
  const [term, setTerm] = useState(savedTerm);
  const [results, setResults] = useState([]);
  useEffect(() => {
    writeToLocalStorage("term", term);
  }, [term]);
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

    setResults(json.amiibo);
  };
  return <>
    <Header 
    title="Amiibo Finder!"
    />
    <hr />
    <main>
      <AmiiboSearchUI
      term={term}
      setTerm={setTerm}
      searchAmiibo={searchAmiibo}
      parseAmiiboResult={parseAmiiboResult}
      />
      <AmiiboList
      results={results}
      />
    </main>
    <hr />
    <Footer 
    name="Ace Coder"
    year={new Date().getFullYear()}
    />
  </>;
};

export default App;
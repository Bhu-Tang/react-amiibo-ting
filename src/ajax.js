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
  
  export {loadXHR};
import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import World3D from './World3D'
import TextInfo from './TextInfo'
import mydata from './data.json'

function App() {
  const divRef = useRef(null);
  const [info, setInfo] = useState("Ciao! " + mydata["summary"]);


  const resize = () => {
    if (divRef.current) {
      const windowHeight = window.innerHeight;
      console.log(windowHeight)
      divRef.current.style.height = windowHeight + "px"; // Imposta l'altezza
    }
  };

  const onMouseDown = (e) => {
    console.log(e.target.name)
    setInfo(e.target.name)
    const children = mydata["curriculum"]["children"];
    const result = children.find(obj => obj.name === e.target.name.toUpperCase());
    if (result) {
      console.log('I have been clicked!');
      const description = "<b>" + e.target.name + "</b><br/><br/>" + getDescription(result)
      setInfo(description)
    } else {
      const description = mydata["curriculum"]["description"]
      setInfo(description)
    }
  }

  const getDescription = (node) => {
    let description = node["description"];
    if(node["children"]) {
      // Se il nodo ha figli, aggiungi le descrizioni dei figli
      node["children"].forEach(child => {
        description += "<br/> - " + child["name"];
        if(child["description"]) {
          description += ": " + getDescription(child);
        }
      });
    }
    return description;
  }

  useEffect(() => {
    resize(); // Chiamata alla funzione all'avvio
    // Ascolta le modifiche alle dimensioni della finestra
    window.addEventListener('resize', resize);
  }, []); //  

  return (
    <div className="App" ref={divRef}>
      <TextInfo info={[info]}/>
      <World3D 
      className='World3d'
      onMouseDown={onMouseDown}
      />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import './Home.css';

function Home () {

      return (
        <div className="map">
        <a 
          href="https://visited.ru/">
          <img 
            className={`mapImg`}
            width="640" 
            height="350" 
            src="https://visited.ru/rumap.php?visited=RDARKCRTARCEKDAPRIVLAVGGVORKGDKLUKRSLENMOSNIZROSRYASAMTVETULYAR"
            // src={`${process.env.PUBLIC_URL}/map.jpg`}
            border="0">
          </img>
        </a>  
        </div>
      );
}

export default Home;
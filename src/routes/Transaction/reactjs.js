import React from 'react'
// import ReactJson from "react-json-view";


const JsonConfig = {
    type: "front end",
    items: [{ name: 10, url: true }]
  }; 
function ReactJs(props) {
    const {rawData} = props
    console.log("JsonConfig", rawData)
    return (  <>
            {/* <ReactJson src={rawData} theme="monokai" /> */}

    </>);
}

export default ReactJs;
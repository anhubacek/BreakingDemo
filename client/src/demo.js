import React from "react";

export default class MyComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShown:true,
        }
    }

    // toggleIsShown = ()=> this.setState(({isShown})=> ({isShown: !isShown}))


    render(){
    //     const {isShown} = this.state;
        return(
             
                <div>
                    <h1>Text goes here</h1>
                    <p>Estoy en la etiqueta parrafo</p>
                    <span title="baz">contenido del span</span>
                    </div>
          
        )
    }
}
import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MyComponent from "./demo.js";

Enzyme.configure({ adapter: new Adapter() });

describe("MyComponent", ()=> {

    it("Deberia mostrarme el texto en h1",()=>{
        const wrapper = shallow(<MyComponent />)
        let text = wrapper.find("h1");
        expect(text.text()).toBe("Text goes here")
    })
    it("Deberia mostrarme el texto en p",()=>{
        const wrapper = shallow(<MyComponent />)
        let text = wrapper.find("p");
        expect(text.text()).toBe("Estoy en la etiqueta parrafo")
    })
    it("Deberia mostrarme el texto de span",()=>{
        const wrapper = shallow(<MyComponent />)
        let text = wrapper.find({ title: 'baz' })
        expect(text.text()).toBe("contenido del span")
    })

})
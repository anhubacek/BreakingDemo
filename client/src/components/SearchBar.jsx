import React from "react";
import { useState } from "react";
import {getNameCharacters} from "../actions";
import { useDispatch } from "react-redux";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handlerInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    };

    function handlerSubmit(e){
        e.preventDefault();
        dispatch(getNameCharacters(name))
        setName("")
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar.."
                value={name}
                onChange={e=> handlerInputChange(e)}
            />

            <button
            type="submit"
            onClick={e=> handlerSubmit(e)}
            >Buscar</button>
        </div>
    )
};
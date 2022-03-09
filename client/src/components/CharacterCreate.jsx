import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postCharacter, getOccupations } from "../actions";


//validador

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Se requiere Nombre"
    }
    else if (!input.nickname) {
        errors.nickname = " Nickname debe ser completado"
    }
    return errors;
};

export default function CharacterCreate() {
    const dispatch = useDispatch();
    const occupations = useSelector(state => state.occupations)

    const navigate = useNavigate(); // me diridije a la ruta que le diga
    const [input, setInput] = useState({
        name: "",
        nickname: "",
        birdthday: "",
        status: "",
        img: "",
        occupation: []
    })

    const [errors, setErrors] = useState({})

    function handlerOnChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    };


    function handlerCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                status: e.target.value
            })
        }
    };


    function handlerSelect(e) {
        setInput({
            ...input,
            occupation: [...input.occupation, e.target.value]// me guarda en un array todo lo que voy seleccionando
        })
    };


    function handlerSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postCharacter(input))
        alert("Personaje Creado")
        setInput({
            name: "",
            nickname: "",
            birdthday: "",
            status: "",
            occupation: []
        })

        navigate("/home")
    };


    function handlerDelete(el) {
        setInput({
            ...input,
            occupation: input.occupation.filter(occ => occ !== el)
        })
    };


    useEffect(() => {
        dispatch(getOccupations())
    }, [dispatch])

    return (
        <div>

            <Link to="/home"><button>Volver</button></Link>
            <h1>Crea tu personaje</h1>

            <form onSubmit={handlerSubmit} >

                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handlerOnChange}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Nickname:</label>
                    <input
                        type="text"
                        value={input.nickname}
                        name="nickname"
                        onChange={handlerOnChange}
                    />
                    {errors.nickname && (
                        <p>{errors.nickname}</p>
                    )}
                </div>

                <div>
                    <label>Cumpleaños:</label>
                    <input
                        type="text"
                        value={input.birdthday}
                        name="birdthday"
                        onChange={handlerOnChange}
                    />
                </div>


                <div>
                    <label>Imagen:</label>
                    <input
                        type="text"
                        value={input.img}
                        name="img"
                        onChange={handlerOnChange}
                    />
                </div>

                <div>
                    <label>Status:</label>
                    <label>
                        <input
                            type="checkbox"
                            name="Alive"
                            value="Alive"
                            onChange={handlerCheck}
                        />Alive</label>
                </div>

                <div>
                    <label>Status:</label>
                    <label>
                        <input
                            type="checkbox"
                            name="Deceased"
                            value="Deceased"
                            onChange={handlerCheck}
                        />Deceased</label>
                </div>

                <div>
                    <label>Status:</label>
                    <label>
                        <input
                            type="checkbox"
                            name="Unknown"
                            value="Unknown"
                            onChange={handlerCheck}
                        />Unknown</label>
                </div>
<div>
                <h4>Occupations:</h4>
                            <select onChange={e => handlerSelect(e)}>
                                <option value="occupations">Occupations</option>
                                {
                                    occupations.map(el => (
                                        <option value={el.name}>{el.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <button type='submit' >Create</button>
                            {
                                errors.error && (
                                    <p>{errors.error}</p>
                                )
                            }
                         </div> 
                    </form>
                    <div>
                        <h4>Occupations selected:</h4>
                        <ul >
                            {
                                input.occupation.map(el => (
                                    <li>{el}<button type="button" onClick={() => handlerDelete(el)}>X</button></li>
                                ))
                            }         
                        </ul>
                        </div>
        </div>
    )
};
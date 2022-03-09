import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters, filterCharactersByStatus, filterCreated, orderByName} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const allCharacters = useSelector(state => state.characters)

    const [currentPage, setCurrentPage] = useState(1);
    const [charactersPerPage, setCharactersPerPage] = useState(6) // setea cuantos personajes quiero por pagina
    const indexOfLastCharacter = currentPage * charactersPerPage // 6
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage // 0
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter)

    const [orden,setOrden] = useState("");


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };


    useEffect(() => {
        dispatch(getCharacters())
    }, [dispatch])
//Handlers
    function handlerClick(e) {
        e.preventDefault();
        dispatch(getCharacters());
    };

    function handlerFilterStatus(e) {
        dispatch(filterCharactersByStatus(e.target.value))
    };

    function handlerfilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    };

    function handlerSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    };

    // hago mis filtros
    //[ ] Botones/Opciones para filtrar por status y por personaje existente o agregado por nosotros
    // [ ] Boton/Opcion para ordenar tanto ascendentemente como descendentemente los personajes por orden alfabético
    return (
        <div>
            <Link to="/characters">Crear personaje</Link>
            <h1>Aguante Breaking Bad</h1>
            <button onClick={e => handlerClick(e)}>Volver a cargar personajes</button>
            <div>
                <select onClick={e => handlerSort(e)}>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                {/*  value son los payload de la accion create */}
                <select onChange={e => handlerFilterStatus(e)} >
                    <option value="All">Todos</option>
                    <option value="Alive">Vivo</option>
                    <option value="Deceased">Muerto</option>
                    <option value="Unknown">Desconocido</option>
                    <option value="Presumed dead">Probablemente muerto</option>
                </select>
                <select onChange={e => handlerfilterCreated(e)}>
                    <option value="All">Todos</option>
                    <option value="createdInDb">Creado</option>
                    <option value="All">API</option>
                </select>
                <Paginado
                    charactersPerPage={charactersPerPage}
                    allCharacters={allCharacters.length}
                    paginado={paginado}
                />
                < SearchBar />
                {
                    currentCharacters?.map(c => {
                        return (
                            <div key={c.id}>
                                <Link to={`/home${c.id}`}>
                                    <Card
                                        name={c.name}
                                        image={c.img}
                                        nickname={c.nickname}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
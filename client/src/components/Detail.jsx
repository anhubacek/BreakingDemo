import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";


export default function Detail() {

    const {id} = useParams();
    const dispatch = useDispatch();
    const myCharacter = useSelector(state  => state.detail)

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch,id])

    return (
        <div>
            {
                myCharacter.length > 0 ?
                    <div>
                        <h1>Soy {myCharacter[0].name}</h1>
                        <img src={myCharacter[0].img ? myCharacter[0].img : myCharacter[0].image} />
                        <h2>Status {myCharacter[0].status}</h2>
                        <p>Cumpleaños: {myCharacter[0].birthday}</p>
                        <h4>Ocupaciones:{!myCharacter[0].createdInDb ? myCharacter[0].occupation + " " : myCharacter[0].occupations.map(el => el.name + (" "))}</h4>
                    </div> : <p>Loading..</p>
            }
            <Link to="/home">
            <button>Volver</button>
            </Link>

        </div>
    )
};



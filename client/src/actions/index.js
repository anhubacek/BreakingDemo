
import axios from "axios";


export function getCharacters() {
    return async (dispatch) => {
        var json = await axios.get("http://localhost:3001/characters")// conexion entre el back y el front
        return dispatch({
            type: "GET_CHARACTERS",
            payload: json.data,
        })
    };
};


export function filterCharactersByStatus(payload) {
    console.log(payload)
    return {
        type: "FILTER_BY_STATUS",
        payload,
    }
};

export function filterCreated(payload) {
    console.log(payload)
    return {
        type: "FILTER_CREATED",
        payload,
    }
};

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload,
    }
};

export function getNameCharacters(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/characters?name=" + name)
            return dispatch({
                type: "GET_NAME_CHARACTERS",
                payload: json.data,
            })
        } catch (err) {
            console.log(err)
        }
    }
};

export function getOccupations(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/occupations")
        return dispatch({
            type: "GET_OCCUPATIONS",
            payload: json.data
        })
    }
};

export function postCharacter (payload){
    return async function(dispatch){
        var response = await axios.post("http://localhost:3001/character",payload)
        console.log(response)
        dispatch({
            type:"POST_CHARACTER",
            payload,  
        }); 
        return response;
    }
};

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/characters/" + id)
            return dispatch({
                type:"GET_DETAILS",
                payload: json.data,

            })
        }catch(error){
            console.log(error)
        }
    }
};
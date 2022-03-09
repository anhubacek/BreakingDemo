import React from "react";


export default function Paginado({ charactersPerPage, allCharacters, paginado }) {
    const pageNumbers = [];
    for (let i = 1; i <= (Math.ceil(allCharacters / charactersPerPage)); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul >
                {pageNumbers && pageNumbers.map(number => {
                     return (   <li key={number} >
                           <a onClick={() => paginado(number)} >{number}</a>
                        </li>)
                    })}
            </ul>
        </nav>
    )
}



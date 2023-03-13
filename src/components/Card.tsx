import React from 'react'
import * as Scry from 'scryfall-sdk';

function Card(card) {

    return (
        <div>{card?.name}</div>
    )
}

export default Card
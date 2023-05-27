import React, { useState, useEffect } from 'react';



export default function Stat({ user, rate,index }) {
    
    useEffect(() => {
        // Лічильник для кожного нового рядка
        console.log(index + 1);
      }, [index]);
    return (
        <tr>
            <td>
                {index + 1}

            </td>
            <td>

                {user}
            </td>
            <td>
                {rate}
            </td>
         
        </tr>
    );
}
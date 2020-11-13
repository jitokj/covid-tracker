import React from 'react';
import "./Table.css";

const Table = ({countries}) => {
    // console.log(countries);
    return (
        <div className="table">
        <table>
         <tbody>
            {countries.map(({country,cases,countryInfo})=>(
              
                <tr key={countryInfo._id === null ? Math.random(3) : countryInfo._id}>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
                
            ))}
            </tbody>
            </table>
        </div>
    );
};

export default Table;
import React from "react";
import numeral from "numeral";
import {Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases:{
        hex: "#cc1034",
        multipier: 400
    },
    recovered: {
        hex: "#7dd71d",
        multipier: 600
    },
    deaths: {
        hex: "#fb4443",
        multipier: 1000
    }
} 

export const sortData = (data)=>{
    const sortedData = [...data];

    sortedData.sort((a,b)=>{
        if(a.cases>b.cases){
                return -1;
        }
        else {
            return 1;
        }
    })
    return sortedData;
}

export const prettyPrintStat = (stat)=>
    stat ? `+${numeral(stat).format("0.0a")}`: "+0";



export const showDataOnMap = (data,casesType="cases")=>(
    data.map(country=>(
        <Circle
        key={country.countryInfo.lat + Math.random(3)}
         center={[country.countryInfo.lat,country.countryInfo.long]}
          fillOpacity={0.4} color={casesTypeColors[casesType].hex}
           fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(country[casesType])*casesTypeColors[casesType].multipier}>
                <Popup>
                    <div className="info-container">
                        <div className="info-flag" style={{backgroundImage: `url(${country.countryInfo.flag})`}} />
                        <div className="info-name">{country.country}</div>
                        <div className="info-confirmed"><strong>Cases</strong> {numeral(country.cases).format("0,0")}</div>
                        <div className="info-recovered"><strong>Recovered</strong> {numeral(country.recovered).format("0,0")}</div>
                        <div className="info-deaths"><strong>Deaths</strong> {numeral(country.deaths).format("0,0")}</div>
                    </div>
                </Popup>
            </Circle>
    ))
);
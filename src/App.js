import React, { useEffect, useState } from "react";
import {Card, CardContent, FormControl,MenuItem,Select} from "@material-ui/core";

import './App.css';
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import {sortData} from "./helper/util";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";
import { prettyPrintStat } from "./helper/util";



function App() {

  /* state */
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter] = useState([34.80746,-40.4796]);
  const [mapZoom,setMapZoom] = useState(3);
  const [mapCountries,setMapCountries] = useState([]);
  const [casesType,setCasesType] = useState("cases");


/* fetching cuntries list from disease.sh api */
  useEffect( ()=>{
       fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.filter(newData=>newData.countryInfo._id !== null).map((country)=>({
          name: country.country,
          value: country.countryInfo.iso2,
          id: country.countryInfo._id
        }))
        const sortedData = sortData(data);
        setMapCountries(data);
        setTableData(sortedData);
        setCountries(countries);
      })
  },[]);

  /* fetching worldwide data from disease.sh api */
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then(data=>{
      setCountryInfo(data);
    })
  },[]);

 

 const onCountryChange =  async (e)=>{
   e.preventDefault();
   const countryCode = e.target.value;
   
   const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" 
          : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then(response=>response.json())
            .then(data=>{
              if (countryCode !== 'worldwide'){
                setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
                setMapZoom(4);
              }
              setCountry(countryCode);
              setCountryInfo(data);
            })
 }

  return (
    
    <div className="app">
    <div className="app__left">
    <div className="app__header">
    <h1>COVID-19 TRACKER</h1>
     <FormControl className="app__dropdown">
       <Select variant="outlined" value={country} onChange={onCountryChange}>
       <MenuItem value="worldwide">WorldWide</MenuItem>
       {
         countries.map((country)=>(
          
          <MenuItem key={country.id}  value={country.value}>{country.name}</MenuItem>
        
         ))
       }
     </Select>
     </FormControl>

    </div>

    <div className="app__stats">

    <InfoBox
     isRed
     active = {casesType==="cases"}
     onClick= {e=> setCasesType('cases')}
     title="CoronaVirus Cases"
     total={prettyPrintStat(countryInfo.cases)} 
     cases={prettyPrintStat(countryInfo.todayCases)}  />

       <InfoBox
         active = {casesType==="recovered"}
         onClick= {e=> setCasesType('recovered')}
        title="Recovered"
        total={prettyPrintStat(countryInfo.recovered)} 
        cases={prettyPrintStat(countryInfo.todayRecovered)} />

       <InfoBox
        isRed
        active = {casesType==="deaths"}
         onClick= {e=> setCasesType('deaths')}
        title="Deaths" 
       total={prettyPrintStat(countryInfo.deaths)}
        cases={prettyPrintStat(countryInfo.todayDeaths)} />

    </div>
       <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
    </div>
    <Card className="app__right">
      <CardContent>
        <h3>Live Cases By Country</h3>
        <Table countries={tableData} />
        <h3 className="app__graphTitle">WorldWide New {casesType}</h3>
        <br />
        <LineGraph className="app__graph" casesType={casesType} />
      </CardContent>
    </Card>
   
    </div>
  );
}

export default App;

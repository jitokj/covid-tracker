import React, { useEffect, useState } from "react";
import {Card, CardContent, FormControl,MenuItem,Select} from "@material-ui/core";

import './App.css';
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";


function App() {

  /* state */
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("worldwide");


/* fetching cuntries list from disease.sh api */
  useEffect(()=>{
       fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
    
        const countries = data.filter(newData=>newData.countryInfo._id !== null).map((country)=>({
          name: country.country,
          value: country.countryInfo.iso2,
          id: country.countryInfo._id
        }))
        setCountries(countries);
      })
  },[]);


  

 const onCountryChange =  (e)=>{
   const countryCode = e.target.value;
   setCountry(countryCode);
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
    <InfoBox title="CoronaVirus Cases" total={200} cases={123}  />
       <InfoBox title="Recovered" total={12} cases={54} />
       <InfoBox title="Deaths" total={4} cases={12} />
    </div>
       <Map />
    </div>
    <Card className="app__right">
      <CardContent>
        <h3>Live Cases By Country</h3>
        <h3>WorldWide New Cases</h3>
      </CardContent>
    </Card>
   
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import {Card, CardContent, FormControl,MenuItem,Select} from "@material-ui/core";

import './App.css';
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import {sortData} from "./helper/util";



function App() {

  /* state */
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);


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

  

 const onCountryChange =  (e)=>{
   const countryCode = e.target.value;
   
   const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" 
          : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
         fetch(url)
            .then(response=>response.json())
            .then(data=>{
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

    <InfoBox title="CoronaVirus Cases"
     total={countryInfo.cases} 
     cases={countryInfo.todayCases}  />

       <InfoBox title="Recovered"
        total={countryInfo.recovered} 
        cases={countryInfo.Recovered} />

       <InfoBox title="Deaths" 
       total={countryInfo.deaths}
        cases={countryInfo.todayDeaths} />

    </div>
       <Map />
    </div>
    <Card className="app__right">
      <CardContent>
        <h3>Live Cases By Country</h3>
        <Table countries={tableData} />
        <h3>WorldWide New Cases</h3>
      </CardContent>
    </Card>
   
    </div>
  );
}

export default App;

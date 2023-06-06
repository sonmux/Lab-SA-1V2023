import React,{useState, useEffect} from 'react';
import {DataGrid} from "@mui/x-data-grid"
import {TabContext, TabList, TabPanel} from '@mui/lab';
import {AppBar} from '@mui/material';
import {Tab} from "@mui/material";
import {Button} from "@mui/material";
import axios from 'axios';
import './App.css';

function App() {

  const [container, setContainer] = useState([])
  const [container2, setContainer2] = useState([])

  useEffect(()=>{
    fetchMe()
  },[])

  

  const fetchMe = async () =>{
    const url = 'https://myanimelist.p.rapidapi.com/anime/recommendations/1';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3768b2a0femshcccb442eb31be89p193c98jsn48a32ed93aeb',
        'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
      }
    };

    try {
      const response =  await fetch(url, options);
      const result =  await response.json();
      const data = await result.recommendations
      console.log(result);
      setContainer(data)
      
    } catch (error) {
      console.error(error);
    }
  }

  

  const soapRequest = async () => {
    const options = {
      method: 'POST',
      url: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso',
      headers: {
        'Content-Type': 'text/xml',
      },
      data: '<?xml version="1.0" encoding="utf-8"?>'+
      '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
        '<soap:Body>'+
          '<ListOfLanguagesByName xmlns="http://www.oorsprong.org/websamples.countryinfo">'+
          '</ListOfLanguagesByName>'+
        '</soap:Body>'+
      '</soap:Envelope>'
    };
    
    try {
      const response = await axios.request(options);
      const xml = response.data;
      console.log(xml)
      const convertXML = require("simple-xml-to-json").convertXML;
      const json = convertXML(xml);
      console.log(json)
      const dataJSON = json['soap:Envelope'].children[0]['soap:Body'].children[0]['m:ListOfLanguagesByNameResponse'].children[0]['m:ListOfLanguagesByNameResult'].children
      console.log(dataJSON);
      setContainer2(dataJSON)
      
    } catch (error) {
      console.error(error);
    }
  }

  /*function soapRequest(){
    var str= '<?xml version="1.0" encoding="utf-8"?>'+
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
      '<soap:Body>'+
        '<NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">'+
          '<ubiNum>500</ubiNum>'+
        '</NumberToWords>'+
      '</soap:Body>'+
    '</soap:Envelope>'

    function createCORSRequest(method, url){
      var XMLHttpRequest = require('xhr2');
      var xhr = new XMLHttpRequest();
      if("withCreadentials" in xhr){
        xhr.open(method, url, false);
      }else if(typeof XDomainRequest != "undefined"){
        //alert
        xhr=new XDomainRequest();
        xhr.open(method, url);
      }else{
        console.log("CORS not supported");
        alert("CORS not supported");
        xhr=null;
      }
      return xhr;
    }

    var xhr=createCORSRequest("POST", "https://www.dataaccess.com/webservicesserver/NumberConversion.wso")
    if(!xhr){
      console.log("XHR issue");
      return;
    }

    xhr.onload=function(){
      var results = xhr.responseText;
      console.log(results);
    }

    xhr.setRequestHeader('Content-Type','text/xml')
    xhr.send(str);

  }*/


   /*fetch("https://myanimelist.p.rapidapi.com/anime/recommendations/1",{
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": "3768b2a0femshcccb442eb31be89p193c98jsn48a32ed93aeb",
      "X-RapidAPI-Host": "myanimelist.p.rapidapi.com"
    }
  })
  .then ( response => {
    const result =  response.json();
    console.log(result);
    setContainer(result.recommendations)
    //setContainer(response.json().recommendations)
  })
.catch(err => {
  console.error(err);
});*/

const columns = [
  {field: "id", headerName: "ID", width: 150},
  {field: "picture_url", headerName: "Picture_url", width: 150, editable: true, renderCell: (params)=><img src={params.value} alt=""/>},
  {field: "title", headerName: "Title", width: 150},
  {field: "description", headerName: "Description", width: 150}
];

const rows = container.map((item, index)=>({
    id: index,
    picture_url: item.recommendation.picture_url,
    title: item.recommendation.title,
    description: item.description
}))

const columns2 = [
  {field: "id", headerName: "ID", width: 150},
  {field: "sISOCode", headerName: "SISOCODE", width: 150},
  {field: "sName", headerName: "SNAME", width: 150}
];

const rows2 = container2.map((item, index)=>({
  id: index,
  sISOCode: item['m:tLanguage'].children[0]['m:sISOCode'].content,
  sName: item['m:tLanguage'].children[1]['m:sName'].content
}))

const [value, setValue] = React.useState('1');

const handleChange2 = (event, newValue) => {
  setValue(newValue);
};

const [paginationModel, setPaginationModel] = React.useState({
  pageSize: 5,
  page: 0,
});

return (
  <div className="App" style={{height: 500, width:"100%"}}>
  <TabContext value={value}>
      <AppBar position='static'>
        <TabList
          onChange={handleChange2}
          aria-label='simple tabs example'
          style={{ backgroundColor: '#14065f' }}
        >
          <Tab label='REST' value='1' />
          <Tab label='SOAP' value='2' />                
        </TabList>
      </AppBar>
      <TabPanel value='1'>
        <DataGrid 
          rows={rows} 
          columns={columns} 
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </TabPanel>
      <TabPanel value='2'>
        <Button
              autoFocus
              onClick={soapRequest}
              variant="contained"
              color="secondary"
            >
              Touch Me
        </Button>
        <DataGrid 
          rows={rows2} 
          columns={columns2} 
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </TabPanel>
    </TabContext>
    </div>

    
  
);
  
}

export default App;

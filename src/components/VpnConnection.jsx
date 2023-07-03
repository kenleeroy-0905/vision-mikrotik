import React, { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
  } from '@mui/x-data-grid';
import data from '../api/data';
import axios from 'axios';

const customToolbar = () => {
    return (
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </GridToolbarContainer>
      );
}

const VpnConnections = ({country, countryLow}) => {
    
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    setInterval(async () => {
      try {
        const res = await data.get(
          "/ppp/active-connection"
        );
        const eventData = res.data.data;

        const extractedDataArray = eventData.map((event) => {
        const { callerId, name, service, uptime} = event;
        return { callerId, name, service, uptime };
        });

        setEventData(eventData);

  // Make a POST request for each extracted data object
        extractedDataArray.forEach(async (extractedData) => {
        try {
        await axios.post("http://localhost:5000/save-connections-vpn", { eventDataVpn: extractedData });
        } catch (error) {
         console.error("Error saving data:", error);
        }
        });

        const modifiedData = res.data.data.map((row, index) => ({
            id: index + 1,
            ...row,
            name: row['name'] ? row['name'] : '-',
            callerId: row['callerId'] ? row['callerId'] : '-',
            service: row['service'] ? row['service'] : '-',
            upTime: row['uptime'] ? row['uptime'] : '-',
          }));
        setTableData(modifiedData);
        setLoading(false);
        setLastUpdated(new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Dubai' }));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }     
    }, 10000);
  }, []);

  const columns = [
    { field: 'callerId', headerName: 'Caller ID', width: 400, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Name', width: 400, headerAlign: 'center', align: 'center' },
    { field: 'service', headerName: 'Service', width: 400, headerAlign: 'center', align: 'center' },
    { field: 'uptime', headerName: 'Uptime', width: 400, headerAlign: 'center', align: 'center' },
  ];


  return (
    <Box>
        <Typography variant="cardTitle">Active VPN Connections</Typography>
        <Typography variant="body1">Last Updated: {lastUpdated}</Typography>
         <div style={{ height: 400, width: '100%'  }}>
           <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            slots={{
            toolbar: customToolbar,
             }}
            loading={loading}
            columnBuffer={100}
            />
        </div>
    </Box>
  )
}

export default VpnConnections
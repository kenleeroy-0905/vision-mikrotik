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

const Connection = ({country, countryLow}) => {
    
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setInterval(async () => {
      try {
        const res = await data.get(
          "/ip/fire-wall/connection"
        );
        const modifiedData = res.data.data.map((row, index) => ({
            id: index + 1,
            ...row,
            flag: countryLow[row['country']] ? countryLow[row['country']] : null,
            countryName: country[row['country']] ? country[row['country']] : '-',
            city: row['city'] ? row['city'] : "-",
            srcAddress: row['src-address'].split(':')[0],
            srcPort: row['src-address'].split(':')[1] ? row['src-address'].split(':')[1] : '-',
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
    {
        field: 'localtion',
        headerName: 'Location',
        width: 600,
        valueGetter: (params) => `${params.row.countryName} / ${params.row.city}`,
        renderCell: (params) =>   params.row.flag ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={`https://flagcdn.com/${params.row.flag}.svg`} alt="Icon" className="gmFWS" />
              {params.value}
            </div>
          ) : (
            <div>{params.value}</div>
          ),
          headerAlign: 'center',
          align: 'center'
    },
    { field: 'srcAddress', headerName: 'IP Address', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'srcPort', headerName: 'Port', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'protocol', headerName: 'Protocol', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'timeout', headerName: 'Timeout', width: 200, headerAlign: 'center', align: 'center' },
  ];


  return (
    <Box>
        <Typography variant="cardTitle">Active Connections</Typography>
        <Typography variant="body1">Last Updated: {lastUpdated}</Typography>
         <div style={{ height: 400, width: '100%' }}>
           <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            slots={{
            toolbar: customToolbar,
             }}
            loading={loading} 
            />
        </div>
    </Box>
  )
}

export default Connection
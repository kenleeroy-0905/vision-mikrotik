import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import axios from 'axios';
import data from '../../api/data';

const customToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const AllConnectionVpn = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
   const fetchData = async()=>{
      try {
        const res = await axios.get('http://localhost:5000/connections-vpn'); // Fetch data from your API endpoint
        const newRows = res.data.map((row, index) => ({
          id: index + 1,
          ...row,
          name: row['name'] ? row['name'] : '-',
          callerId: row['callerId'] ? row['callerId'] : '-',
          service: row['service'] ? row['service'] : '-',
          upTime: row['uptime'] ? row['uptime'] : '-',
          createdAt: new Date(row.createdAt).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        }));

        setTableData(newRows);
        setLoading(false);
        setLastUpdated(new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Asia/Dubai' }));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  const columns = [
    { field: 'callerId', headerName: 'Caller ID', width: 400, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Name', width: 400, headerAlign: 'center', align: 'center' },
    { field: 'service', headerName: 'Service', width: 400, headerAlign: 'center', align: 'center' },
    { field: 'uptime', headerName: 'Uptime', width: 400, headerAlign: 'center', align: 'center' },
    { field: 'createdAt', headerName: 'Log Date', width: 200, headerAlign: 'center', align: 'center' },
  ];



  return (
    <Box>
        <Typography variant="cardTitle">Vpn Connections Log</Typography>
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
};

export default AllConnectionVpn;

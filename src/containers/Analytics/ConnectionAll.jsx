import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  gridRowsLoadingSelector,
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

const AllConnection = ({ country, countryLow }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:5000/connections");
        const modifiedData = res.data.map((row, index) => {
          const [ipAddress, port] = row.srcAddress.split(":");
          return {
            id: index + 1,
            ...row,
            flag: countryLow[row['country']] ? countryLow[row['country']] : null,
            countryName: country[row['country']] ? country[row['country']] : '-',
            city: row['city'] ? row['city'] : "-",
            srcAddress: ipAddress ? ipAddress : "-",
            srcPort: port ? port : "-",
            createdAt: new Date(row.createdAt).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            }),
          };
        });
  
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
      field: 'location',
      headerName: 'Location',
      width: 500,
      valueGetter: params => `${params.row.countryName} / ${params.row.city}`,
      renderCell: params =>
        params.row.flag ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={`https://flagcdn.com/${params.row.flag}.svg`} alt="Icon" className="gmFWS" />
            {params.value}
          </div>
        ) : (
          <div>{params.value}</div>
        ),
      headerAlign: 'center',
      align: 'center',
    },
    { field: 'srcAddress', headerName: 'IP Address', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'srcPort', headerName: 'Port', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'protocol', headerName: 'Protocol', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'timeout', headerName: 'Timeout', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'createdAt', headerName: 'Log Date', width: 200, headerAlign: 'center', align: 'center' },
  ];

  return (
    <Box>
      <Typography variant="cardTitle">Connections Log</Typography>
      <Typography variant="body1">Last Updated: {lastUpdated}</Typography>
      <div style={{ height: '600', width: '100%' }}>
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
  );
};

export default AllConnection;

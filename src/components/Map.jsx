import "leaflet/dist/leaflet.css";
import "../index.css";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  LayersControl,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, marker, point } from "leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  // iconUrl: require("./icons/wifi.png"),
  iconSize: [30, 30], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(20, 20, true),
  });
};

const Map = ({ eventData, country, countryLow }) => {
  return (
    <div className="map">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        minZoom={2}
        maxBounds={[
          [-85.06, -180],
          [85.06, 180],
        ]}
      >
        <LayersControl>
          <LayersControl.BaseLayer name="Open Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer checked name="Google Map">
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Google Map Satellite">
            <LayerGroup>
              <TileLayer
                attribution="Google Maps Satellite"
                url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
              />
            </LayerGroup>
          </LayersControl.BaseLayer>
        </LayersControl>

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {eventData.map((data, index) => {
            const ip = data["src-address"]?.split(":")[0];
            const port = data["src-address"]?.split(":")[1];
            const position = [data.latitude, data.longitude];
            const countryName = country[data.country];
            const countryFlag = countryLow[data.country];
            
            if (data.country) {
              return (
                <Marker key={index} position={position} icon={customIcon}>
                  <Popup>
                    <h2>Login Location Info</h2>
                    <ul>
                      <li>
                        IP Address: <strong>{ip}</strong>
                      </li>
                      <li>
                        Country:
                        <img
                          src={`https://flagcdn.com/${countryFlag}.svg`}
                          className="gmFWS"
                        />
                        <strong>{countryName}</strong>
                      </li>
                      <li>
                        City: <strong>{data.city ? data.city : "-"}</strong>
                      </li>
                      <li>
                        Port Used: <strong>{port ? port : "-"}</strong>
                      </li>
                      <li>
                        Protocol: <strong>{data.protocol}</strong>
                      </li>
                      <li>
                        Timeout: <strong>{data.timeout}</strong>
                      </li>
                    </ul>
                  </Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;

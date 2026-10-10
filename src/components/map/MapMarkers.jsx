import L from 'leaflet';

// Custom modern SVG DivIcons for Leaflet
export const createDroneIcon = (droneId) => {
  return L.divIcon({
    className: 'custom-drone-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #0f172a;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #38bdf8;
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
          </svg>
        </div>
        <div style="
          margin-top: 3px;
          background: #0f172a;
          border: 1px solid #334155;
          color: #ffffff;
          font-family: ui-monospace, monospace;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 6px;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        ">
          ${droneId || 'SD-D204'}
        </div>
      </div>
    `,
    iconSize: [40, 56],
    iconAnchor: [20, 19],
    popupAnchor: [0, -20],
  });
};

export const createHubIcon = (hubName) => {
  return L.divIcon({
    className: 'custom-hub-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: #0f172a;
          border: 2px solid #94a3b8;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f8fafc;
        ">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85"/>
          </svg>
        </div>
        <div style="
          margin-top: 2px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          font-size: 9px;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        ">
          ${hubName || 'HUB'}
        </div>
      </div>
    `,
    iconSize: [32, 48],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

export const createDestinationIcon = (label) => {
  return L.divIcon({
    className: 'custom-dest-marker',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #059669;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        ">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <div style="
          margin-top: 2px;
          background: #064e3b;
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        ">
          ${label || 'Drop Point'}
        </div>
      </div>
    `,
    iconSize: [32, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export const createWaypointIcon = (seq) => {
  return L.divIcon({
    className: 'custom-wp-marker',
    html: `
      <div style="
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #0f172a;
        border: 2px solid #38bdf8;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #38bdf8;
        font-family: ui-monospace, monospace;
        font-size: 9px;
        font-weight: 800;
        box-shadow: 0 2px 6px rgba(0,0,0,0.25);
      ">
        ${seq}
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};


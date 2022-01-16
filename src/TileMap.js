import "./styles.css";

export default function TileMap({ zoom, setZoom }) {
  var maxDim = 1;

  function updateMap() {
    maxDim = Math.pow(2, zoom);
    removeAllChildNodes(document.getElementById("map")); // Clear Map
    document.getElementById("map").style.columns = maxDim;
    document.getElementById("map").style.rows = maxDim;
    for (let currX = 0; currX < maxDim; currX++) {
      for (let currY = 0; currY < maxDim; currY++) {
        let div = getTile(currX, currY);
        document.getElementById("map").appendChild(div);
      }
    }
  }

  function getTile(currX, currY) {
    const div = document.createElement("div");
    div.className = "Tile";
    div.innerHTML = `
      <img src="https://challenge-tiler.services.propelleraero.com/tiles/${zoom}/${currX}/${currY}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFyY3VzLW95YW5nIiwiaWF0IjoxNjM4MTU0MjY3fQ.-xEvtCqJ52-I2vftmPcFb8wxJkdfX0Rv6W_ggA2JpD4" alt="tile"
      />
    `;
    return div;
  }

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function handleZoomUp(e) {
    if (zoom < 3) {
      setZoom(zoom + 1);
      zoom++;
      updateMap();
    }
  }

  function handleZoomDown(e) {
    if (zoom > 0) {
      setZoom(zoom - 1);
      zoom--;
      updateMap();
    }
  }

  document.addEventListener("wheel", function (e) {
    if (e.deltaY < 0) {
      handleZoomUp();
    } else {
      handleZoomDown();
    }
  });

  return (
    <div className="MapContainer">
      <div className="TileMap">
        <div id="map">
          <img
            src="https://challenge-tiler.services.propelleraero.com/tiles/0/0/0?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibWFyY3VzLW95YW5nIiwiaWF0IjoxNjM4MTU0MjY3fQ.-xEvtCqJ52-I2vftmPcFb8wxJkdfX0Rv6W_ggA2JpD4"
            alt="tile"
          />
        </div>
      </div>
      <div className="Buttons">
        <button className="ZoomUp" onClick={handleZoomUp}>
          +
        </button>
        <button className="ZoomDown" onClick={handleZoomDown}>
          -
        </button>
      </div>
    </div>
  );
}

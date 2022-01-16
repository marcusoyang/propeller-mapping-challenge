import React, { useState } from "react";
import "./styles.css";
import TileMap from "./TileMap.js";

export default function App() {
  const [zoom, setZoom] = useState(0);

  // Panning Functionality modified from https://stackoverflow.com/a/68280346 v7
  const Pannable = (EL) => {
    const EL_canvas = EL.firstElementChild;
    const initial = { x: 0, y: 0 };
    const offset = { x: 0, y: 0 }; // The transform offset (from center)
    let isPan = false;

    const getXY = ({ clientX, clientY }) => {
      const { left, top } = EL.getBoundingClientRect();
      return { x: clientX - left, y: clientY - top };
    };

    const panStart = (ev) => {
      ev.preventDefault();
      isPan = true;
      const { x, y } = getXY(ev);
      initial.x = x - offset.x;
      initial.y = y - offset.y;
    };

    const panMove = (ev) => {
      if (!isPan) return; // Do nothing
      const { x, y } = getXY(ev);
      offset.x = x - initial.x;
      offset.y = y - initial.y;
      // Stop pan if image reaches the edge of client
      //let { left, top } = EL_canvas.getBoundingClientRect();
      //if (left > 450 || left < -450 || top > 700 || top < -700) {
      //  panEnd();
      //}
      EL_canvas.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
    };

    const panEnd = (ev) => {
      isPan = false;
    };

    EL.addEventListener("mousedown", panStart); // Pan when cursor within EL
    document.addEventListener("mousemove", panMove);
    document.addEventListener("mouseup", panEnd);
  };

  document.querySelectorAll(".TileMap").forEach(Pannable);

  return (
    <div className="App" font="font-family:Raleway">
      <h1>Propeller Front End Coding Challenge</h1>
      <h3>By Marcus O'Yang</h3>
      <TileMap zoom={zoom} setZoom={setZoom} />
    </div>
  );
}

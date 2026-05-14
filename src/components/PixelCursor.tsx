import { useEffect, useState } from "react";

const P = 3; // px per pixel

// 0 = transparent, 1 = black, 2 = white
const MAP = [
  [1,0,0,0,0,0,0,0,0],
  [1,1,0,0,0,0,0,0,0],
  [1,2,1,0,0,0,0,0,0],
  [1,2,2,1,0,0,0,0,0],
  [1,2,2,2,1,0,0,0,0],
  [1,2,2,2,2,1,0,0,0],
  [1,2,2,2,2,2,1,0,0],
  [1,2,2,2,2,2,2,1,0],
  [1,2,2,2,1,1,1,1,0],
  [1,2,2,1,2,1,0,0,0],
  [1,2,1,0,1,2,1,0,0],
  [1,1,0,0,0,1,1,0,0],
];

const W = MAP[0].length * P;
const H = MAP.length * P;

export default function PixelCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        pointerEvents: "none",
        zIndex: 99999,
        imageRendering: "pixelated",
      }}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {MAP.map((row, r) =>
        row.map((cell, c) => {
          if (cell === 0) return null;
          return (
            <rect
              key={`${r}-${c}`}
              x={c * P}
              y={r * P}
              width={P}
              height={P}
              fill={cell === 1 ? "#000000" : "#ffffff"}
            />
          );
        })
      )}
    </svg>
  );
}

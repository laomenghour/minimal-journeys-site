const P = 16;

// [x, y_top, width, height] in grid units
const buildings = [
  [0,13,5,7],[6,8,4,12],[11,4,3,16],[15,10,5,10],
  [21,6,4,14],[26,12,3,8],[30,2,5,18],[36,7,4,13],
  [41,11,3,9],[45,1,6,19],[52,8,4,12],[57,13,3,7],
  [61,5,5,15],[67,9,4,11],[72,3,4,17],[77,11,3,9],
  [81,7,4,13],[86,14,4,6],
];

// lit windows [x, y] — each verified to sit on a building above
const windows = [
  [12,6],[12,9],[12,12],[13,7],[13,11],
  [31,4],[31,7],[31,10],[32,5],[32,8],[33,11],
  [46,3],[46,6],[46,9],[47,4],[48,7],[49,10],[50,5],
  [62,7],[62,10],[63,8],[64,6],[65,11],
  [73,5],[73,8],[73,11],[74,6],[74,9],
  [82,9],[82,12],[83,10],[84,8],
  [7,10],[7,14],[8,11],[9,13],
  [22,8],[22,12],[23,9],[23,14],
  [36,9],[37,11],[38,13],[37,8],
];

const stars = [
  [3,1],[8,2],[18,1],[23,3],[28,2],[34,1],[40,3],
  [55,2],[60,1],[65,3],[70,2],[80,1],[85,2],[88,3],
];

const W = 90 * P;
const H = 20 * P;

const PixelArtCity = () => (
  <section className="w-full overflow-hidden">
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full block"
      preserveAspectRatio="none"
    >
      {/* Sky */}
      <rect width={W} height={H} fill="#0f172a" />

      {/* Stars */}
      {stars.map(([x, y], i) => (
        <rect key={i} x={x * P} y={y * P} width={P} height={P} fill="#e2e8f0" opacity="0.5" />
      ))}

      {/* Moon */}
      <rect x={76 * P} y={2 * P} width={3 * P} height={3 * P} fill="#fef3c7" />
      <rect x={77 * P} y={1 * P} width={P} height={P} fill="#fef3c7" />
      <rect x={76 * P} y={1 * P} width={2 * P} height={P} fill="#fef3c7" />

      {/* Ground */}
      <rect x={0} y={19 * P} width={W} height={P} fill="#1e293b" />

      {/* Buildings */}
      {buildings.map(([x, y, w, h], i) => (
        <rect key={i} x={x * P} y={y * P} width={w * P} height={h * P} fill="#1e293b" />
      ))}

      {/* Lit windows */}
      {windows.map(([x, y], i) => (
        <rect key={i} x={x * P} y={y * P} width={P} height={P} fill="#f59e0b" />
      ))}

      {/* Antennas */}
      <rect x={12 * P} y={2 * P} width={P} height={2 * P} fill="#334155" />
      <rect x={47 * P} y={0} width={P} height={P} fill="#334155" />
      <rect x={73 * P} y={1 * P} width={P} height={2 * P} fill="#334155" />
    </svg>
  </section>
);

export default PixelArtCity;

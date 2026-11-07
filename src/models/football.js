import { G, COL } from './engines.js';
import {
  boxEdges,
  polyline,
  paramSurface,
} from '../lib/sampling.js';
import { capsule, sphere } from '../lib/shapes.js';
import { linspace } from '../lib/vec.js';

const PITCH = {
  length: 2.0,
  width: 1.3,
  halfL: 1.0,
  halfW: 0.65,
};


function footballPlayers() {
  const teams = [
    { name: 'Blue Team', side: -1, color: COL.cyan },
    { name: 'Red Team', side: 1, color: COL.red },
  ];

  // Goalkeeper, four defenders, three midfielders, three forwards.
  const formation = [
    ['GK', 0.88,  0.00],
    ['DF', 0.62, -0.43],
    ['DF', 0.62, -0.15],
    ['DF', 0.62,  0.15],
    ['DF', 0.62,  0.43],
    ['MF', 0.30, -0.30],
    ['MF', 0.30,  0.00],
    ['MF', 0.30,  0.30],
    ['FW', 0.08, -0.30],
    ['FW', 0.08,  0.00],
    ['FW', 0.08,  0.30],
  ];

  const groups = [];

  for (const team of teams) {
    formation.forEach(([role, depth, lane], index) => {
      const x = team.side * depth;
      const z = lane;
      const label = `${team.name} ${role} ${index + 1}`;

      const body = [
        // Torso
        capsule([x, 0.045, z], [x, 0.095, z], 0.018, 1.5),

        // Left and right legs
        capsule([x, 0.047, z - 0.009], [x - 0.012, 0.008, z - 0.014], 0.007, 1.2),
        capsule([x, 0.047, z + 0.009], [x - 0.012, 0.008, z + 0.014], 0.007, 1.2),

        // Arms
        capsule([x, 0.087, z - 0.015], [x + 0.008, 0.047, z - 0.026], 0.006, 1.1),
        capsule([x, 0.087, z + 0.015], [x + 0.008, 0.047, z + 0.026], 0.006, 1.1),
      ];

      groups.push(
        G(label, team.color, [0, 0, 0], 0, body)
      );

      groups.push(
        G(`${label} Head`, COL.white, [0, 0, 0], 0, [
          sphere([x, 0.119, z], 0.012, 1.5),
        ])
      );
    });
  }

  // Ball at the centre of the pitch.
  groups.push(
    G('Match Ball', COL.white, [0, 0, 0], 0, [
      sphere([0, 0.022, 0], 0.018, 2),
    ])
  );

  return groups;
}

function footballPitch() {
  const { halfL: L, halfW: W } = PITCH;

  const field = [
    // Pitch boundary
    polyline([
      [-L, 0, -W],
      [ L, 0, -W],
      [ L, 0,  W],
      [-L, 0,  W],
    ], 0, 5, true),

    // Halfway line
    polyline([
      [0, 0, -W],
      [0, 0, W],
    ], 0, 4),

    // Centre circle
    polyline(
      linspace(0, Math.PI * 2, 80).map(a => [
        0.13 * Math.cos(a),
        0,
        0.13 * Math.sin(a),
      ]),
      0, 3, true
    ),

    // Centre spot
    paramSurface(
      (a, r) => [
        0.012 * r * Math.cos(a),
        0,
        0.012 * r * Math.sin(a),
      ],
      0, Math.PI * 2, 0, 1,
      { density: 5, gu: 12, gv: 2 }
    ),

    // Penalty areas
    ...[-1, 1].map(side => {
      const x = side * 0.82;
      const inner = side * 0.65;

      return polyline([
        [x, 0, -0.40],
        [inner, 0, -0.40],
        [inner, 0, 0.40],
        [x, 0, 0.40],
      ], 0, 4);
    }),
  ];

  return [
    G(
      'Football Pitch',
      COL.green,
      [0, 0, 0],
      0,
      field,
      { info: 'Pitch boundaries, halfway line, centre circle and penalty areas.' }
    ),
    ...footballPlayers(),
  ];
}

export const FOOTBALL = [
  {
    name: 'Football Pitch',
    groups: footballPitch,
    color: [0.25, 1.0, 0.45],
    tilt: 0,
    viewYaw: 0.15,
    fact: 'A 3D football pitch · Interactive particle visualization',
  },
];

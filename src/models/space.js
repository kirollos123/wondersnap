import { G } from './engines.js';
import { polyline } from '../lib/sampling.js';
import { sphere } from '../lib/shapes.js';
import { linspace } from '../lib/vec.js';

const PLANETS = [
  { name: 'Mercury', orbit: 0.24, radius: 0.018, angle: 0.35, color: [0.62, 0.59, 0.54], info: 'The smallest planet. It has a heavily cratered rocky surface.' },
  { name: 'Venus', orbit: 0.34, radius: 0.027, angle: 2.15, color: [0.95, 0.72, 0.38], info: 'A rocky planet with a dense carbon-dioxide atmosphere and extremely hot surface.' },
  { name: 'Earth', orbit: 0.46, radius: 0.031, angle: 4.1, color: [0.20, 0.55, 1.0], info: 'Our home planet, with liquid-water oceans and one natural moon.' },
  { name: 'Mars', orbit: 0.58, radius: 0.023, angle: 5.35, color: [0.92, 0.31, 0.17], info: 'The Red Planet, known for iron-rich dust and giant volcanoes.' },
  { name: 'Jupiter', orbit: 0.78, radius: 0.073, angle: 2.85, color: [0.82, 0.62, 0.43], info: 'The largest planet, with powerful storms including the Great Red Spot.' },
  { name: 'Saturn', orbit: 0.99, radius: 0.062, angle: 0.95, color: [0.91, 0.79, 0.55], info: 'A gas giant famous for its extensive rings of ice and rocky particles.' },
  { name: 'Uranus', orbit: 1.18, radius: 0.043, angle: 3.65, color: [0.48, 0.85, 0.88], info: 'An ice giant with a blue-green atmosphere and a tilted rotation axis.' },
  { name: 'Neptune', orbit: 1.36, radius: 0.042, angle: 5.65, color: [0.22, 0.38, 0.95], info: 'A distant ice giant with a deep-blue atmosphere and very fast winds.' },
];

function orbitPath(radius, y = 0.002) {
  const points = linspace(0, Math.PI * 2, 120).map(a => [
    radius * Math.cos(a), y, radius * Math.sin(a)
  ]);
  return polyline(points, 0, 1.2, true);
}

function buildSolarSystem() {
  const groups = [];

  groups.push(
    G('Sun', [1.0, 0.62, 0.12], [0, 0, 0], 0,
      [sphere([0, 0, 0], 0.135, 2.2)],
      { info: 'The star at the centre of our Solar System. Its gravity holds the planets in orbit.' }
    )
  );

  for (const planet of PLANETS) {
    const x = planet.orbit * Math.cos(planet.angle);
    const z = planet.orbit * Math.sin(planet.angle);

    groups.push(
      G(`${planet.name} Orbit`, [0.24, 0.34, 0.48], [0, 0, 0], 0,
        [orbitPath(planet.orbit)],
        { showLabel: false }
      )
    );

    groups.push(
      G(planet.name, planet.color, [0, 0, 0], 0,
        [sphere([x, 0.012, z], planet.radius, 1.8)],
        { info: planet.info }
      )
    );

    if (planet.name === 'Saturn') {
      const rings = [0.083, 0.096, 0.109].map(r => {
        const points = linspace(0, Math.PI * 2, 100).map(a => [
          x + r * Math.cos(a), 0.014, z + r * Math.sin(a)
        ]);
        return polyline(points, 0, 2.2, true);
      });

      groups.push(
        G('Saturn Rings', [0.88, 0.76, 0.53], [0, 0, 0], 0,
          rings,
          { info: 'Saturn’s rings consist of countless pieces of ice and rock.' }
        )
      );
    }

    if (planet.name === 'Earth') {
      const moonOrbit = 0.061;
      const moonAngle = 1.25;
      const mx = x + moonOrbit * Math.cos(moonAngle);
      const mz = z + moonOrbit * Math.sin(moonAngle);

      const moonPath = linspace(0, Math.PI * 2, 64).map(a => [
        x + moonOrbit * Math.cos(a), 0.018,
        z + moonOrbit * Math.sin(a)
      ]);

      groups.push(
        G('Moon Orbit', [0.48, 0.52, 0.62], [0, 0, 0], 0,
          [polyline(moonPath, 0, 1.2, true)],
          { showLabel: false }
        )
      );

      groups.push(
        G('Moon', [0.76, 0.79, 0.84], [0, 0, 0], 0,
          [sphere([mx, 0.02, mz], 0.009, 1.5)],
          { info: 'Earth’s natural satellite. Its gravity helps drive ocean tides.' }
        )
      );
    }
  }

  return groups;
}

export const SPACE = [
  {
    name: 'Solar System',
    groups: buildSolarSystem,
    color: [1.0, 0.72, 0.25],
    tilt: 0,
    viewYaw: 0.25,
    fact: 'Explore the Sun, eight planets, their orbits, Saturn’s rings and Earth’s Moon.',
  },
];

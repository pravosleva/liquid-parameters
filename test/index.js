import { assert } from 'chai';
import {
  cp,
  freezingTemperature,
  density,
  getKinematicViscosity,
  getRe,
  getTubePressureDrop,
} from '../src';


describe('Test for LiquidParameters class static methods.', () => {
  it('1. cp', () => {
    const expectedVal = 4.19;

    assert(cp({
      liquidType: 'WATER',
      percentage: 100.0,
      temperature: (7 + 12) * 0.5,
    }).result === expectedVal, 'FuckUp :(');
  });

  it('2. freezingTemperature', () => {
    const expectedVal = -11.5;
    const val = freezingTemperature({
      liquidType: 'MEG',
      percentage: 27,
    });

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });

  it('3. density', () => {
    const expectedVal = 999.7675;
    const val = density({
      liquidType: 'WATER',
      percentage: 100.0,
      temperature: (7 + 12) * 0.5,
    }).result;

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });

  it('4. getKinematicViscosity', () => {
    const expectedVal = 2.8975;
    const val = getKinematicViscosity({
      liquidType: 'MEG',
      percentage: 27,
      temperature: (7 + 12) * 0.5,
    }).result;

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });

  it('5.1. getRe', () => {
    const expectedVal = 3536.7765131532296;
    const val = getRe({
      flow: 1, // m3/h
      diameter: 0.1, // m
      kinematicViscosity: 1, // m2/sec (x10^-6)
    }).result;

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });
  it(
    `5.2. getRe for WATER kV= ${
      getKinematicViscosity({
        liquidType: 'WATER',
        percentage: 100,
        temperature: 20,
      }).result
    } m2/s (x10^-6); t= 20 C;`,
    () => {
      const expectedVal = 3536.7765131532296; // 220000; // http://www.hydro-pnevmo.ru/topic.php?ID=213&v=2.2&d=100&nu=0&p=1
      const re = getRe({
        flow: 1, // m3/h =2.2 m/s for WATER t= 20 C
        diameter: 0.1, // m
        kinematicViscosity: 1, // m2/sec (x10^-6)
      }).result;
      const speed = getRe({
        flow: 1, // m3/h =2.2 m/s for WATER t= 20 C
        diameter: 0.1, // m
        kinematicViscosity: 1, // m2/sec (x10^-6)
      }).v;

      assert(re === expectedVal, `FuckUp :( Re= ${re}; speed= ${speed} m/s;`);
    },
  );

  it('6. getTubePressureDrop', () => {
    const expectedVal = 0.09479284164441978;
    const val = getTubePressureDrop({
      Re: 67278.8,
      tubeLength: 15, // m
      tubeDiameter: 0.2, // m
      density: 1038.1, // kg/m3
      v: 2.6, // m/s
    }).bar;

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });
});

import { assert } from 'chai';
import LiquidParameters from '../src';


describe('LiquidParameters test.', () => {
  // 1. CP
  it('1. LiquidParameters.cp', () => {
    const expectedVal = 4.19;

    assert(LiquidParameters.cp({
      liquidType: 'WATER',
      percentage: 100.0,
      temperature: (7 + 12) * 0.5,
    }).result === expectedVal, 'FuckUp :(');
  });

  // 2. FREEZING TEMPERATURE
  it('2. LiquidParameters.freezingTemperature', () => {
    const expectedVal = -11.5;
    const val = LiquidParameters.freezingTemperature({
      liquidType: 'MEG',
      percentage: 27,
    });

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });

  // 3. DENSITY
  it('3. LiquidParameters.density', () => {
    const expectedVal = 999.7675;
    const val = LiquidParameters.density({
      liquidType: 'WATER',
      percentage: 100.0,
      temperature: (7 + 12) * 0.5,
    }).result;

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });

  // 4. KINEMATIC VISCOSITY
  it('4. LiquidParameters.getKinematicViscosity', () => {
    const expectedVal = 2.8975;
    const val = LiquidParameters.getKinematicViscosity({
      liquidType: 'MEG',
      percentage: 27,
      temperature: (7 + 12) * 0.5,
    }).result;

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });

  // 5. RE
  it('5.1. LiquidParameters.getRe', () => {
    const expectedVal = 3536.7765131532296;
    const val = LiquidParameters.getRe({
      flow: 1, // m3/h
      diameter: 0.1, // m
      kinematicViscosity: 1, // m2/sec (x10^-6)
    }).result;

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });
  it(
    `5.2. LiquidParameters.getRe for WATER kV= ${
      LiquidParameters.getKinematicViscosity({
        liquidType: 'WATER',
        percentage: 100,
        temperature: 20,
      }).result
    } m2/s (x10^-6); t= 20 C;`,
    () => {
      const expectedVal = 3536.7765131532296; // 220000; // http://www.hydro-pnevmo.ru/topic.php?ID=213&v=2.2&d=100&nu=0&p=1
      const re = LiquidParameters.getRe({
        flow: 1, // m3/h =2.2 m/s for WATER t= 20 C
        diameter: 0.1, // m
        kinematicViscosity: 1, // m2/sec (x10^-6)
      }).result;
      const speed = LiquidParameters.getRe({
        flow: 1, // m3/h =2.2 m/s for WATER t= 20 C
        diameter: 0.1, // m
        kinematicViscosity: 1, // m2/sec (x10^-6)
      }).v;

      assert(re === expectedVal, `FuckUp :( Re= ${re}; speed= ${speed} m/s;`);
    },
  );

  // 6. TUBE PRESSURE DROP
  it('6. LiquidParameters.getTubePressureDrop', () => {
    const expectedVal = 0.09479284164441978;
    const val = LiquidParameters.getTubePressureDrop({
      Re: 67278.8,
      tubeLength: 15, // m
      tubeDiameter: 0.2, // m
      density: 1038.1, // kg/m3
      v: 2.6, // m/s
    }).bar;

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });
});

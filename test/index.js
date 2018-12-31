import { assert } from 'chai';
import LiquidParameters from '../src';


describe('LiquidParameters test.', () => {
  // CP
  it('LiquidParameters.cp', () => {
    const expectedVal = 4.19;

    assert(LiquidParameters.cp({
      liquidType: 'WATER',
      percentage: 100.0,
      temperature: (7 + 12) * 0.5,
    }).result === expectedVal, 'FuckUp :(');
  });

  // FREEZING TEMPERATURE
  it('LiquidParameters.freezingTemperature', () => {
    const expectedVal = -11.5;
    const val = LiquidParameters.freezingTemperature({
      liquidType: 'MEG',
      percentage: 27,
    });

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });

  // DENSITY
  it('LiquidParameters.density', () => {
    const expectedVal = 999.7675;
    const val = LiquidParameters.density({
      liquidType: 'WATER',
      percentage: 100.0,
      temperature: (7 + 12) * 0.5,
    }).result;

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });

  // KINEMATIC VISCOSITY
  it('LiquidParameters.getKinematicViscosity', () => {
    const expectedVal = 2.8975;
    const val = LiquidParameters.getKinematicViscosity({
      liquidType: 'MEG',
      percentage: 27,
      temperature: (7 + 12) * 0.5,
    }).result;

    assert(val === expectedVal, `FuckUp :( ${val}`);
  });

  // TUBE PRESSURE DROP
  it('LiquidParameters.getTubePressureDrop', () => {
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

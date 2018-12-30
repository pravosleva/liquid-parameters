import { assert } from 'chai';
import LiquidParameters from '../src';


describe('LiquidParameters test.', () => {
  it('LiquidParameters.cp', () => {
    const expectedVal = 4.19;

    assert(LiquidParameters.cp({
      liquidType: 'WATER',
      percentage: 100.0,
      temperature: (7 + 12) * 0.5,
    }).result === expectedVal, 'FuckUp :(');
  });
});

# liquid-parameters

_NPM Module Boilerplate based_

## Install

```
yarn add liquid-parameters
```

## Usage samples

```javascript
import LiquidParameters from 'liquid-parameters';

// Or separate static methods like this:
import { cp } from 'liquid-parameters';
```

_So, you can use methods below_

- [LiquidParameters.cp](#cp)
- [LiquidParameters.freezingTemperature](#freezingTemperature)
- [LiquidParameters.density](#density)
- [LiquidParameters.getRe](#getRe) _Need to review!_
- [LiquidParameters.getKinematicViscosity](#getKinematicViscosity)
- [LiquidParameters.getTubePressureDrop](#getTubePressureDrop)

### cp
```javascript
LiquidParameters.cp({
  liquidType: 'WATER', // ('WATER'|'MEG'|'MPG')
  percentage: 100.0, // % (if WATER then should be 100)
  temperature: (7 + 12) * 0.5, // C
});

/* Output:
  {
    result: 4.19, // kJ/kg.K
    error, // bool
    report, // str
  }
*/
```

### freezingTemperature
```javascript
LiquidParameters.freezingTemperature({
  liquidType: 'MEG', // ('WATER'|'MEG'|'MPG')
  percentage: 27, // % (if WATER then should be 100)
});

// Output: -11.5 // C
```

### density
```javascript
LiquidParameters.density({
  liquidType: 'WATER', // ('WATER'|'MEG'|'MPG')
  temperature: (7 + 12) / 2, // C
  percentage: 100.0, // % (if WATER then should be 100)
});

/* Output:
  {
    diagram, // service object
    error, // bool
    result, // kg/m3
    report, // str
  }
*/
```

### getRe
```javascript
LiquidParameters.getRe({
  flow, // m3/h
  diameter, // m
  kinematicViscosity, // m2/s (x10^-6)
});

/* Output:
  {
    v,// m/s
    result, // dimensionless
  }
*/
```

### getKinematicViscosity
```javascript
LiquidParameters.getKinematicViscosity({
  liquidType: 'MEG', // ('WATER'|'MEG'|'MPG')
  temperature: (7 + 12) / 2, // C
  percentage: 27, // % (if WATER then should be 100)
});

/* Output:
  {
    result: 2.8975, // m2/s (x10^-6)
    msg, // str
  }
*/
```

### getTubePressureDrop
```javascript
LiquidParameters.getTubePressureDrop({
  Re, // dimensionless
  tubeLength, // m
  tubeDiameter, // m
  density, // kg/m3
  v, // m/s
});

/* Output:
  {
    kPa,
    bar,
  }
*/
```

## Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting and coverage results.
- `npm test:only` - Run tests without linting or coverage.
- `npm test:watch` - You can even re-run tests on file changes!
- `npm test:prod` - Run tests with minified code.
- `npm run test:examples` - Test written examples on pure JS for better understanding module usage.
- `npm run lint` - Run ESlint with airbnb-config
- `npm run cover` - Get coverage report for your code.
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing your module.

## License

MIT © Den Pol

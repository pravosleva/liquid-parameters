/* eslint-disable no-multi-spaces, max-len, no-lonely-if, array-bracket-spacing, comma-spacing, camelcase, no-plusplus */
/* eslint-disable no-mixed-operators */

import Interpolate from 'interpolate-by-pravosleva';

export default class LiquidParameters {
  static cp({
    liquidType,
    percentage,
    temperature,
  }) {
    let dataObj;
    let error = false;
    let report = 'Ok';
    let result; // default kJ/kg.K

    switch (liquidType) { // Need to check for main ranges...
      case 'MEG':
        if (percentage < 4.6) { // max val should be 46.4
          error = true;
          // result = 4.1; // should be interpolated by temp for 4.6 %
          result = Interpolate.byInternalTable({
            x: temperature,
            y: 4.6,
            tableAsDoubleArray: [
              [0.0,   -30.0,    -25.0,    -20.0,    -15.0,    -10.0,    -5.0,     0.0,    10.0,     20.0,   50.0],
              [4.6,   4.10300,  4.10300,  4.10300,  4.10300,  4.10300,  4.10300,  4.103,  4.124,    4.145,  4.145],
            ],
          });
          // ...
          report = 'Out of main percentage range - Lower than 4.6 %. Liquid percentage should have value between 4.6 and 46.4 %. Interpolated by table for 4.6 %';
        } else if (percentage > 46.4) {
          error = true;
          result = Interpolate.byInternalTable({
            x: temperature,
            y: 46.4,
            tableAsDoubleArray: [
              [0.0,   -30.0,    -25.0,    -20.0,    -15.0,    -10.0,    -5.0,     0.0,    10.0,     20.0,   50.0],
              [46.4,  3.224,    3.245,    3.266,    3.287,    3.308,    3.32000,  3.349,  3.35500,  3.391,  3.517],
            ],
          });
          // ...
          report = 'Out of main percentage range - More than 46.4 %. Liquid percentage should have value between 4.6 and 46.4 %. Interpolated by table for 46.4 %';
        } else {
          if (temperature < -30 || temperature > 50) {
            error = true;
            result = 4.1; // tmp value (+20 C)
            report = `Out of main temperature range. Liquid percentage should have value between -30 and +50 C. Was set as ${result.toFixed(2)} kJ/kg.K`;
          } else {
            /*
              Values with 5 symbols after point is approximate by eye
              May be should be interpolated?..
            */
            dataObj = [
              [0.0,   -30.0,    -25.0,    -20.0,    -15.0,    -10.0,    -5.0,     0.0,    10.0,     20.0,   50.0],
              [4.6,   4.10300,  4.10300,  4.10300,  4.10300,  4.10300,  4.10300,  4.103,  4.124,    4.145,  4.145],
              [8.4,   4.06100,  4.06100,  4.06100,  4.06100,  4.06100,  4.06100,  4.061,  4.061,    4.061,  4.103],
              [12.2,  3.97700,  3.97700,  3.97700,  3.97700,  3.97700,  3.97700,  3.977,  3.998,    4.019,  4.061],
              [16.0,  3.89400,  3.89400,  3.89400,  3.89400,  3.89400,  3.894,    3.894,  3.915,    3.936,  4.019],
              [19.8,  3.85200,  3.85200,  3.85200,  3.85200,  3.85200,  3.852,    3.852,  3.873,    3.894,  3.977],
              [23.6,  3.76800,  3.76800,  3.76800,  3.76800,  3.768,    3.768,    3.768,  3.810,    3.852,  3.953],
              [27.4,  3.66300,  3.66300,  3.66300,  3.663,    3.684,    3.69000,  3.726,  3.75000,  3.768,  3.852],
              [31.2,  3.62200,  3.62200,  3.62200,  3.622,    3.642,    3.64200,  3.642,  3.73000,  3.726,  3.810],
              [35.0,  3.51700,  3.51700,  3.517,    3.538,    3.559,    3.56900,  3.599,  3.56400,  3.642,  3.726],
              [38.8,  3.53800,  3.538,    3.433,    3.454,    3.475,    3.50000,  3.517,  3.54000,  3.475,  3.684],
              [42.6,  3.32800,  3.328,    3.349,    3.370,    3.391,    3.41000,  3.433,  3.45000,  3.475,  3.601],
              [46.4,  3.224,    3.245,    3.266,    3.287,    3.308,    3.32000,  3.349,  3.35500,  3.391,  3.517],
            ];

            result = Interpolate.byInternalTable({
              x: temperature,
              y: percentage,
              tableAsDoubleArray: dataObj
            });
            report += ' / Interpolated by table values';
          }
        }
        break;
      case 'MPG':
        if (percentage >= 0.0 && percentage < 60.0) {
          dataObj = [
            [0.0,     -30,      -20.0,    -10.0,    0.0,     20.0,  40.0,    60.0,    80.0,    100.0],
            [0.0,     4.19,     4.19,     4.19,     4.19,    4.19,  4.19,    4.19,    4.19,    4.19],
            [25.0,    3.93000,  3.93000,  3.93,     3.95,    3.98,  4.00,    4.03,    4.05,    4.08],
            [37.0,    3.68000,  3.68,     3.70000,  3.72,    3.77,  3.82,    3.88,    3.94,    4.00],
            [45.0,    3.49000,  3.49,     3.52,     3.56,    3.62,  3.69,    3.76,    3.82,    3.89],
            [50.0,    3.55,     3.49000,  3.49,     3.52,    3.56,  3.62,    3.69,    3.69,     3.69],
            [60.0,    3.36,     3.49000,  3.49,     3.52,    3.56,  3.62,    3.69,    3.69,     3.69],

            // [0.0,     0,        -3,       -8,       -14.0,    -22.0,   -34.0, -48.0],
            // [0.0,     4.2,      4.19,     4.19,     4.19,     4.19,    4.19,  4.19],
            // [10.0,    4.1,      3.93000,  3.93000,  3.93,     3.95,    3.98,  4.00],
            // [20.0,    4,        3.68000,  3.68,     3.70000,  3.72,    3.77,  3.82],
            // [30.0,    3.9,      3.49000,  3.49,     3.52,     3.56,    3.62,  3.69],
            // [40.0,    3.75,     3.49000,  3.49,     3.52,     3.56,    3.62,  3.69],
            // [50.0,    3.55,     3.49000,  3.49,     3.52,     3.56,    3.62,  3.69],
            // [60.0,    3.36,     3.49000,  3.49,     3.52,     3.56,    3.62,  3.69],
          ];
          result = Interpolate.byInternalTable({
            x: temperature,
            y: percentage,
            tableAsDoubleArray: dataObj,
          });
          report += ` / Interpolate by table values result (inside the table), cp= ${result.toFixed(2)} kJ/kg.K`;
        } else { // more than 60.0%
          result = 3.8;
          report = `Out of main percentage range. Liquid percentage should have value between 0 and 60 %. Was set as ${result.toFixed(2)} kJ/kg.K`;
        }

        // ...
        break;
      default: // WATER
        result = 4.19;

        // ...
        break;
    }
    report = `${liquidType} cp report: ${report}`;
    return { result, error, report };
  }

  static freezingTemperature({ liquidType, percentage }) {
    // This function created to get freezingTemperature by Liquid type & %
    let dataObj = [];

    switch (liquidType) {
      case 'MEG':
        dataObj = [
          [0.0, 0.0,  26.4, 27.2, 29.6, 32.0, 34.2, 36.2, 38.4, 40.4, 42.2, 44.0, 45.6, 47.0, 48.2, 49.6, 51.0, 52.6, 53.6, 54.6, 55.6, 56.8, 58.0, 59.1, 60.2, 61.2, 62.2, 63.1, 64.0, 64.8, 65.3, 65.6, 66.0, 66.3, 68.5, 69.6, 70.8, 73.3, 74.5, 75.8, 77.0, 78.4, 79.6, 81.2, 82.5, 83.9, 85.4, 86.9, 88.4, 90.0, 91.5, 93.0, 94.4, 95.0, 95.5, 96.5, 97.0  ],
          [1,   0.0,  -10.0,-12.0,-14.0,-16.0,-18.0,-20.0,-22.0,-24.0,-26.0,-28.0,-30.0,-32.0,-34.0,-36.0,-38.0,-40.0,-42.0,-44.0,-46.0,-48.0,-50.0,-52.0,-54.0,-56.0,-58.0,-60.0,-62.0,-64.0,-65.0,-66.0,-67.0,-68.0,-66.0,-64.0,-62.0,-58.0,-56.0,-54.0,-52.0,-50.0,-48.0,-46.0,-44.0,-42.0,-40.0,-38.0,-36.0,-30.0,-36.0,-34.0,-32.0,-28.0,-27.0,-24.0,-22.0 ],
        ];
        break;
      case 'MPG':
        dataObj = [
          [0.0, 0.0,  30.0, 35.0, 40.0, 45.0, 50.0, 55.0, 60.0, 65.0, 70.0],
          [1,   0.0,  -13.0,-20.0,-25.0,-30.0,-35.0,-45.0,-55.0,-60.0,-65.0],
        ];
        break;
      default: // WATER
        dataObj = [
          [0.0, 0.0,  100.0],
          [1,   0.0,  0.0],
        ];
        break;
    }

    return Interpolate.byInternalTable({
      x: percentage,
      y: 1, // one line only=)
      tableAsDoubleArray: dataObj
    });
  }

  static density({ liquidType, temperature, percentage }) {
    const diagram = {};
    let result;
    let t1;
    let t2;
    let numOfDataObj;
    let d1;
    let d2;
    let error = false;
    let report = 'Ok';

    // console.log(`${liquidType} t=${temperature} %=${percentage}`);
    // console.log(obj);
    switch (liquidType) {
      case 'MEG':
        diagram.percentage = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        diagram.temperature = [-45, -40, -35, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
        diagram.data = [
          { // 10%
            percentage: 10,
            range: { tMin: -10, tMax: 100 },
            density: [0, 0, 0, 0, 0, 0, 0, 1017, 1016, 1015, 1014, 1013, 1012, 1011, 1009, 1007, 1006, 1004, 1002, 999, 996, 994, 991, 988, 986, 983, 979, 976, 973, 969]
          },
          { // 20%
            percentage: 20,
            range: { tMin: -10, tMax: 100 },
            density: [0, 0, 0, 0, 0, 0, 0, 1320, 1310, 1030, 1029, 1027, 1026, 1024, 1022, 1021, 1019, 1017, 1014, 1012, 1009, 1006, 1003, 1000, 997, 994, 990, 987, 983, 980]
          },
          { // 30%
            percentage: 30,
            range: { tMin: -10, tMax: 100 },
            density: [0, 0, 0, 0, 0, 0, 0, 1048, 1047, 1046, 1044, 1042, 1041, 1038, 1036, 1034, 1032, 1029, 1026, 1023, 1021, 1018, 1014, 1011, 1008, 1005, 1001, 997, 993, 990]
          },
          { // 40%
            percentage: 40,
            range: { tMin: -25, tMax: 100 },
            density: [0, 0, 0, 0, 1068, 1067, 1066, 1064, 1062, 1061, 1059, 1056, 1054, 1052, 1050, 1047, 1045, 1041, 1038, 1035, 1032, 1029, 1026, 1023, 1019, 1016, 1012, 1009, 1005, 1000]
          },
          { // 50%
            percentage: 50,
            range: { tMin: -35, tMax: 100 },
            density: [0, 0, 1087, 1086, 1085, 1083, 1081, 1079, 1077, 1075, 1073, 1070, 1067, 1064, 1061, 1058, 1055, 1052, 1049, 1046, 1043, 1040, 1037, 1034, 1029, 1026, 1022, 1018, 1014, 1010]
          },
          { // 60%
            percentage: 60,
            range: { tMin: -45, tMax: 100 },
            density: [1110, 1108, 1105, 1103, 1101, 1098, 1096, 1094, 1091, 1088, 1085, 1083, 1080, 1077, 1074, 1071, 1067, 1064, 1060, 1057, 1054, 1051, 1047, 1044, 1040, 1036, 1032, 1028, 1024, 1020]
          },
          { // 70%
            percentage: 70,
            range: { tMin: -45, tMax: 100 },
            density: [1125, 1122, 1120, 1118, 1115, 1112, 1109, 1107, 1104, 1101, 1097, 1094, 1091, 1088, 1084, 1081, 1078, 1074, 1071, 1067, 1064, 1060, 1057, 1053, 1050, 1046, 1042, 1038, 1034, 1030]
          },
          { // 80%
            percentage: 80,
            range: { tMin: -45, tMax: 100 },
            density: [1137, 1134, 1131, 1129, 1126, 1123, 1120, 1117, 1114, 1111, 1108, 1105, 1102, 1098, 1094, 1091, 1087, 1084, 1081, 1077, 1073, 1069, 1065, 1062, 1058, 1054, 1050, 1046, 1043, 1040]
          },
          { // 90%
            percentage: 90,
            range: { tMin: -20, tMax: 100 },
            density: [0, 0, 0, 0, 0, 1133, 1130, 1127, 1123, 1120, 1160, 1113, 1100, 1106, 1102, 1099, 1096, 1093, 1089, 1085, 1082, 1078, 1074, 1070, 1066, 1063, 1059, 1055, 1051, 1047]
          },
          { // 100%
            percentage: 100,
            range: { tMin: -15, tMax: 100 },
            density: [0, 0, 0, 0, 0, 0, 1137, 1134, 1131, 1127, 1124, 1120, 1117, 1113, 1110, 1106, 1103, 1099, 1096, 1093, 1089, 1085, 1081, 1078, 1074, 1070, 1067, 1063, 1059, 1055]
          },
        ];
        /*
        console.group(`Test`);
        console.log(diagram.temperature.length);
        diagram.data.map((e, i)=>{ console.log(`For ${diagram.percentage[i]}%: ${diagram.data[i].density.length} elements`) });
        console.groupEnd(`Test`);
        */
        break;
      case 'MPG':
        diagram.percentage = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        diagram.temperature = [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25];
        diagram.data = [
          { // 10%
            percentage: 10,
            range: { tMin: -5, tMax: 25 },
            density: [0, 0, 0, 0, 0, 1010, 1009, 1008, 1008, 1008, 1006, 1004]
          },
          { // 20%
            percentage: 20,
            range: { tMin: -15, tMax: 25 },
            density: [0, 0, 0, 1024, 1022, 1020, 1020, 1019, 1018, 1017, 1015, 1012]
          },
          { // 30%
            percentage: 30,
            range: { tMin: -10, tMax: 25 },
            density: [0, 0, 0, 0, 1038, 1035, 1033, 1031, 1030, 1026, 1023, 1020]
          },
          { // 40%
            percentage: 40,
            range: { tMin: -20, tMax: 25 },
            density: [0, 0, 1055, 1052, 1050, 1047, 1044, 1041, 1038, 1034, 1032, 1027]
          },
          { // 50%
            percentage: 50,
            range: { tMin: -20, tMax: 25 },
            density: [0, 0, 1064, 1061, 1058, 1055, 1052, 1048, 1044, 1042, 1039, 1032]
          },
          { // 60%
            percentage: 60,
            range: { tMin: -20, tMax: 25 },
            density: [0, 0, 1068, 1065, 1062, 1059, 1056, 1052, 1049, 1046, 1042, 1037]
          },
          { // 70%
            percentage: 70,
            range: { tMin: 5, tMax: 25 },
            density: [0, 0, 0, 0, 0, 0, 0, 1055, 1051, 1048, 1044, 1040]
          },
          { // 80%
            percentage: 80,
            range: { tMin: 5, tMax: 25 },
            density: [0, 0, 0, 0, 0, 0, 0, 1055, 1051, 1048, 1044, 1040]
          },
          { // 90%
            percentage: 90,
            range: { tMin: 5, tMax: 25 },
            density: [0, 0, 0, 0, 0, 0, 0, 1052, 1049, 1045, 1041, 1037]
          },
          { // 100%
            percentage: 100,
            range: { tMin: -30, tMax: 25 },
            density: [1073, 1069, 1065, 1062, 1059, 1055, 1051, 1047, 1044, 1040, 1037, 1033]
          },
        ];
        break;
      case 'WATER':
        diagram.percentage = [100, 100]; // Need to have the range.
        diagram.temperature = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];
        diagram.data = [
          {
            percentage: 100,
            range: { tMin: 0, tMax: 50 },
            density: [999.87, 999.97, 1000.0, 999.97, 999.88, 999.73, 999.53, 999.27, 998.97, 998.62, 998.23, 997.80, 997.33, 996.81, 996.26, 995.68, 995.06, 994.4, 993.72, 993.0, 992.25, 991.47, 990.7, 989.8, 989.0, 988.1]// For each temp value
          },
          { // Copyed.
            percentage: 100,
            range: { tMin: 0, tMax: 50 },
            density: [999.87, 999.97, 1000.0, 999.97, 999.88, 999.73, 999.53, 999.27, 998.97, 998.62, 998.23, 997.80, 997.33, 996.81, 996.26, 995.68, 995.06, 994.4, 993.72, 993.0, 992.25, 991.47, 990.7, 989.8, 989.0, 988.1]
          },
        ];
        break;
      default: break;
    }

    // --- Should be refactored! numOfDataObj must die.
    // Out of percentage range:
    let p1;
    let p2;

    if (
      (percentage < diagram.percentage[0])
      || (percentage > diagram.percentage[diagram.percentage.length - 1])
    ) {
      error = true;
      result = 1000;
      report = `Out of percentage range for ${percentage} %`;
    } else {
      numOfDataObj = diagram.percentage.findIndex(e => percentage === e);
      if (numOfDataObj === -1) { // If =last then last range:
        report = 'Not table percentage value';
        // Попали в промежуток между 2-мя табличными значениями percentage...
        // Need to detect { diagram, error, result, report }
        if (
          (temperature < diagram.temperature[0]) ||
          (temperature > diagram.temperature[diagram.temperature.length - 1])
        ) {
          error = true;
          result = 1000;
          report = 'Out of main temperature range';
        }

        p1 = diagram.percentage.find((e, i, a) => {
          if ((percentage >= e && percentage < a[i + 1])) {
            p2 = a[i + 1];
            return true;
          }
          return false;
        });
        // error = true;
        const dataObj1 = diagram.data.find(e => e.percentage === p1);
        const dataObj2 = diagram.data.find(e => e.percentage === p2);
        let t1_index;
        let t2_index;

        t1 = diagram.temperature.find((e, i, a) => {
          if ((temperature >= e && temperature < a[i + 1])) {
            t2 = a[i + 1];
            t1_index = i;
            t2_index = i + 1;
            return true;
          }
          return false;
        });
        // console.log(t1, t2);
        d1 = dataObj1.density[t1_index];
        d2 = dataObj2.density[t2_index];
        // console.log(d1, d2);

        /*
          Interpolate.bilinear args: x, y, x1, y1, x2, y2, q11, q12, q21, q22
          For example: f(x1, y2) = q12
        */

        result = Interpolate.bilinear({
          x: temperature,
          y: percentage,
          x1: t1,
          y1: p1,
          x2: t2,
          y2: p2,
          q11: d1,
          q12: d1,
          q21: d2,
          q22: d2,
        });
        report += ` / bilinear Interpolate result between t1, p1 = { ${t1}, ${p1} } as x1, y1 for points ${d1}, ${d1} & t2, p2 = { ${t2}, ${p2} } as x2, y2 for points ${d2}, ${d2}`;
      } else {
        if (
          (temperature < diagram.temperature[0]) ||
          (temperature > diagram.temperature[diagram.temperature.length - 1]) ||
          (temperature < diagram.data[numOfDataObj].range.tMin) ||
          (temperature > diagram.data[numOfDataObj].range.tMax)
        ) {
          error = true;
          result = 1000;
          report = `Out of temperature range for ${percentage} % / Temp value should be between ${diagram.data[numOfDataObj].range.tMin} & ${diagram.data[numOfDataObj].range.tMax} C`;
        }

        if (error === false) {
          // If =last then last range:
          // console.log(diagram.temperature[diagram.temperature.length-1])
          if (temperature === diagram.temperature[diagram.temperature.length - 1]) {
            t1 = diagram.temperature[diagram.temperature.length - 2];
            t2 = diagram.temperature[diagram.temperature.length - 1];
            d1 = diagram.data[numOfDataObj].density[diagram.temperature.length - 2];
            d2 = diagram.data[numOfDataObj].density[diagram.temperature.length - 1];
          } else {
            // DETECT the t1 & t2 - is the min & max values of local t range
            // ...and d1 & d2
            for (let i = 0, max = diagram.temperature.length; i < max; i++) { // console.log(i);
              if (temperature < diagram.temperature[diagram.temperature.length - 1] && temperature > diagram.temperature[diagram.temperature.length - 2]) {
                t1 = diagram.temperature[diagram.temperature.length - 2];
                t2 = diagram.temperature[diagram.temperature.length - 1];
                d1 = diagram.data[numOfDataObj].density[diagram.temperature.length - 2];
                d2 = diagram.data[numOfDataObj].density[diagram.temperature.length - 1];
              } else if (temperature >= diagram.temperature[i] && temperature < diagram.temperature[i + 1]) {
                t1 = diagram.temperature[i];
                t2 = diagram.temperature[i + 1];
                d1 = diagram.data[numOfDataObj].density[i];
                d2 = diagram.data[numOfDataObj].density[i + 1];
              } else {
                // console.error(`${diagram.temperature[i]} -- ${diagram.temperature[i+1]} wtf`);
              }
            }
          }

          report += ` / Line Interpolate result between t1= ${t1} and t2= ${t2} & d1= ${d1} and d2= ${d2}`;
          result = Interpolate.linear({
            x: temperature,
            x1: t1,
            y1: d1,
            x2: t2,
            y2: d2,
          });
        }
      }
      /*
      console.group(`Local range`);
      console.table({
        temperature: `${t1} <> ${temperature} <> ${t2}`,
        density: `${d1} <> ${result} <> ${d2}`,
        percentage: `${p1} <> ${percentage} <> ${p2}`,
      });
      console.groupEnd(`Local range`);
      */
    }
    // --- ---

    report = `${liquidType} density report: ${report}`;

    return {
      diagram,
      error,
      result,
      report,
    };
  }

  static getRe({
    flow, // m3/h
    diameter, // m
    kinematicViscosity, // m2/s
  }) {
    const v = (flow / 3600) / (Math.PI * (diameter ** 2) / 4);

    return {
      v,
      result: v * diameter / (kinematicViscosity * (10 ** (-6))),
      // Не найден достоверный алгоритм...
      // http://www.hydro-pnevmo.ru/topic.php?ID=213
      // result: ((flow / 3600) * 4 * (diameter / 4)) / (kinematicViscosity * 1 * (10 ** (-6))),
    };
  }

  static getKinematicViscosity({
    liquidType,
    percentage,
    temperature,
  }) {
    let result;
    let msg;

    switch (liquidType) {
      case 'MEG':
        result = Interpolate.byInternalTable({
          x: temperature,
          y: percentage,
          tableAsDoubleArray: [
            [0.0,   -40.0,  -20.0,  -10.0,  0.0,    20.0,   40.0,   60.0,   80.0,   100.0],
            [0.0,   1.789,  1.789,  1.789,  1.789,  1.006,  0.659,  0.478,  0.365,  0.295],
            [20.0,  5.000,  5.0000, 5.0,    3,      1.6,    1.0,    0.7,    0.52,   0.41],
            [34.0,  11.000, 11.0,   10.000, 4.6,    2.2,    1.5,    0.98,   0.68,   0.51],
            [52.0,  100.0,  25.0,   24.000, 9.5,    4.5,    2.4,    1.5,    1.0,    0.7],
          ],
        });
        if (percentage > 45.0 || percentage < 25.0) {
          msg = `Кинематическая вязкость может быть расчитана корректно для ${liquidType} 20% .. 52%`;
          result = 0.0;
        } else {
          msg = `Kinematic Viscosity ${liquidType} ${percentage}% for t = ${temperature} C`;
        }
        break;
      case 'MPG':
        result = Interpolate.byInternalTable({
          x: temperature,
          y: percentage,
          tableAsDoubleArray: [
            [0.0,   -30.0,  -20.0,  -10.0,  0.0,    20.0,   40.0,   60.0,   80.0,   100.0],
            [0.0,   1.789,  1.789,  1.789,  1.789,  1.006,  0.659,  0.478,  0.365,  0.295],
            [25.0,  9.900,  9.900,  9.9,    6.0,    2.8,    1.4,    0.9,    0.68,   0.52],
            [37.0,  45.000, 45.0,   44.000, 12.0,   4.4,    2.2,    1.3,    0.9,    0.7],
            [45.0,  150.0,  70.0,   30.0,   18.0,   6.0,    2.9,    1.6,    1.1,    0.82],
          ],
        });
        if (percentage > 45.0 || percentage < 25.0) {
          msg = `Кинематическая вязкость может быть расчитана корректно для ${liquidType} 25% .. 45%`;
        } else {
          msg = `Kinematic Viscosity ${liquidType} ${percentage}% t = ${temperature} C`;
        }
        break;
      default: // WATER
        result = Interpolate.byInternalTable({
          x: temperature,
          y: 1,
          tableAsDoubleArray: [
            [0.0, 0.0,    20.0,    40.0,    60.0,    80.0,    100.0,    120.0,  140.0,  160.0,  180.0,  200.0,  220.0,  240.0,  260.0,  280.0,  300.0],
            [1,   1.789,  1.006,   0.659,   0.478,   0.365,   0.295,    0.252,  0.217,  0.191,  0.173,  0.158,  0.148,  0.141,  0.135,  0.131,  0.128],
          ],
        });
        msg = `${liquidType} Kinematic Viscosity calculated`;
    }
    return { result, msg };
  }

  static getTubePressureDrop({
    Re,
    tubeLength,
    tubeDiameter,
    density,
    v,
  }) {
    let f;

    if (Re < 2100) {
      f = 64 / Re;
    } else {
      f = 1.325 / (Math.log((0.000001527 / (3.7 * tubeDiameter / 1000)) + (5.74 / (Re ** 0.9))) ** 2);
    }

    const pd = f * tubeLength / (tubeDiameter) * 1 / 2 * density * (v ** 2);

    return {
      kPa: pd / 1000,
      bar: pd / 100000,
    };
  }
}

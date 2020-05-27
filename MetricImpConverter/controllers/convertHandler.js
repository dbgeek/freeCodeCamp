/*
*
*
*       Complete the handler logic below
*
*/
const unit = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
const returnUnit = {
  'gal': 'l',
  'l': 'gal',
  'mi': 'km',
  'km': 'mi',
  'lbs': 'kg',
  'kg': 'lbs'
};

function ConvertHandler() {

  this.getNum = function (input) {
    const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.|/]{0,1}[\d]+/g;
    let result = input.match(NUMERIC_REGEXP);
    if (result === null) {
      return 1;
    }
    if (result.length > 2) return 'invalid number';
    if (result.length === 1) {
      if (result[0].includes('/')) {
        let splited = result[0].split('/');
        return splited[0] / splited[1];
      } else {
        return result[0];
      }
    } else {
      if (result[0].includes('/') && result[1].includes('/')) {
        return 'invalid number';
      } else {
        const v1 = result[0].replace('/', '');
        const v2 = result[1].replace('/', '');
        return v1 / v2;
      }
    }
  };

  this.getUnit = function (input) {
    let regex1 = /[a-z]/i
    let letter = regex1.exec(input);
    let result = input.slice(letter.index);
    if (unit.includes(result.toLowerCase())) {
      return result.toLowerCase();
    }
    return 'invalid unit';
  };

  this.getReturnUnit = function (initUnit) {
    return returnUnit[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    const spellOut = {
      'gal': 'gallons',
      'l': 'litres',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellOut[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        return initNum * galToL;
      case 'l':
        return initNum / galToL;
      case 'mi':
        return initNum * miToKm;
      case 'km':
        return initNum / miToKm;
      case 'lbs':
        return initNum * lbsToKg;
      case 'kg':
        return initNum / lbsToKg;
    }
    console.log(initUnit);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };
  };

}

module.exports = ConvertHandler;

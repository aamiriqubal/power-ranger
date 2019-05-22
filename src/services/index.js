export const getArrayFromString = (value) => {
  try {
    const inputObj = [];
    value.replace(/ /g, '').split('\n').filter(obj => obj.trim() !== '').forEach(XYasString => {
      inputObj.push(XYasString
        .replace('(', '')
        .replace(')', '')
        .split(',')
        .map(obj => {
          const number = parseInt(obj);
          if (!/^[0-9]*$/.test(number)) {
            throw new Error(`Input field should only contain numbers. value: "${obj}" not acceptable.`)
          }
          return number;
        }));
    });
    if (inputObj.find(obj => obj.length !== 2)) {
      throw new Error('Improper x, y as input. Object length should be 2.');
    }
    let parsedObject = [];
    inputObj.forEach(obj => {
      parsedObject.push({ x: obj[0], y: obj[1] })
    })
    return parsedObject;
  } catch (err) {
    throw err;
  }
}

const getDistance = (x2, y2, x1, y1) => {
  const dist = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
  return dist;
}

export const findAndGetLinkStationAndPower = (input) => {
  const LinkStations = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];
  const x = input.x;
  const y = input.y;
  const powerObj = [];

  LinkStations.forEach(ls => {
    const distance = getDistance(ls[0], ls[1], x, y);
    const reach = ls[2];
    if (reach < distance) {
      powerObj.push(0);
    } else {
      powerObj.push(reach - distance);
    }
  })
  let maxPower = 0;
  let maxPowerIndex = -1;
  powerObj.forEach((power, index) => {
    if (maxPower <= power) {
      maxPower = power;
      maxPowerIndex = index;
    }
  })
  const suitableLinkStation = LinkStations[maxPowerIndex].splice(0, 2);
  const result = {
    x: suitableLinkStation[0],
    y: suitableLinkStation[1],
    maxPower
  }
  suitableLinkStation.push(maxPower);
  return result;
}

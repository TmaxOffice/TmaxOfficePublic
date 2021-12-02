import { wStSignedTwipsMeasure, wStDecimalNumber } from 'ooxml/WordXmlTypes';

export function twipToPoint(twip: number): number {
  return twip / 20;
}

export function pointToTwip(point: number): number {
  return point * 20;
}

export function pointToPixel(point: number): number {
  return point * 1.333333333333;
}

export function pixelToPoint(pixel: number): number {
  return pixel / 1.333333333333;
}

export function pointToInch(point: number): number {
  return point / 1440;
}

export function charToTwip(char: wStDecimalNumber): number {
  // 1 char는 xml에 100으로 저장되어 100으로 나눔
  // 1 char === 200 twip
  return (char / 100) * 200;
}

export function twipToChar(twip: number): wStDecimalNumber {
  return (twip / 200) * 100;
}

export function charToPixel(char: wStDecimalNumber): number {
  // 1 char는 xml에 100으로 저장되어 100으로 나눔
  // 나중에 conversion factor로 구현해야할듯
  return pointToPixel(twipToPoint(charToTwip(char)));
}

export function pixelToChar(pixel: number): wStDecimalNumber {
  return twipToChar(pointToTwip(pixelToPoint(pixel)));
}

export function twipToPixel(twip: wStSignedTwipsMeasure): number {
  // 임시로 unit에는 twip 단위만 들어오기 때문에 twip 기준으로 계산
  if (typeof twip === 'number') {
    return pointToPixel(twipToPoint(twip));
  }
  // string type인 경우 여기서 정규표현식을 통해 숫자, 문자를 분리해서 단위에 따라 다르게 계산해야함
  return 0;
}

export function emuToPixel(input: number): number {
  // 1 pixel = 9525 emu
  return input * 0.00010498687664041994750656167979003;
}

export function pixelToEmu(input: number): number {
  return input * 9525;
}

export function simpleTypeAngleToDegree(input: number): number {
  return input / 60000;
}

export function degreeToSimpleTypeAngle(input: number): number {
  return input * 60000;
}

export function radianToDegree(input: number): number {
  return (input * 180) / Math.PI;
}

export function normalizeDegree(input: number): number {
  return input < 0 ? 360 + (input % 360) : input % 360;
}

// ToOffice ConvUtil에서 가져옴
function toRoman(orderNum: number, isUpper: boolean): string {
  let num = orderNum;
  if (orderNum === 0) {
    num += 1;
  }

  const signs = ['I', 'V', 'X', 'L', 'C', 'D', 'M', 'i', 'v', 'x', 'l', 'c', 'd', 'm'];
  let result = '';
  const arabiaNum = num.toString();
  const offset = isUpper === true ? 0 : 7;
  for (let i = 0; i < arabiaNum.length; i += 1) {
    const d = arabiaNum.length - i - 1;
    const ch = arabiaNum[i];
    switch (ch) {
      case '1':
        result += signs[d * 2 + offset];
        break;
      case '2':
        result += signs[d * 2 + offset];
        result += signs[d * 2 + offset];
        break;
      case '3':
        result += signs[d * 2 + offset];
        result += signs[d * 2 + offset];
        result += signs[d * 2 + offset];
        break;
      case '4':
        result += signs[d * 2 + offset];
        result += signs[d * 2 + 1 + offset];
        break;
      case '5':
        result += signs[d * 2 + 1 + offset];
        break;
      case '6':
        result += signs[d * 2 + 1 + offset];
        result += signs[d * 2 + offset];
        break;
      case '7':
        result += signs[d * 2 + 1 + offset];
        result += signs[d * 2 + offset];
        result += signs[d * 2 + offset];
        break;
      case '8':
        result += signs[d * 2 + 1 + offset];
        result += signs[d * 2 + offset];
        result += signs[d * 2 + offset];
        result += signs[d * 2 + offset];
        break;
      case '9':
        result += signs[d * 2 + offset];
        result += signs[d * 2 + 2 + offset];
        break;
      default:
        break;
    }
  }
  return result;
}

export function toUpperRoman(num: number): string {
  return toRoman(num, true);
}

export function toLowerRoman(num: number): string {
  return toRoman(num, false);
}

export function toAlphabet(arabiaNum: number, isUpper: boolean): string {
  const alphabets = isUpper === true ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz';
  let num = arabiaNum;
  if (arabiaNum === 0) {
    num += 1;
  }
  let m;
  const result = [];
  while (num > 0) {
    m = (num - 1) % 26;
    num = Math.floor((num - 1 - m) / 26);
    result.unshift(alphabets[m]);
  }
  return result.join('');
}

export function toUpperLetter(num: number): string {
  return toAlphabet(num, true);
}

export function toLowerLetter(num: number): string {
  return toAlphabet(num, false);
}

export function toGanada(orderNum: number): string {
  let num = orderNum;
  if (orderNum === 0) {
    num += 1;
  }

  const book = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'];
  const bookIdx = (num - 1) % 14;
  return book[bookIdx];
}

export function toChosung(orderNum: number): string {
  let num = orderNum;
  if (orderNum === 0) {
    num += 1;
  }

  const book = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㄷ', 'ㅍ', 'ㅎ'];
  const bookIdx = (num - 1) % 14;
  return book[bookIdx];
}

export function toDecimalEnclosedCircle(orderNum: number): string {
  let num = orderNum;
  if (orderNum === 0) {
    num += 1;
  }

  const book = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮'];
  if (num > 0 && num <= 15) {
    return book[num - 1];
  }
  return num.toString();
}

export function toDecimalZero(orderNum: number): string {
  if (orderNum < 10) {
    return `0${orderNum.toString()}`;
  }
  return orderNum.toString();
}

export function toOrdinal(num: number): string {
  const book = ['th', 'st', 'nd', 'rd'];
  const remainder = num % 10;
  if (book[remainder] !== undefined) {
    return num.toString() + book[remainder];
  }
  return `${num.toString()}th`;
}

export function toKoreanDigital(orderNum: number): string {
  let result = '';
  const book = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const numString = orderNum.toString();

  for (let charIdx = 0; charIdx < numString.length; charIdx += 1) {
    result += book[Number(numString[charIdx])];
  }

  return result;
}

export function toKoreanDigital2(orderNum: number): string {
  let num = orderNum;
  if (orderNum === 0) {
    num += 1;
  }

  return num.toLocaleString('zh-Hans-CN-u-nu-hanidec');
}

function makeThousand(numAry: Array<string>): string {
  const book = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const result: Array<string> = [];

  for (let unit = 0; unit < numAry.length; unit += 1) {
    const numChar = numAry[unit];
    if (numChar !== '0') {
      // 단위 숫자
      if (unit === 1) {
        result.push('십');
      } else if (unit === 2) {
        result.push('백');
      } else if (unit === 3) {
        result.push('천');
      }

      // 현재 숫자
      if (numChar === '1') {
        if (unit === 0) {
          result.push(book[Number(numChar)]);
        }
      } else {
        result.push(book[Number(numChar)]);
      }
    }
  }
  return result.reverse().join('');
}
// 9999억 까지 변환
export function toKoreanCounting(orderNum: number): string {
  if (orderNum === 0 || orderNum > 999999999999) {
    return '영';
  }
  const reverseNumAry = orderNum.toString().split('').reverse();

  const oneStr = makeThousand(reverseNumAry.slice(0, 4));
  let manStr = makeThousand(reverseNumAry.slice(4, 8));
  let ukStr = makeThousand(reverseNumAry.slice(8, 12));
  if (ukStr !== '') {
    ukStr += '억';
  }
  if (manStr !== '') {
    // 일만~ 인 경우 '일'은 생략됨
    if (ukStr === '' && manStr === '일') {
      manStr = '';
    }
    manStr += '만';
  }
  return ukStr + manStr + oneStr;
}

export function toKoreanLegal(orderNum: number): string {
  let num = orderNum;
  if (orderNum === 0) {
    num += 1;
  }

  let result = '';
  const oneLegal = ['', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉'];
  const tenLegal = ['', '열', '스물', '서른', '마흔', '쉰', '예순', '일흔', '여든', '아흔'];

  // arabia의 자리수(digitCount) 세기
  if (num < 100) {
    const one = num % 10;
    const ten = Math.floor(num / 10);
    result += tenLegal[ten] + oneLegal[one];
  } else {
    result = toKoreanCounting(orderNum);
  }

  return result;
}

function convTensToOrdinalWord(orderNum: number): string {
  let result = '';
  const unitsAndTeens = [
    'zeroth',
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth',
    'eleventh',
    'twelveth',
    'thirteenth',
    'fourteenth',
    'fifteenth',
    'sixteenth',
    'seventeenth',
    'eighteenth',
    'nineteenth',
  ];

  const tens = [
    '',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  if (orderNum >= 100) {
    return result;
  }

  if (orderNum < 20) {
    result = unitsAndTeens[orderNum];
  } else {
    const ten = Math.floor(orderNum / 10);
    const unit = orderNum % 10;
    result = tens[ten];
    if (unit !== 0) {
      result += '-';
    }
    result += unitsAndTeens[unit];
  }

  return result;
}

function convHundredsToOrdinalWord(orderNum: number): string {
  let result;
  const units = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  if (orderNum < 100) {
    result = convTensToOrdinalWord(orderNum);
  } else {
    const hundreds = Math.floor(orderNum / 100);
    const unitsAndTens = orderNum % 100;

    result = `${units[hundreds]} hundred`;
    result += convTensToOrdinalWord(unitsAndTens);
  }

  return result;
}

export function toOrdinalText(orderNum: number): string {
  let result = '';
  let tempStr = '';

  if (orderNum < 1000) {
    tempStr = convHundredsToOrdinalWord(orderNum);
  } else if (orderNum < 1000000) {
    const thousands = Math.floor(orderNum / 1000);
    const hundreds = orderNum % 1000;
    tempStr = `${convHundredsToOrdinalWord(thousands)} thousand ${convHundredsToOrdinalWord(
      hundreds
    )}`;
  } else if (orderNum < 1000000000) {
    const millions = Math.floor(orderNum / 1000000);
    const thousands = Math.floor((orderNum % 1000000) / 1000);
    const hundreds = orderNum % 1000;
    tempStr = `${convHundredsToOrdinalWord(millions)} million ${convHundredsToOrdinalWord(
      thousands
    )} thousand ${convHundredsToOrdinalWord(hundreds)}`;
  } else if (orderNum <= 4294967295) {
    // const is less than 4294967295
    const billions = Math.floor(orderNum / 1000000000);
    const millions = Math.floor((orderNum % 1000000000) / 1000000);
    const thousands = Math.floor((orderNum % 1000000) / 1000);
    const hundreds = orderNum % 1000;
    tempStr = `${convHundredsToOrdinalWord(billions)} billion ${convHundredsToOrdinalWord(
      millions
    )} million ${convHundredsToOrdinalWord(thousands)} thousand ${convHundredsToOrdinalWord(
      hundreds
    )}`;
  }

  result += tempStr[0].toUpperCase();
  result += tempStr.substr(1, tempStr.length - 1);

  return result;
}

function convTensToCardinalWord(orderNum: number): string {
  let result = '';
  const unitsAndTeens = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];

  const tens = [
    '',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  if (orderNum >= 100) {
    return result;
  }

  if (orderNum < 20) {
    result = unitsAndTeens[orderNum];
  } else {
    const ten = Math.floor(orderNum / 10);
    const unit = orderNum % 10;
    result = tens[ten];
    if (unit !== 0) {
      result += '-';
    }
    result += unitsAndTeens[unit];
  }

  return result;
}

function convHundredsToCardinalWord(orderNum: number): string {
  let result;
  const units = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  if (orderNum < 100) {
    result = convTensToCardinalWord(orderNum);
  } else {
    const hundreds = Math.floor(orderNum / 100);
    const unitsAndTens = orderNum % 100;

    result = `${units[hundreds]} hundred`;
    result += convTensToCardinalWord(unitsAndTens);
  }

  return result;
}

export function toCardinalText(orderNum: number): string {
  // 라이브러리 쓰면 어떤가?
  let result = '';
  let tempStr = '';

  if (orderNum < 1000) {
    tempStr = convHundredsToCardinalWord(orderNum);
  } else if (orderNum < 1000000) {
    const thousands = Math.floor(orderNum / 1000);
    const hundreds = orderNum % 1000;
    tempStr = `${convHundredsToCardinalWord(thousands)} thousand ${convHundredsToCardinalWord(
      hundreds
    )}`;
  } else if (orderNum < 1000000000) {
    const millions = Math.floor(orderNum / 1000000);
    const thousands = Math.floor((orderNum % 1000000) / 1000);
    const hundreds = orderNum % 1000;
    tempStr = `${convHundredsToCardinalWord(millions)} million ${convHundredsToCardinalWord(
      thousands
    )} thousand ${convHundredsToCardinalWord(hundreds)}`;
  } else if (orderNum <= 4294967295) {
    // const is less than 4294967295
    const billions = Math.floor(orderNum / 1000000000);
    const millions = Math.floor((orderNum % 1000000000) / 1000000);
    const thousands = Math.floor((orderNum % 1000000) / 1000);
    const hundreds = orderNum % 1000;
    tempStr = `${convHundredsToCardinalWord(billions)} billion ${convHundredsToCardinalWord(
      millions
    )} million ${convHundredsToCardinalWord(thousands)} thousand ${convHundredsToCardinalWord(
      hundreds
    )}`;
  }

  result += tempStr[0].toUpperCase();
  result += tempStr.substr(1, tempStr.length - 1);

  return result;
}

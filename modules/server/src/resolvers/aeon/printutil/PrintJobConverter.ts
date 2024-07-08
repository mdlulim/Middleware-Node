type TEXT_SIZE = 'normal' | 'large';
type TEXT_STYLE = 'normal' | 'bold';
type ALIGN = 'left' | 'center' | 'right';
type BARCODE = 'ean13' | 'code39' | 'code128' | 'itf' | 'pdf417';

function addText(
  text: string,
  size: TEXT_SIZE,
  style: TEXT_STYLE,
  align: ALIGN
) {
  return {
    type: 'text',
    align: align,
    style: style,
    size: size,
    value: text ? text : '',
  };
}

function addLogo(text: string, align: ALIGN) {
  return {
    type: 'image',
    url: 'https://i.imgur.com/EHeuVSD.gif',
    id: text ? text : '0',
    align: align,
  };
}

function addLine() {
  return {
    type: 'line',
  };
}

function addBarcode(value: string, type: BARCODE) {
  return {
    type: 'barcode',
    format: type,
    value: value ? value : '',
  };
}

function pinCheck(text: string) {
  if (text) {
    if (text.length <= 4) {
      return text.match('^[0-9]*$');
    } else {
      return (
        text.match('^(\\d{4}[ ]{1,}\\d{1}).*$') ||
        text.match('^(\\d{3}[ ]{1,}\\d{1}).*$')
      );
    }
  }
  return false;
}

function lineWrap(s: string, width: number) {
  const lines = [];
  if (s) {
    let newLine = '';
    if (s.length > width) {
      const words = s.split(' ');
      for (let i = 0; i < words.length; i++) {
        if (newLine.length + words[i].length + 1 < width) {
          if (newLine.length === 0) {
            newLine += words[i];
          } else {
            newLine += ' ' + words[i];
          }
        } else {
          lines.push(newLine);
          newLine = '';
          if (words[i].length > width) {
            let tmpWord = words[i];
            while (tmpWord.length > width) {
              lines.push(tmpWord.substring(0, width - 1));
              tmpWord = tmpWord.substring(width - 1);
            }
            newLine = tmpWord;
          } else {
            newLine = words[i];
          }
        }
      }
    } else {
      newLine = s;
    }
    lines.push(newLine);
  }
  return lines;
}

export function printjobToJson(printjob: any) {
  const printlines: any = [];

  for (const line of printjob.line) {
    switch (line.f) {
      case 'A':
      case 'G':
      case 'K':
      case 'M':
      case 'O':
        printlines.push(addText(line.$t, 'normal', 'normal', 'left'));
        break;

      case 'B':
      case 'C':
      case 'D':
        printlines.push(addText(line.$t, 'normal', 'bold', 'left'));
        break;

      case 'E':
        let text = line.$t;
        const pin = pinCheck(text);
        if (pin) {
          text = text.replace('\\s{2,}', ' ');
        }
        const wrappedLines = lineWrap(text, pin ? 16 : 32);
        for (const line of wrappedLines) {
          printlines.push(
            addText(line, pin ? 'large' : 'normal', 'bold', 'center')
          );
        }
        break;

      case 'H':
        printlines.push(addText(line.$t, 'normal', 'normal', 'center'));
        break;

      case 'L':
        printlines.push(addLogo(line.$t, 'center'));
        break;

      case 'N':
        printlines.push(addLine());
        break;

      case 'P':
        printlines.push(addBarcode(line.$t, 'ean13'));
        break;

      case 'Q':
        printlines.push(addBarcode(line.$t, 'code39'));
        break;

      case 'U':
        printlines.push(addBarcode(line.$t, 'itf'));
        break;

      case 'X':
        printlines.push(addBarcode(line.$t, 'code128'));
        break;
    }
  }

  return {printjob: printlines};
}

export function getPrintJob(printLines: any): any {
  if (printLines == null) {
    return null;
  }
  const print = [];
  for (const line of printLines) {
    switch (line.f) {
      //centered text
      case 'H':
        print.push({
          type: 'text',
          align: 'center',
          style: 'normal',
          size: 'normal',
          value: line.$t,
        });
        break;

      //normal text
      case 'A':
      case 'G':
      case 'K':
      case 'M':
      case 'O':
        print.push({
          type: 'text',
          align: 'left',
          style: 'normal',
          size: 'normal',
          value: line.$t,
        });
        break;

      //bold text
      case 'B':
      case 'C':
      case 'D':
        print.push({
          type: 'text',
          align: 'left',
          style: 'bold',
          size: 'normal',
          value: line.$t,
        });
        break;

      //center bold text
      case 'E':
        print.push({
          type: 'text',
          align: 'center',
          style: 'bold',
          size: 'normal',
          value: line.$t,
        });
        break;

      // horizontal line
      case 'N':
        print.push({
          type: 'line',
        });
        break;

      //EAN 13 barcode
      case 'P':
        print.push({
          type: 'barcode',
          format: 'ean13',
          value: line.$t,
        });
        break;

      //Code 39 barcode
      case 'Q':
        print.push({
          type: 'barcode',
          format: 'code39',
          value: line.$t,
        });
        break;

      //ITF barcode
      case 'U':
        print.push({
          type: 'barcode',
          format: 'itf',
          value: line.$t,
        });
        break;

      //Code 128 barcode
      case 'X':
        print.push({
          type: 'barcode',
          format: 'code128',
          value: line.$t,
        });
        break;

      //Hardcoded blu approved logo for now
      //todo: this needs more work
      case 'L':
        print.push({
          type: 'image',
          url: 'https://imgur.com/EHeuVSD.gif',
          id: 'blu01',
          align: 'center',
        });
        break;

      default:
    }
  }

  return {
    printjob: print,
  };
}

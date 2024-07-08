import PDFDocument from 'pdfkit';
import {Base64Encode} from 'base64-stream';
import {annexLines, contractLines} from './T3tContractLines';

let doc: any = null;
const largeSize = 20;
const normalSize = 10;
const fontNormal = 'Helvetica';
const fontBold = 'Helvetica-Bold';

enum ALIGN {
  LEFT,
  CENTER,
  RIGHT,
}

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  customer: {
    identity_type: number;
    identity_reference: string;
    addresses: Address[];
    contacts: Contact[];
  };
}

interface Address {
  address_line_1: string;
  address_line_2: string;
  city: string;
  province: string;
  postal_code: string;
}

interface Contact {
  name: string;
  mail_address: string;
  cell_no: string;
}

function addText(
  text: string,
  bold?: boolean,
  underline?: boolean,
  large?: boolean,
  align?: ALIGN
) {
  if (doc) {
    let options: any = {};
    doc.fontSize(large ? largeSize : normalSize);
    doc.font(bold ? fontBold : fontNormal);
    if (align === ALIGN.CENTER) {
      options = {align: 'center', underline: underline};
    } else if (align === ALIGN.RIGHT) {
      options = {align: 'right', underline: underline};
    } else {
      options = {underline: underline};
    }
    doc.text(text, 50, doc.y, options);
    doc.moveDown();
  }
}

function addText2(text1: string, text2: string) {
  const y = doc.y;
  doc.font(fontBold);
  doc.text(text1, 50, y, {width: 250});
  doc.font(fontNormal);
  doc.text(':', 220, y);
  doc.text(text2, 250, y, {width: 250});
  doc.moveDown();
}

function addSignature(base64: string) {
  const y = doc.y;
  doc.text('Client Signature:', 50, y + 75, {width: 100});
  doc.image(Buffer.from(base64, 'base64'), 150, y, {width: 150, height: 75});
  doc.text('Date:', 350, y + 75, {width: 100});
  doc.text(new Date().toISOString().split('T')[0], 400, y + 75, {width: 100});
}

function addPageNumFooter(num: number) {
  const bottom = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;
  doc.text('Page ' + num, 0.5 * (doc.page.width - 100), doc.page.height - 50, {
    width: 100,
    align: 'center',
    lineBreak: false,
  });
  // Reset text writer position
  doc.text('', 50, 50);
  doc.page.margins.bottom = bottom;
}

const createContract = async (
  image: string,
  profileData: ProfileData,
  deviceId: string,
  account: string
) => {
  return new Promise<string>((resolve, reject) => {
    try {
      let pageNum = 0;

      doc = new PDFDocument();

      let finalString = ''; // contains the base64 string for the pdf
      const stream = doc.pipe(new Base64Encode());
      stream.on('data', function (chunk: string) {
        finalString += chunk;
      });
      stream.on('end', function () {
        resolve(finalString);
      });

      addPageNumFooter(++pageNum);
      doc.on('pageAdded', () => {
        addPageNumFooter(++pageNum);
      });

      doc.moveDown(10);
      addText('T3TSA VENDOR CONTRACT', true, false, true, ALIGN.CENTER);
      addText(
        '(This "agreement" or "contract")',
        false,
        false,
        false,
        ALIGN.CENTER
      );
      addText('CONCLUDED BY AND BETWEEN', false, false, false, ALIGN.CENTER);
      addText(
        'T3 TELECOMS SOUTH AFRICA (PTY) Ltd',
        true,
        false,
        false,
        ALIGN.CENTER
      );
      addText('("T3TSA")', false, false, false, ALIGN.CENTER);
      addText('Registration No', false, false, false, ALIGN.CENTER);
      addText('2018/362200/07', false, false, false, ALIGN.CENTER);
      addText('And', false, false, false, ALIGN.CENTER);
      addText(
        profileData.first_name + ' ' + profileData.last_name,
        true,
        false,
        false,
        ALIGN.CENTER
      );
      addText(
        'Identity No / Company Registration No',
        false,
        false,
        false,
        ALIGN.CENTER
      );
      addText(
        profileData.customer.identity_reference,
        false,
        false,
        false,
        ALIGN.CENTER
      );
      addText('("T3TSA VENDOR")', false, false, false, ALIGN.CENTER);
      addText(
        '(Collectively the "Parties")',
        false,
        false,
        false,
        ALIGN.CENTER
      );
      doc.addPage();

      addText('T3TSA VENDOR DETAILS', true, true);
      addText2(
        'Full Name & Surname',
        profileData.first_name + ' ' + profileData.last_name
      );
      addText2(
        'Business Trading Name',
        profileData.first_name + ' ' + profileData.last_name
      );
      addText2('VAT Reg. No.', ' ');
      addText2(
        'Identity/Passport/Asylum No',
        profileData.customer.identity_reference
      );

      let address = ' ';
      const lastAddr =
        profileData.customer.addresses[
          profileData.customer.addresses.length - 1
        ];
      if (lastAddr) {
        address =
          lastAddr.address_line_1 +
          (lastAddr.address_line_2 && lastAddr.address_line_2.length > 0
            ? ''
            : ', ' + lastAddr.address_line_2) +
          ', ' +
          lastAddr.city +
          ', ' +
          lastAddr.province +
          ', ' +
          lastAddr.postal_code;
      }

      const lastContact =
        profileData.customer.contacts[profileData.customer.contacts.length - 1];

      addText2('Residential Address', address);
      addText2('Contact Details', lastContact.cell_no);
      addText2('Contact Person', lastContact.name);
      addText2('Email Address', lastContact.mail_address);
      addText2('Device ID', deviceId);
      addText2('Account Number', account);
      doc.addPage();

      for (const line of contractLines) {
        addText(line, false, false, false, ALIGN.LEFT);
      }

      doc.moveDown(3);
      addSignature(image);
      doc.addPage();

      for (const line of annexLines) {
        addText(line.line, line.bold, line.underline, false, ALIGN.LEFT);
      }
      doc.moveDown(3);
      addSignature(image);

      doc.end();
    } catch (ex) {
      console.log(ex);
      reject(ex.message);
    }
  });
};

export {createContract};

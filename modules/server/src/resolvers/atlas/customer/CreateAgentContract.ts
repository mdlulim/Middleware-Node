import PDFDocument from 'pdfkit';
import {Base64Encode} from 'base64-stream';
import {
  contractLines,
  contractLines2,
  contractLines3,
  contractLines4,
} from './AgentContractLines';

// Create a new DOM environment

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
  cellNumber: string;
  names: string;
  email: string;
  identity_reference: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postal_code: string;
  province: string;
  payment_method: string;
  identity_type: string;
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
  doc.font(fontNormal);
  doc.text(text1, 50, y, {width: 250});
  doc.font(fontNormal);
  doc.text(':', 220, y);
  doc.text(text2, 250, y, {width: 250});
  doc.moveDown();
}

function addSignature(name: string, base64: string) {
  const y = doc.y;
  doc.text(name + ':', 50, y + 75, {width: 100});
  doc.image(Buffer.from(base64, 'base64'), 150, y + 40, {
    width: 120,
    height: 50,
  });
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
  imageRep: string,
  profileData: ProfileData,
  contract: any
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

      doc.moveDown(3);
      addText('CUSTOMER APPLICATION FORM', true, false, true, ALIGN.CENTER);
      addText(
        '(This "agreement" or "contract")',
        false,
        false,
        false,
        ALIGN.CENTER
      );
      addText('Customer information', true, false);
      addText2('Applicant NAME & SURNAME (in full)', profileData.names);
      addText2('Shop Trading Name', profileData.names);
      addText('Address');
      addText2('Complex Name', profileData.address_line_1);
      addText2('Complex Number: ', profileData.address_line_2);
      addText2('Street Name', profileData.address_line_1);
      addText2('Suburb', profileData.address_line_2);
      addText2('Town', profileData.city);
      addText2('Postal Code', profileData.postal_code);
      addText2('Province', profileData.province);
      addText2('Address Postal', '');
      addText2('Province', '');
      addText2('Telephone Number', '');
      addText2('Fax Number', '');
      addText2('Contact Person', profileData.names);
      addText2('Mobile Number', profileData.cellNumber);
      addText2('Email Address', profileData.email);
      addText2('PROOF OF ID', profileData.identity_type);
      addText2('Identity/Passport/Asylum No', profileData.identity_reference);
      addText('(Collectively the "Parties")');
      addText2('Payment Method:', profileData.payment_method);
      addText2(' Credit Limit:', '');
      addText2(' Terms:', '');
      addText2(' Credit Limit:', '');
      addText2('Approved: David Wheatley', '');
      doc.addPage();
      doc.moveDown(3);
      addText('CUSTOMER APPLICATION FORM', true, false, true, ALIGN.CENTER);
      addText('TERMS AND CONDITIONS', true, false, false, ALIGN.LEFT);
      for (const line of contractLines) {
        addText(line, false, false, false, ALIGN.LEFT);
      }
      addText('STARTER PACK DEAL', true, false, false, ALIGN.LEFT);
      if (contract) {
        (Object.keys(contract) as (keyof typeof contract)[]).forEach((key) => {
          // 👇️ name Tom 0, country Chile 1
          addText(
            contract[key].name.replace('Base Deal', ' ') +
              '   |   Activation Bonus: R' +
              parseFloat(contract[key].act) +
              '   |   Ongoing Commission: ' +
              Number(contract[key].ogr) +
              '%'
          );
        });
      }

      for (const line of contractLines2) {
        addText(line, false, false, false, ALIGN.LEFT);
      }
      doc.moveDown(1);
      addSignature('Client Signature', image);
      addSignature('T3TSA Representative', imageRep);
      doc.addPage();
      doc.moveDown(3);
      addText('RICA AGENT CONTRACT', true, false, true, ALIGN.CENTER);
      addText(
        'Please send all RICA details in one email to adminteam@t3tsa.co.za',
        false,
        false,
        false,
        ALIGN.CENTER
      );
      addText(
        'RICA AGENT DETAILS: Clear copy of South African ID document and recent proof of address (not older than three (3) months)must be attached to submission',
        false,
        false,
        false,
        ALIGN.CENTER
      );
      addText2('Applicant NAME & SURNAME (in full)', profileData.names);
      addText2('Identification Number', profileData.identity_reference);
      addText('Physical Address', true, false);
      addText2('Street Name', profileData.address_line_1);
      addText2('Suburb', profileData.address_line_2);
      addText2('Town', profileData.city);
      addText2('Postal Code', profileData.postal_code);
      addText2('Province', profileData.province);
      addText('Physical Address', true, false);
      addText2('Mobile Number', profileData.cellNumber);
      addText2('Email Address', profileData.email);
      doc.addPage();
      doc.moveDown(3);
      addText('TERMS AND CONDITIONS', true, false, false, ALIGN.LEFT);
      for (const line of contractLines3) {
        addText(line, false, false, false, ALIGN.LEFT);
      }

      for (const line of contractLines4) {
        addText(line, false, false, false, ALIGN.LEFT);
      }
      doc.moveDown(2);
      addSignature('Client Signature', image);
      addSignature('Witness Signature', imageRep);
      doc.end();
    } catch (ex) {
      console.log(ex);
      reject(ex.message);
    }
  });
};

export {createContract};

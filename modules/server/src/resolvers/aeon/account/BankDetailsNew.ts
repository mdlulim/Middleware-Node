import {QueryResolvers} from '../../../generated/graphql';
import {aeonAuth} from '../AeonAuth';
import {Context} from '../../../Context';

/*
query {
  bankDetailsNew {
    totalCount
    edges {
      cursor
      node {
        id,
		    bank,
		    accountName,
    		accountNumber,
    		branch,
    		branchCode,
    		universalCode,
    		swift,
    		reference
      }
    }
  }
}
 */

export const bankDetailsNew: QueryResolvers['bankDetailsNew'] = async function (
  _parent: any,
  {input: {appId}},
  context: Context,
  _info: any
) {
  const bankDetails: any = [];
  try {
    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return {
        edges: null,
        totalCount: 0,
      };
    } else {
      bankDetails.push({
        cursor: Buffer.from('BankDetail:1').toString('base64'),
        node: {
          id: Buffer.from('BankDetail:1').toString('base64'),
          bank: 'ABSA',
          accountName: 'Blue Label Distribution Senda',
          accountNumber: '40-7281-6665',
          branch: 'Sandton City',
          branchCode: '631005',
          universalCode: '632005',
          swift: 'ABSAZAJJ',
          reference: authData.account,
        },
      });

      /*
      bankDetails.push({
        cursor: Buffer.from('BankDetail:2').toString('base64'),
        node: {
          id: Buffer.from('BankDetail:2').toString('base64'),
          bank: 'FNB',
          accountName: 'Blue Label Distribution Senda',
          accountNumber: '123-456-789',
          branch: 'Branch Name',
          branchCode: '000001',
          universalCode: '000002',
          swift: 'ABCDEF',
          reference: authData.account,
        },
      });
      bankDetails.push({
        cursor: Buffer.from('BankDetail:3').toString('base64'),
        node: {
          id: Buffer.from('BankDetail:3').toString('base64'),
          bank: 'Standard Bank',
          accountName: 'Blue Label Distribution Senda',
          accountNumber: '987-654-321',
          branch: 'Branch name',
          branchCode: '000003',
          universalCode: '000004',
          swift: 'ZYXWVU',
          reference: authData.account,
        },
      });
*/

      return {
        edges: bankDetails,
        totalCount: bankDetails.length,
      };
    }
  } catch (e) {
    return {
      edges: [],
      totalCount: 0,
    };
  }
};

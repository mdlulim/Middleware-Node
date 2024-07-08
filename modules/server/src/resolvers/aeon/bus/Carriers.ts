import {aeonConnect} from '../AeonConnect';
import {QueryResolvers} from '../../../generated/graphql';
import {isIterable} from '../../../util';
import {Context} from '../../../Context';

/*
query {
    carriers(input: {
      deviceId: "28722",
      serialNum: "P170149B00376",
      userPin: "011234",
      location: "",
      swVer: ""}) {
      companiesCount
      passTypesCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      companiesEdges {
        cursor
        node {
          companyId
          role
          type
          name
        }
      }
      passTypeEdges {
        cursor
        node{
          passTypeId
          passType
        }
      }
    }
  }
 */

interface Company {
  name: string;
  short_name: string;
  company_id: string;
  role: string;
  type: string;
}

export const carriers: QueryResolvers['Carriers'] = async function (
  _parent: any,
  input: any,
  context: Context,
  _info: any
) {
  try {
    const authData = input.input;
    if (!authData) {
      return {edges: {}};
    }
    const data = await aeonConnect(
      context,
      //@ts-ignore
      authData,
      'NFCSmartTap',
      'ListCarriers',
      {}
    );
    // console.log({data: data.response.response})
    // @ts-ignore
    const rawData = data.response.response.ResponseMessage;

    let companies = rawData.companies.companies;
    if (!isIterable(companies)) {
      companies = [companies];
    }
    const companiesOutput = companies.map((company: Company) => {
      return {
        cursor: company.company_id,
        node: {
          name: company.name,
          shortName: company.short_name,
          companyId: company.company_id,
          role: company.role,
          type: company.type,
        },
      };
    });

    let passTypes = rawData.passTypes.passType;

    if (!isIterable(passTypes)) {
      passTypes = [passTypes];
    }

    const passTypesOutput = passTypes.map((passType: string, index: number) => {
      return {
        cursor: Buffer.from('PassType:' + index).toString('base64'),
        node: {
          passTypeId: Buffer.from('PassType:' + index).toString('base64'),
          passType: passType,
        },
      };
    });

    return {
      status: rawData.status,
      success: true,
      message: rawData.message,
      companiesCount: companies.length,
      passTypesCount: passTypes.length,
      companiesEdges: companiesOutput,
      passTypesEdges: passTypesOutput,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: e.message,
      companiesCount: 0,
      passTypeCount: 0,
      companiesEdges: [],
      passTypesEdges: [],
    };
  }
};

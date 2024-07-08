import {aeonConnect} from '../AeonConnect';
import {QueryResolvers} from '../../../generated/graphql';
import {isIterable} from '../../../util';

/*
query {
    passTypes(input: {
      deviceId: "29921",
      serialNum: "P130189C01366",
      userPin: "011234",
      location: "",
      swVer: ""}) {
      totalCount
      edges {
        cursor
        node {
          id
          passType
        }
      }
    }
  }
}*/

export const passTypes: QueryResolvers['BusPassTypes'] = async function (
  _parent: any,
  input: any,
  context: any,
  _info: any
) {
  try {
    const authData = input.input;
    if (!authData) {
      return {edges: {}};
    }
    const data = await aeonConnect(
      context,
      // @ts-ignore
      authData,
      'NFCSmartTap',
      'ListCarriers',
      {}
    );
    let passTypes =
      // @ts-ignore
      data.response.response.ResponseMessage.passTypes.passType;

    if (!isIterable(passTypes)) {
      passTypes = [passTypes];
    }

    const output = passTypes.map((passType: string, index: number) => {
      return {
        cursor: Buffer.from('PassType:' + index).toString('base64'),
        node: {
          passTypeId: Buffer.from('PassType:' + index).toString('base64'),
          passType: passType,
        },
      };
    });

    return {
      totalCount: passTypes.length,
      edges: output,
    };
  } catch (e) {
    console.log(e);
    return {
      totalCount: 0,
      edges: [],
    };
  }
};

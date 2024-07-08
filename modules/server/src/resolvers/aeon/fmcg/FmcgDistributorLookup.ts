import {aeonConnect} from '../AeonConnect';
import {QueryResolvers} from '../../../generated/graphql';

/*
query {
  fmcgDistributor (input: {
    reference: "10400101000011",
    userInfo: {deviceId: "29810", serial: "P130188W00987", userPin: "011234", location: "", version: ""}
  }) {
    success
    message
    distributor {
      reference
      name
      cellphone
      email
    }
  }
}
 */

export const fmcgDistributor: QueryResolvers['fmcgDistributor'] = async function (
  _parent: any,
  {input: {reference, userInfo}},
  context: any,
  _info: any
) {
  try {
    const authData = {
      deviceId: userInfo.deviceId,
      serialNum: userInfo.serial,
      userPin: userInfo.userPin,
      location: userInfo.location,
      swVer: userInfo.version,
    };

    const event = {
      ReferenceNumber: reference,
    };

    const data: any = await aeonConnect(
      context,
      authData,
      'Supplier Payment',
      'FMCGDistributorLookup',
      event
    );

    return {
      success: true,
      message: data.message,
      distributor: {
        reference: data.response.response.data.ReferenceNumber,
        name: data.response.response.data.Name,
        account: data.response.response.data.AccountNumber,
        cellphone: data.response.response.data.CellphoneNumber,
        email: data.response.response.data.Email,
      },
    };
  } catch (e) {
    console.error(e);
    return {success: false, message: e.message, distributor: null};
  }
};

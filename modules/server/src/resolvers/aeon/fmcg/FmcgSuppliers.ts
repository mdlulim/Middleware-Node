import {aeonConnect} from '../AeonConnect';
import {QueryResolvers} from '../../../generated/graphql';
import {isIterable} from '../../../util';

/*
query {
  fmcgSuppliers (input: {
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

interface TrxType {
  ProductId: string;
  TrxTypeId: string;
  $t: string;
}

const parseTrxTypes = (data: any) => {
  try {
    if (isIterable(data.response.response.data.Suppliers.TransType)) {
      return data.response.response.data.Suppliers.TransType.map(
        (trx: TrxType) => ({
          productId: trx.ProductId,
          trxTypeId: trx.TrxTypeId,
          name: trx.$t,
        })
      );
    } else {
      return {
        productId: data.response.response.data.Suppliers.TransType.ProductId,
        trxTypeId: data.response.response.data.Suppliers.TransType.TrxTypeId,
        name: data.response.response.data.Suppliers.TransType.$t,
      };
    }
  } catch (err) {
    return [];
  }
};

export const fmcgSuppliers: QueryResolvers['fmcgSuppliers'] = async function (
  _parent: any,
  {input: {userInfo}},
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

    const data: any = await aeonConnect(
      context,
      authData,
      'Supplier Payment',
      'ListFMCGSuppliers',
      {}
    );

    return {
      success: true,
      message: data.message,
      suppliers: parseTrxTypes(data),
    };
  } catch (e) {
    console.error(e);
    return {success: false, message: e.message, suppliers: null};
  }
};

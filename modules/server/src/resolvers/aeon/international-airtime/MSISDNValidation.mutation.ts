import {aeonConnect} from '../AeonConnect';
import {IaAuth, IaRecon, MutationResolvers} from '../../../generated/graphql';
import {isIterable} from '../../../util';
import {createLogger} from '../../../logging';
import {Context} from '../../../Context';

const logger = createLogger('MSISDNValidation');

interface Input {
  input: {
    phoneNumber: string;
    amount: string;
    senderPhoneNumber: string;
    productCode: string;
    network: string;
    recon: IaRecon;
    iaAuth: IaAuth;
    auth: {
      deviceId: string;
      transType: string;
      userPin: string;
      deviceSer: string;
      deviceUUID: string;
      reference: string;
    };
  };
}

// interface ProductListCategory {
//   type: string;
//   Product: {
//     Network: string;
//     Description: string;
//     Amount: string;
//     ProductCode: string;
//     Top5Seller: string;
//   };
// }

// const getProducts = (products: any, prodList: any[]) => {
//
// }
const getValue = (code: any, description: any) => {
  //console.log('description :' + description);
  return code?.includes('CP_')
    ? description?.replace(/\(.*?\)/, '( *Estimated Value*)')
    : description;
};
const getProductList = (categories: any) => {
  const products: any[] = [];
  if (isIterable(categories)) {
    for (const category of categories) {
      if (isIterable(category.Product)) {
        for (const product of category.Product) {
          const prod = {
            type: category.type,
            network: product.Network,
            description: getValue(product.ProductCode, product.Description),
            amount: product.Amount,
            productCode: product.ProductCode,
            top5Seller: product.Top5Seller,
          };
          products.push(prod);
        }
      } else {
        const prod = {
          type: category.type,
          network: category.Product.Network,
          description: getValue(categories.ProductCode, categories.Description),
          amount: category.Product.Amount,
          productCode: category.Product.ProductCode,
          top5Seller: category.Product.Top5Seller,
        };
        products.push(prod);
      }
    }
  } else {
    if (isIterable(categories.Product)) {
      for (const product of categories.Product) {
        const prod = {
          type: categories.type,
          network: product.Network,
          description: getValue(product.ProductCode, product.Description),
          amount: product.Amount,
          productCode: product.ProductCode,
          top5Seller: product.Top5Seller,
        };
        products.push(prod);
      }
    } else {
      const prod = {
        type: categories.type,
        network: categories.Product.Network,
        description: getValue(categories.ProductCode, categories.Description),
        amount: categories.Product.Amount,
        productCode: categories.Product.ProductCode,
        top5Seller: categories.Product.Top5Seller,
      };
      products.push(prod);
    }
  }
  return products;
};

//@ts-ignore
export const msisdnValidation: MutationResolvers['msisdnValidation'] = async function (
  _parent: any,
  {
    input: {
      phoneNumber,
      auth,
      iaAuth,
      amount,
      network,
      senderPhoneNumber,
      productCode,
      recon,
    },
  }: Input,
  context: Context,
  _info: any
) {
  let data: any = {};
  try {
    // const event = {
    //   auth: auth,
    //   reference: reference,
    //   iaAuth: iaAuth
    // };
    const phoneRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/im;
    let event = {};
    if (phoneNumber.match(phoneRegEx)) {
      event = {
        UserPin: iaAuth.userPin,
        DeviceId: iaAuth.deviceId,
        DeviceSer: iaAuth.deviceSer,
        DeviceUUID: iaAuth.deviceUUID,
        TransType: iaAuth.transType,
        Reference: iaAuth.reference,
        PhoneNumber: phoneNumber,
        Amount: amount,
        SenderPhoneNumber: senderPhoneNumber,
        Network: network,
        ProductCode: productCode,
        Recon: {...recon},
      };
    } else {
      return {
        success: false,
        message: 'Invalid Number',
        data: null,
      };
    }
    // if (!auth) {
    //   return {success: false, message: data.message};
    // }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    data = await aeonConnect(
      context,
      // @ts-ignore
      auth,
      'IPAY',
      // @ts-ignore
      'GlobalMSISDNValidation',
      event
    );
    logger.info(context, {
      message: `MSISDN aeonConnect: ${JSON.stringify(data)}`,
    });
    const output = data.response.response;

    const productList = getProductList(output.data.ProductList.Category);

    return {
      success: true,
      message: 'Success',
      data: {
        phoneNumber: output.data.PhoneNumber,
        countryCode: output.data.CountryCode,
        currencyCode: output.data.CurrencyCode,
        exchangeRate: output.data.ExchangeRate,
        ref: output.data.Ref,
        date: output.data.Date,
        reference: output.data.Reference,
        productList: productList,
        responseMessage: output.message,
        status: output.status,
      },
    };

    // return {success: true, message: data.message};
  } catch (e) {
    console.log({e});
    return {success: false, message: e.message};
  }
};

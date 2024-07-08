import config from '../../config';

export const getTenant = async function (appID: any) {
  try {
    let baseUrl;
    switch (appID) {
      case 'M2S':
        //  console.log(appID)
        baseUrl = config.get('m2sAddress');
        break;
      case 'GCD':
        baseUrl = config.get('gcdAddress');
        break;
      case 'Local':
        baseUrl = config.get('localAddress');
        break;
      default:
        baseUrl = config.get('atlasAddress');
        break;
    }

    // console.log(baseUrl)
    return baseUrl;
  } catch (ex) {}
};

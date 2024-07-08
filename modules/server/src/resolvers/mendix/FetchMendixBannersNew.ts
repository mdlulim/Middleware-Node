import got from 'got';
import {aeonAuth} from '../aeon/AeonAuth';
import {Banner, QueryResolvers} from '../../generated/graphql';
import config from '../../config';

export const fetchBannersNew: QueryResolvers['fetchBannersNew'] = async function (
  _parent: any,
  {input: {appId}},
  context: any,
  _info: any
) {
  try {
    const authData = await aeonAuth(context, appId);

    const devId = authData ? authData.deviceId : '0';

    const uri = `${config.get('mendixAddress')}/advert/v1/banner`;

    const initialQuery = await got.get(uri, {
      headers: {
        Authorization: `Basic Qmx1RHJvaWQ6JnopeVQzOHpTTXNhJFBoSmQvVjtEbjlZPSVZZ2deJzdIekJCXkZjOH5GZFRyTV5nRFQ=`,
        DeviceId: devId,
        Theme: 'T3T',
      },
    });

    const data = JSON.parse(initialQuery.body);

    const banners = data.banners.map((banner: Banner) => {
      return {
        cursor: banner.id,
        node: {
          id: banner.id,
          url: banner.url,
        },
      };
    });

    return {
      total: data.total,
      edges: banners,
    };
  } catch (ex) {
    console.log(ex);
    // on any errors, do not return profile
    return null;
  }
};

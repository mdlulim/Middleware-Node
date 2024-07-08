import got from 'got';
import xml2json from 'xml2json';
import config from '../../config';

export const sendSms = async (number: string, message: string) => {
  try {
    const url = `${config.get('cellfind.url')}`;
    const username = `${config.get('cellfind.username')}`;
    const password = `${config.get('cellfind.password')}`.toString();

    const loginResponse = await got(
      url + 'gatewaywebservice/Service.asmx/LogIn',
      {
        searchParams: {
          username: username,
          password: password,
        },
      }
    );

    const parse: any = xml2json.toJson(loginResponse.body, {object: true});
    const token: string = parse.string.$t;

    await got(url + 'gatewaywebservice/Service.asmx/SendSMSMessageSingle', {
      searchParams: {
        session_token: token,
        mobile: number,
        message: message,
      },
    });
  } catch (e) {
    console.error(e.message);
  }
};

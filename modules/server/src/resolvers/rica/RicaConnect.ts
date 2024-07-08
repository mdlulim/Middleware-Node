import net from 'net';
import tls from 'tls';
import jsonToXml from 'jsontoxml';
import xml2json from 'xml2json';
import config from '../../config';

interface UserInfo {
  username: string;
  password: string;
}

const userPin = '011234';
const deviceId = config.get('ricaDevice');
const serialNum = config.get('ricaSerial');

const checkEventCode = (response: string) => {
  const parse: any = xml2json.toJson(response, {object: true});
  return parse.response.event.EventCode === '0';
};

const getErrorText = (response: string) => {
  const parse: any = xml2json.toJson(response, {object: true});
  let msg = '';

  try {
    msg = parse.response.data.messageDetails;
  } catch (e) {
    console.error({e});
  }

  if (msg === '' || typeof msg === 'object') {
    try {
      msg = parse.response.data.message;
    } catch (e) {
      console.error({e});
    }
  }

  return msg === '' || typeof msg === 'object' ? 'Unknown error' : msg;
};

const parseResponseData = (response: string) => {
  return xml2json.toJson(response, {object: true});
};

export const ricaConnect = async (
  userInfo: UserInfo,
  eventType: string,
  registration = {}
) => {
  return new Promise((resolve, reject) => {
    try {
      let response = '';
      let streamStep = 'Auth';
      // #### AUTH
      const authXml = jsonToXml({
        request: {
          event: {
            DeviceId: deviceId,
            DeviceSer: serialNum,
            UserPin: userPin,
            TransType: '',
          },
          EventType: 'Authentication',
        },
      });

      console.log('authXml', authXml);
      // const ssl = config.get('env') === 'production';
      const ssl = false;

      const address = config.get('ricaAddress');
      const port = config.get('ricaPort');

      const client = ssl
        ? tls.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          })
        : net.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          });

      client.on('error', function (err: any) {
        console.log({err});
        const ret = {
          message: 'Connection error',
        };
        reject(ret);
      });

      client.on('data', function (data: any) {
        response += data.toString();
        if (data.toString().endsWith('\n')) {
          if (!checkEventCode(response)) {
            const ret = {
              message: getErrorText(response),
            };
            reject(ret);
          } else if (streamStep == 'Auth') {
            streamStep = 'Register';
            const parse: any = parseResponseData(response);
            response = ''; // Clean response stream to prevent invalid xml

            const registerEvent = {
              Registration: registration,
              User: {
                Username: userInfo.username,
                Password: userInfo.password,
                sourceDevice: deviceId,
                sourceRef: serialNum,
              },
            };

            const xml = jsonToXml({
              request: {
                SessionId: parse.response.SessionId,
                EventType: eventType,
                event: registerEvent,
              },
            });

            console.log('ricaconnect:', xml);
            client.write(`${xml}\n`); //newline terminal needed to complete send to server.
          } else if (streamStep == 'Register') {
            const parse = parseResponseData(response);
            client.end();
            const ret = {
              message: 'Success',
              response: parse,
            };
            resolve(ret);
          } else {
            client.end();
            const ret = {
              message: 'Unknown error',
            };
            reject(ret);
          }
        }
      });
    } catch (e) {
      console.log({e});
      const ret = {
        message: e.toString(),
      };
      reject(ret);
    }
  });
};

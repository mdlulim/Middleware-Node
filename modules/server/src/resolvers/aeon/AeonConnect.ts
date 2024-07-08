import net from 'net';
import tls from 'tls';
import jsonToXml from 'jsontoxml';
import xml2json from 'xml2json';
import config from '../../config';
import {TrxEventType} from './TrxEventType';
import {createLogger} from '../../logging';
import {Context} from '../../Context';

const logger = createLogger('AeonConnect');

interface UserInfo {
  deviceId: string;
  serialNum: string;
  userPin: string;
  location: string;
  swVer: string;
  deviceUUID?: string | any | undefined;
}

// const ssl = config.get('env') === 'production';
const ssl = false;
const address = config.get('aeonAddress');
const port = config.get('aeonPort');

const checkEventCode = (response: string) => {
  const parse: any = xml2json.toJson(response, {object: true});
  return parse.response.event.EventCode === '0';
};

const getAeonErrorText = (response: string) => {
  const parse: any = xml2json.toJson(response, {object: true});
  return typeof parse.response.data.AeonErrorText !== 'object'
    ? parse.response.data.AeonErrorText
    : '';
};

const getErrorText = (response: string) => {
  const parse: any = xml2json.toJson(response, {object: true});
  return typeof parse.response.data.ErrorText !== 'object'
    ? parse.response.data.ErrorText
    : '';
};

const getSessionId = (response: string) => {
  const parse: any = xml2json.toJson(response, {object: true});
  return parse.response.SessionId;
};

const parseResponseData = (response: string) => {
  const parse: any = xml2json.toJson(response, {object: true});
  return parse;
};

const parseResponseDataAccount = (response: string) => {
  const parse: any = xml2json.toJson(response, {object: true});
  return parse.response;
};

export const aeonConnectSingle = async (
  userInfo: UserInfo,
  eventType: string,
  authTrxType: TrxEventType
) => {
  return new Promise((resolve, reject) => {
    try {
      // console.log("trying to connect")
      let response = '';
      // #### AUTH
      const authXml = jsonToXml({
        request: {
          event: {
            DeviceId: userInfo.deviceId,
            DeviceSer: userInfo.serialNum,
            UserPin: userInfo.userPin,
            DeviceVer: userInfo.swVer,
            location: userInfo.location,
            LoyaltyProfileId: '',
            TransType: authTrxType,
          },
          EventType: eventType,
        },
      });

      const client = ssl
        ? tls.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          })
        : net.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          });

      client.on('error', function (_err: any) {
        // console.log({err});
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
              message: getAeonErrorText(response),
            };
            reject(ret);
          } else {
            const parse = parseResponseData(response);
            client.end();
            const ret = {
              message: 'Success',
              response: parse,
            };
            resolve(ret);
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

export const aeonConnect = async (
  context: Context,
  userInfo: UserInfo,
  authTrxType: TrxEventType,
  reqTrxType: TrxEventType,
  event = {}
) => {
  return new Promise((resolve, reject) => {
    try {
      let response = '';
      let sessionId = null;
      let streamStep = 'Auth';
      // #### AUTH
      const authXml = jsonToXml({
        request: {
          event: {
            DeviceId: userInfo.deviceId,
            DeviceSer: userInfo.serialNum,
            DeviceUUID: userInfo.deviceUUID ? userInfo.deviceUUID : '',
            UserPin: userInfo.userPin,
            DeviceVer: userInfo.swVer,
            location: userInfo.location,
            LoyaltyProfileId: '',
            TransType: authTrxType,
          },
          EventType: 'Authentication',
        },
      });

      logger.info(context, {
        message: `authXml: ` + authXml,
      });

      logger.info(context, {
        message: `AeonConnect: Port:${port} Host: ${address}`,
      });
      const client = ssl
        ? tls.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          })
        : net.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          });

      client.on('error', function (err: any) {
        logger.info(context, {
          message: `AeonConnect Client On Error: ${JSON.stringify(err)}`,
        });
        const ret = {
          message: 'Connection error',
        };
        reject(ret);
      });

      client.on('data', function (data: any) {
        response += data.toString();
        logger.info(context, {
          message: `response: ` + response,
        });
        if (data.toString().endsWith('\n')) {
          if (!checkEventCode(response)) {
            const ret = {
              message: getErrorText(response)
                ? getErrorText(response)
                : getAeonErrorText(response),
            };
            reject(ret);
          } else if (streamStep == 'Auth') {
            streamStep = 'Lookup';
            sessionId = getSessionId(response);
            response = ''; // Clean response stream to prevent invalid xml
            const xml = jsonToXml({
              request: {
                EventType: reqTrxType,
                SessionId: sessionId,
                event: event,
              },
            });
            logger.info(context, {
              message: `request: ` + xml,
            });
            client.write(`${xml}\n`); //newline terminal needed to complete send to server.
          } else if (streamStep == 'Lookup') {
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
          // res.header('Content-Type', 'application/json').send(xmlParser.toJson(response, options));
          // resolve(response);
        }
      });
    } catch (e) {
      console.log({error: e});
      const ret = {
        message: e.toString(),
      };
      reject(ret);
    }
  });
};

export const aeonConnectElectricity = async (
  context: Context,
  userInfo: UserInfo,
  event = {}
) => {
  return new Promise((resolve, reject) => {
    try {
      let response = '';
      let sessionId = null;
      let streamStep = 'Auth';
      // #### AUTH
      const authXml = jsonToXml({
        request: {
          event: {
            DeviceId: userInfo.deviceId,
            DeviceSer: userInfo.serialNum,
            UserPin: userInfo.userPin,
            DeviceVer: userInfo.swVer,
            location: userInfo.location,
            LoyaltyProfileId: '',
            TransType: 'Electricity',
          },
          EventType: 'Authentication',
        },
      });
      logger.info(context, {
        message: `authXml: ` + authXml,
      });

      logger.info(context, {
        message: `AeonConnect: Port:${port} Host: ${address}`,
      });

      const client = ssl
        ? tls.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          })
        : net.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          });

      client.on('error', function (err: any) {
        logger.info(context, {
          message: `AeonConnect Client On Error: ${JSON.stringify(err)}`,
        });
        const ret = {
          message: 'Connection error',
        };
        reject(ret);
      });

      client.on('data', function (data: any) {
        response += data.toString();
        logger.info(context, {
          message: `response: ` + response,
        });
        if (data.toString().endsWith('\n')) {
          if (!checkEventCode(response)) {
            const ret = {
              message: getAeonErrorText(response),
            };
            reject(ret);
          } else if (streamStep == 'Auth') {
            streamStep = 'Confirm';
            sessionId = getSessionId(response);
            response = ''; // Clean response stream to prevent invalid xml
            const xml = jsonToXml({
              request: {
                SessionId: sessionId,
                EventType: 'ConfirmMeter',
                event: event,
              },
            });

            logger.info(context, {
              message: `request: ` + xml,
            });

            client.write(`${xml}\n`); //newline terminal needed to complete send to server.
          } else if (streamStep == 'Confirm') {
            streamStep = 'Purchase';
            const parse = parseResponseData(response);
            response = ''; // Clean response stream to prevent invalid xml

            const xml = jsonToXml({
              request: {
                SessionId: parse.response.SessionId,
                EventType: 'GetVoucher',
                event: {
                  Print: 0,
                  TransRef: parse.response.data.TransRef,
                  Type: 'TOKEN',
                },
              },
            });
            client.write(`${xml}\n`); //newline terminal needed to complete send to server.
          } else if (streamStep == 'Purchase') {
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

export const aeonConnectSetPrinted = async (
  userInfo: UserInfo,
  transRefs: string[]
) => {
  return new Promise((resolve, reject) => {
    try {
      let response = '';
      const date = new Date();
      let trans = '';
      for (const ref of transRefs) {
        trans += '<TransRef>' + ref + '</TransRef>';
      }
      const requestXml = jsonToXml({
        request: {
          event: {
            DeviceId: userInfo.deviceId,
            DeviceSer: userInfo.serialNum,
            UserPin: userInfo.userPin,
            Reference: userInfo.deviceId + '_' + date.getTime(),
            TransRefList: trans,
          },
          EventType: 'Printed',
        },
      });
      const client = ssl
        ? tls.connect({port: port, host: address}, function () {
            client.write(`${requestXml}\n`); //newline terminal needed to complete send to server.
          })
        : net.connect({port: port, host: address}, function () {
            client.write(`${requestXml}\n`); //newline terminal needed to complete send to server.
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
              message: getAeonErrorText(response),
            };
            reject(ret);
          } else {
            const parse = parseResponseData(response);
            client.end();
            const ret = {
              message: 'Success',
              response: parse,
            };
            resolve(ret);
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

export const aeonConnectAirtimeVoucher = async (
  context: Context,
  userInfo: UserInfo,
  event = {}
) => {
  return new Promise((resolve, reject) => {
    try {
      let response = '';
      let sessionId = null;
      let streamStep = 'Auth';
      // #### AUTH
      const authXml = jsonToXml({
        request: {
          event: {
            DeviceId: userInfo.deviceId,
            DeviceSer: userInfo.serialNum,
            UserPin: userInfo.userPin,
            DeviceVer: userInfo.swVer,
            location: userInfo.location,
            LoyaltyProfileId: '',
            TransType: 'Voucher',
          },
          EventType: 'Authentication',
        },
      });

      logger.info(context, {
        message: `authXml: ` + authXml,
      });

      logger.info(context, {
        message: `AeonConnect: Port:${port} Host: ${address}`,
      });

      const client = ssl
        ? tls.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          })
        : net.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          });

      client.on('error', function (err: any) {
        logger.info(context, {
          message: `AeonConnect Client On Error: ${JSON.stringify(err)}`,
        });
        const ret = {
          message: 'Connection error',
        };
        reject(ret);
      });

      client.on('data', function (data: any) {
        response += data.toString();
        logger.info(context, {
          message: `response: ` + response,
        });
        if (data.toString().endsWith('\n')) {
          if (!checkEventCode(response)) {
            const ret = {
              message: getAeonErrorText(response),
            };
            reject(ret);
          } else if (streamStep == 'Auth') {
            streamStep = 'Purchase';
            sessionId = getSessionId(response);
            response = ''; // Clean response stream to prevent invalid xml
            const xml = jsonToXml({
              request: {
                SessionId: sessionId,
                EventType: 'GetAirtimeVouchers',
                event: event,
              },
            });

            logger.info(context, {
              message: `request: ` + xml,
            });

            client.write(`${xml}\n`); //newline terminal needed to complete send to server.
          } else if (streamStep == 'Purchase') {
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

export const aeonConnectMerchantToMerchant = async (
  context: Context,
  userInfo: UserInfo,
  event = {}
) => {
  return new Promise((resolve, reject) => {
    try {
      let response = '';
      let sessionId = null;
      let streamStep = 'Auth';
      // #### AUTH
      const authXml = jsonToXml({
        request: {
          event: {
            DeviceId: userInfo.deviceId,
            DeviceSer: userInfo.serialNum,
            UserPin: userInfo.userPin,
            DeviceVer: userInfo.swVer,
            location: userInfo.location,
            LoyaltyProfileId: '',
            TransType: 'MerchantTransfer',
          },
          EventType: 'Authentication',
        },
      });

      logger.info(context, {
        message: `authXml: ` + authXml,
      });

      logger.info(context, {
        message: `AeonConnect: Port:${port} Host: ${address}`,
      });

      const client = ssl
        ? tls.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          })
        : net.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          });

      client.on('error', function (err: any) {
        logger.info(context, {
          message: `AeonConnect Client On Error: ${JSON.stringify(err)}`,
        });
        const ret = {
          message: 'Connection error',
        };
        reject(ret);
      });

      client.on('data', function (data: any) {
        response += data.toString();
        logger.info(context, {
          message: `response: ` + response,
        });
        if (data.toString().endsWith('\n')) {
          if (!checkEventCode(response)) {
            const ret = {
              message: getAeonErrorText(response),
            };
            reject(ret);
          } else if (streamStep == 'Auth') {
            streamStep = 'GetAccount';
            sessionId = getSessionId(response);
            response = ''; // Clean response stream to prevent invalid xml
            const xml = jsonToXml({
              request: {
                SessionId: sessionId,
                EventType: 'GetAccountInfo',
                event: event,
              },
            });

            logger.info(context, {
              message: `request: ` + xml,
            });

            client.write(`${xml}\n`); //newline terminal needed to complete send to server.
          } else if (streamStep == 'GetAccount') {
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
              message: getErrorText(response),
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

export const aeonConnectMerchantToTransfer = async (
  context: Context,
  userInfo: UserInfo,
  event = {}
) => {
  return new Promise((resolve, reject) => {
    try {
      let response = '';
      let sessionId = null;
      let streamStep = 'Auth';
      // #### AUTH
      const authXml = jsonToXml({
        request: {
          event: {
            DeviceId: userInfo.deviceId,
            DeviceSer: userInfo.serialNum,
            UserPin: userInfo.userPin,
            DeviceVer: userInfo.swVer,
            location: userInfo.location,
            LoyaltyProfileId: '',
            TransType: 'MerchantTransfer',
          },
          EventType: 'Authentication',
        },
      });

      logger.info(context, {
        message: `authXml: ` + authXml,
      });

      logger.info(context, {
        message: `AeonConnect: Port:${port} Host: ${address}`,
      });

      const client = ssl
        ? tls.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          })
        : net.connect({port: port, host: address}, function () {
            client.write(`${authXml}\n`); //newline terminal needed to complete send to server.
          });

      client.on('error', function (err: any) {
        logger.info(context, {
          message: `AeonConnect Client On Error: ${JSON.stringify(err)}`,
        });
        const ret = {
          message: 'Connection error',
        };
        reject(ret);
      });

      client.on('data', function (data: any) {
        response += data.toString();
        logger.info(context, {
          message: `response: ` + response,
        });
        if (data.toString().endsWith('\n')) {
          if (!checkEventCode(response)) {
            const ret = {
              message: getAeonErrorText(response),
            };
            reject(ret);
          } else if (streamStep == 'Auth') {
            streamStep = 'GetAccount';
            sessionId = getSessionId(response);
            response = ''; // Clean response stream to prevent invalid xml
            const xml = jsonToXml({
              request: {
                SessionId: sessionId,
                EventType: 'GetAccountInfo',
                event: event,
              },
            });
            logger.info(context, {
              message: `request: ` + xml,
            });
            client.write(`${xml}\n`); //newline terminal needed to complete send to server.
          } else if (streamStep == 'GetAccount') {
            streamStep = 'Confirm';

            sessionId = getSessionId(response);
            const result = parseResponseDataAccount(response);
            const info = {
              accountNumber: result.data.TransfereeAccount,
              amountDue: result.data.TotalAmount - result.data.ConvenienceFee,
              confirmType: 'commit',
              tenderType: 'cash',
              wantPrintJob: 1,
              trxId: result.data.TransRef,
            };
            response = ''; // Clean response stream to prevent invalid xml
            const xml = jsonToXml({
              request: {
                SessionId: sessionId,
                EventType: 'Confirm',
                event: info,
              },
            });
            logger.info(context, {
              message: `request: ` + xml,
            });

            client.write(`${xml}\n`); //newline terminal needed to complete send to server.
          } else if (streamStep == 'Confirm') {
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
              message: getErrorText(response),
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

import {
  BusGetCustomerInput,
  MutationResolvers,
} from '../../../generated/graphql';
import {aeonConnect} from '../AeonConnect';

/*mutation {
  getCustomer(input:
  {
    uid: "2B4C8912FC8821",
        auth: {
        deviceId: "29721",
        serialNum: "P130189B00366",
        userPin: "011234",
        location: "",
        swVer: ""
  }
  }) {
    message
    success
    pageNumber
    totalPages
    maxRecordsPerPage
    customerInfo {
      name
      uid
      name
      surname
      cellNumber
      status
      issueDate
      expiry
    }
  }
}*/

interface Input {
  input: BusGetCustomerInput;
}

export const getCustomer: MutationResolvers['BusGetCustomer'] = async function (
  _parent: any,
  {input}: Input,
  context: any,
  _info: any
) {
  try {
    const {uid, auth} = input;
    if (!auth) {
      return null;
    }
    const reqData = await aeonConnect(
      context,
      auth,
      'NFCSmartTap',
      'GetCustomer',
      {
        uid: uid,
      }
    );
    // @ts-ignore
    const resData = reqData.response.response.ResponseMessage;

    if (resData.data === null || resData.data == undefined) {
      return {
        success: false,
        message: 'Unable to get customer info',
        customerInfo: {},
        pageNumber: null,
        totalPages: null,
        maxRecordsPerPage: null,
        recordsFetched: null,
      };
    }

    const {data} = resData.data;
    const {
      page_number,
      total_pages,
      max_records_per_page,
      records_fetched,
    } = resData;

    console.log(data);
    return {
      success: true,
      message: 'Success',
      customerInfo: {
        uid: data.uid,
        name: data.name,
        surname: data.surname,
        cellNumber: data.cell_number,
        status: data.status,
        issueDate: data.issue_date,
        expiry: JSON.stringify(data.expiry),
      },
      pageNumber: page_number,
      totalPages: total_pages,
      maxRecordsPerPage: max_records_per_page,
      recordsFetched: records_fetched,
    };
  } catch (e) {
    console.log({e});
    return {
      success: false,
      message: e.message,
      customerInfo: {},
      pageNumber: null,
      totalPages: null,
      maxRecordsPerPage: null,
      recordsFetched: null,
    };
  }
};

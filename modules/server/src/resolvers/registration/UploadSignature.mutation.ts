/*
mutation {
  uploadSignature (input: {
      base64image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/4RD6RXhpZgAATU0AKgAAAAgABAE7AAIAAAAQAAAISodpAAQAAAABAAAIWpydAAEAAAAgAAAQ0uocAAcAAAgMAAAAPgAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE1pY2hhZWwgS3VpamtlbgAABZADAAIAAAAUAAAQqJAEAAIAAAAUAAAQvJKRAAIAAAADNTIAAJKSAAIAAAADNTIAAOocAAcAAAgMAAAInAAAAAAc6gAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADIwMTk6MDM6MTEgMTA6NTk6NTgAMjAxOTowMzoxMSAxMDo1OTo1OAAAAE0AaQBjAGgAYQBlAGwAIABLAHUAaQBqAGsAZQBuAAAA/+ELImh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4NCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+PHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InV1aWQ6ZmFmNWJkZDUtYmEzZC0xMWRhLWFkMzEtZDMzZDc1MTgyZjFiIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iLz48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+PHhtcDpDcmVhdGVEYXRlPjIwMTktMDMtMTFUMTA6NTk6NTguNTE1PC94bXA6Q3JlYXRlRGF0ZT48L3JkZjpEZXNjcmlwdGlvbj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PGRjOmNyZWF0b3I+PHJkZjpTZXEgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOmxpPk1pY2hhZWwgS3VpamtlbjwvcmRmOmxpPjwvcmRmOlNlcT4NCgkJCTwvZGM6Y3JlYXRvcj48L3JkZjpEZXNjcmlwdGlvbj48L3JkZjpSREY+PC94OnhtcG1ldGE+DQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAg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"
      DeviceSerialNo:"12235654555",
      appId:"T3TSA"
  }) {
    success
    message
    status
  }
}
*/

import {UserApi} from '@blts/atlas-api-def';
import {Configuration} from '@blts/atlas-api-def/dist/configuration';
import {aeonAuth} from '../aeon/AeonAuth';
import {createContract} from './CreateContract';
import {createContractGCD} from './CreateContractGCD';

import {atlasAuthCheck} from '../auth/AtlasHelpers';
import {
  DigitalOnboardingDocument,
  DigitalOnboardingDocumentType,
  uploadDocument,
} from '../digitalonboarding/UploadDocument';
import {
  getExternalSystemReference,
  saveExternalSystemReference,
} from '../atlas/customer/ExternalSystemReference';
import {completeRegistration} from '../digitalonboarding/CompleteRegistration';
import {getVault} from '../digitalonboarding/GetVault';
import {createLogger} from '../../logging';
import {Context} from '../../Context';

import {sendSms} from '../cellfind/SendSms';
import {MutationResolvers} from '../../generated/graphql';
import {getTenant} from '../auth/tenant';

import {getApplicationStatus} from '../digitalonboarding/GetApplicationStatus';

const logger = createLogger('uploadSignature');
console.log('UploadSignature Log Level', logger.level);

// console.log('UploadSignature Log Level enabled', logger.)

interface VaultFolder {
  id: string;
  url: string;
  type: string;
}

export const uploadSignature: MutationResolvers['uploadSignature'] = async function (
  _parent: any,
  {input: {base64image, appId}},
  context: Context,
  _info: any
) {
  logger.error(context, {message: 'register started'});

  try {
    const headers = atlasAuthCheck(context);
    // console.log('UploadSignature headers:', headers);
    const registerStatus = await getExternalSystemReference(headers, 4, appId);

    if (
      registerStatus === null ||
      registerStatus === undefined ||
      registerStatus.length === 0
    ) {
      console.log({
        'registerStatus===null': registerStatus === null,
        'registerStatus===undefined': registerStatus === undefined,
        'registerStatus.length===0': registerStatus.length === 0,
      });
      return {
        success: false,
        message: 'Cannot retrieve external system reference (Atlas)',
        status: 4,
      };
    }

    const mendixAppId =
      registerStatus.data[registerStatus.data.length - 1].reference;
    const customer_id =
      registerStatus.data[registerStatus.data.length - 1].customer_id;

    console.log('appId:', mendixAppId);
    console.log('customer_id:', customer_id);

    if (!mendixAppId) {
      console.log('no appId');
      return {
        success: false,
        message: 'Cannot read App Id',
        status: 4,
      };
    }

    /**
     * check application status for Selfie pic
     */
    let uploadDoc = true;
    const applicationStatus = await getApplicationStatus(context, mendixAppId);
    if (applicationStatus) {
      (Object.keys(
        applicationStatus
      ) as (keyof typeof applicationStatus)[]).forEach((key) => {
        // 👇️ name Tom 0, country Chile 1
        if (applicationStatus[key].Name === 'Document_Contract') {
          if (applicationStatus[key].Status) {
            uploadDoc = false;
          }
        }
      });
    } else {
      uploadDoc = false;
    }

    console.log(applicationStatus);

    const cleanedBase64Image = base64image.replace(
      /^data:image\/png;base64,/,
      ''
    );
    // console.log('cleanedBase64Image', cleanedBase64Image);

    const authData = await aeonAuth(context, appId);
    if (!authData) {
      return {
        success: false,
        message: 'Error getting auth data',
        status: 4,
      };
    }
    // console.log({authData});

    const serverUrl = String(await getTenant(appId));
    const userApi = new UserApi(new Configuration({basePath: serverUrl}));
    const profileData = await userApi
      .getProfile(headers)
      .then((res) => res.data);

    console.log({profileData});

    const customerId = profileData.data.customer.id;

    const names =
      profileData.data.first_name + ' ' + profileData.data.last_name;

    const cellNumber = profileData.data.customer.contacts[0].cell_no;
    const username = profileData.data.username;
    // console.log('customerId : ', customerId);

    const pdfString = await createContract(
      cleanedBase64Image,
      profileData.data,
      authData.deviceId,
      authData.account
    );

    const pdfStringGCD = await createContractGCD(
      cleanedBase64Image,
      profileData.data,
      authData.deviceId,
      authData.account
    );
    //  console.log('pdf substring', pdfString.substring(0, 100));

    // uncomment the code below to write the file locally
    // const fs = require('fs');
    // fs.writeFile('SampleDocument2.pdf', pdfString, 'base64', function(err) {
    //   if (err) {return console.log(err)};
    //   console.log('SampleDocument2.pdf written');
    // });
    //     console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------------")
    // console.log("_type: ", DigitalOnboardingDocumentType.Contract,
    //   "Base64encoded_file: ",pdfString,
    //   "filename: ", 'contract.pdf',)

    if (uploadDoc) {
      const document: DigitalOnboardingDocument = {
        _type: DigitalOnboardingDocumentType.Contract,
        Base64encoded_file: appId == 'GCD' ? pdfStringGCD : pdfString,
        filename: 'contract.pdf',
      };

      const contractResult = await uploadDocument(
        context,
        mendixAppId,
        document
      );

      if (!contractResult) {
        return {
          success: false,
          message: 'Unable to upload contract',
          status: 4,
        };
      }

      const complete = await completeRegistration(context, mendixAppId);
      console.log('Completing reg', {complete});

      if (!complete) {
        return {
          success: false,
          message: 'Unable to complete registration',
          status: 4,
        };
      }

      const vault = await getVault(context, mendixAppId);
      console.log({vault});

      logger.info(context, {
        message: `Current Vault Data ${JSON.stringify(vault)}`,
      });

      if (!vault) {
        logger.error(context, {
          message: `Unable to retrieve Mendix vault data from returned ${JSON.stringify(
            vault
          )}`,
        });
        return {
          success: false,
          message: 'Unable to get vault data',
          status: 4,
        };
      }

      if (!vault.folders.folder) {
        logger.error(context, {
          message: `Unable to retrieve Mendix vault data folders with returned ${JSON.stringify(
            vault
          )}`,
        });
        return {
          success: false,
          message: 'Unable to get vault data (folders)',
          status: 4,
        };
      }

      // if (!Array.isArray(vault.folders.folder)) {
      //   logger.error(context, {
      //     message: `No Mendix vault data returned ${JSON.stringify(vault)}`,
      //   });
      //   return {
      //     success: false,
      //     message: 'Unable to get vault data (folders)',
      //     status: 4,
      //   };
      // }

      logger.info(context, {
        message: `vault.folders.folder -> .mapping through now`,
      });

      const folders = vault.folders.folder.map(function (x: VaultFolder) {
        return {
          id: x.id,
          url: x.url,
          type: x.type.toLowerCase().replace(/ /g, '_'),
        };
      });
      const vault2 = {
        folders: {
          folder: folders,
        },
        vault_id: vault.vault_id,
      };

      const vaultUpload = await saveExternalSystemReference(
        context,
        headers,
        3,
        customerId,
        mendixAppId,
        JSON.stringify(vault2),
        appId
      );
      logger.info(context, {message: `vaultUpload: ${vaultUpload}`});

      if (!vaultUpload) {
        logger.error(context, {
          message: `Unable to save vault data: ${vaultUpload}`,
        });
        return {
          success: false,
          message: 'Unable to save vault data',
          status: 4,
        };
      }

      const regData = {
        status: 5,
      };

      const registerStatusSaved = await saveExternalSystemReference(
        context,
        headers,
        4,
        customerId,
        mendixAppId,
        JSON.stringify(regData),
        appId
      );
      logger.info(context, {
        message: `registerStatusSaved: ${registerStatusSaved}`,
      });

      if (!registerStatusSaved) {
        logger.error(context, {
          message: `Unable to save external system reference ${registerStatusSaved}`,
        });
        return {
          success: false,
          message: 'Unable to save registration status',
          status: 4,
        };
      }
    }
    logger.error(context, {message: 'register finished'});

    /*get byd account*/
    const getBydAccount = await getExternalSystemReference(headers, 1, appId);
    //console.log(getBydAccount)
    if (getBydAccount != null) {
      console.log(getBydAccount);
      // atlas returns a subset of data which first must be parsed
      const parsedData = JSON.parse(getBydAccount.data[0].data);
      //console.log(parsedData)
      const reference = parsedData.byd_acc_no;
      const sms =
        'Hi ' +
        names +
        ', your airtime wallet account for ' +
        username +
        ' has been created and byd no. is ' +
        reference +
        '. Please use this as reference when depositing money. Thank you! ' +
        appId +
        '';

      try {
        await sendSms(cellNumber, sms);
      } catch (e) {}
    }

    return {success: true, message: 'Success', status: 5};
  } catch (error) {
    console.error('Error UploadSignature', error);
    logger.error(context, {message: error.message, error});
    return {success: false, message: error.message, status: 4};
  }
};

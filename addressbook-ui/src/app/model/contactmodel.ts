export interface contact extends IContact{
  contactID: number;
  }

export interface IContact{
  title: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  dateOfBirth: string;
  gender: number;
  contactCategory: number;
  phones: IPhoneData[];
  emails: IEmailData[];
  socialMedias: ISocialMediaData[];
}

export interface ISelectOpt {
  value: number;
  viewValue: string;
}

export interface IChildTable {
  type: number;
  value: string;
}

export interface IPhoneData {
  phoneID?: number;
  phoneNumber: string;
  contactMethodType: number;
}

export interface IEmailData {
  emailAddressID?: number;
  emailAddress: string;
  contactMethodType: number;
}

export interface ISocialMediaData {
  socialMediaID?: number;
  socialMediaAddress: string;
  socialMediaType: number;
}

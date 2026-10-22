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
  phoneNumber: string;
  contactMethodType: number;
}

export interface IEmailData {
  emailAddress: string;
  contactMethodType: number;
}

export interface ISocialMediaData {
  socialMediaAddress: string;
  socialMediaType: number;
}

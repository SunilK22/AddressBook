export interface contact {
  contactID: number;
  firstName: string;
  middleName?: string | null;
  lastName: string | null;
  contactCategory: number;
  phones: PhoneDto[];
  emails: EmailDto[];
  socialMedias: SocialMediaDto[];
}

export interface selectOpt {
  value: number;
  viewValue: string;
}

export interface childTable {
  type: number;
  value: string;
}

export interface PhoneDto {
  phoneID?: number;
  phoneNumber: string;
  contactMethodType: number;
}

export interface EmailDto {
  emailAddressID?: number;
  emailAddress: string;
  contactMethodType: number;
}

export interface SocialMediaDto {
  socialMediaID?: number;
  socialMediaAddress: string;
  socialMediaType: number;
}

export interface completeContact {
  firstName: string;
  middleName: string | null;
  lastName: string;
  dateOfBirth: string;
  title: number;
  gender: number;
  contactCategory: number;
  phones: PhoneDto[];
  emails: EmailDto[];
  socialMedias: SocialMediaDto[];
}

export interface contact {
  contactID?: number;
  title: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  dateOfBirth: string;
  gender: number;
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

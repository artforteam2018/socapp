export type User = {
  id: any;
  token?: string;
  ACCOUNTS: {
    vk: number;
  };
  PROFILE: {
    auth_id_owner: string;
    email: string;
    firstRun: false;
    id_group: string;
    line: number;
    name: string;
    partnerProgramTermsAccepted: boolean;
    partner_code: number;
    partner_owner_id: number;
    phone: string;
    photo: string;
    sex: number;
    specialOfferShown: boolean;
    specialOfferShownDate: number;
    surname: string;
    timezone: any;
  };
  TARIFPLAN: {
    VKBOSS: any;
    account_limits: string;
    active: boolean;
    date_create: number;
    date_end: number;
    date_start: number;
    groups_limits: string;
    id_name: string;
    like_limits: string;
    primaryModules: any;
    secondaryModules: any;
    freeSwapAmount: number;
    paidSwapAmount: number;
  }
};

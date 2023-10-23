interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['System Administrator'],
  customerRoles: ['Patient'],
  tenantRoles: ['System Administrator', 'Healthcare Provider', 'Medical Staff', 'Insurance Provider'],
  tenantName: 'Clinic',
  applicationName: 'Doctor Appointment System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage personal information',
    'Book appointments',
    'Check medical records',
    'View billing information',
  ],
  ownerAbilities: ['Manage user data', 'Manage clinic data', 'Manage appointment data', 'Manage insurance data'],
  getQuoteUrl: 'https://app.roq.ai/proposal/4a9d4418-d599-4ffc-9619-186f18017321',
};

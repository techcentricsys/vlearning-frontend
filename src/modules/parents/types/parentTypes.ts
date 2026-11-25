export type ParentRelationship = 'Father' | 'Mother' | 'Guardian' | 'Grandfather' | 'Grandmother' | 'Other';
export type RecordStatus = 'Active' | 'Inactive';
export type PortalStatus = 'Not Created' | 'Invitation Pending' | 'Active' | 'Suspended' | 'Deactivated';
export type ContactMethod = 'Phone' | 'SMS' | 'Email' | 'WhatsApp';

export interface ParentRecord {
  id: string;
  parentCode: string;
  firstName: string;
  lastName: string;
  relationship: ParentRelationship;
  gender: string;
  dateOfBirth: string;
  nationalId: string;
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  whatsappNumber: string;
  preferredContactMethod: ContactMethod;
  address: string;
  occupation: string;
  status: RecordStatus;
  portalStatus: PortalStatus;
  invitationSentAt?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}
export interface StudentGuardian {
  id: string;
  parentId: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  className: string;
  relationship: ParentRelationship;
  isPrimaryContact: boolean;
  isEmergencyContact: boolean;
  portalAccessEnabled: boolean;
  status: 'Active' | 'Inactive';
}
export interface ParentCommunication {
  id: string;
  parentId: string;
  studentId?: string;
  subject: string;
  message: string;
  channel: 'SMS' | 'Email' | 'In-app';
  sender: string;
  sentAt: string;
  deliveryStatus: 'Sent' | 'Delivered' | 'Pending' | 'Failed';
}
export interface ParentDocument {
  id: string;
  parentId: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  remarks: string;
}
export interface ParentData {
  parents: ParentRecord[];
  relationships: StudentGuardian[];
  communications: ParentCommunication[];
  documents: ParentDocument[];
}

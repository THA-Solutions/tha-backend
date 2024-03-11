export class Mail {
  firstName: string;
  lastName: string;

  email: string;

  company?: string;

  message?: string;

  subject: string;
}

export class RecoveryMail extends Mail {}

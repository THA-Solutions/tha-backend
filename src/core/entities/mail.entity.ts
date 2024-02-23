export class Mail {
  firstName: string;
  lastName: string;

  email: string;

  compamny?: string;

  message?: string;

  subject: string;
}

export class RecoveryMail extends Mail {}

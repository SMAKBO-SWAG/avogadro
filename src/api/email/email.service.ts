// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Initialize the transporter (similar to your existing code)
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MERCH_GMAIL,
        pass: process.env.MERCH_GMAIL_PASSWORD,
      },
    });
  }

  async sendMail(mailOptions: any): Promise<string> {
    try {
      const recipient = mailOptions.to;
      await this.transporter.sendMail(mailOptions);
      console.log(recipient)
      return recipient;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

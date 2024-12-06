import { Injectable } from '@nestjs/common';
import { Order, Product } from '../../interfaces/orders.interface';
import { DatabaseService } from '../../database/database.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class OrdersService {
  constructor(
    private databaseService: DatabaseService,
    private emailService: EmailService
  ) {}

  private supabase = this.databaseService.getClient();

  async createOrder(order: Order) {
    const { data, error } = await this.supabase.from('orders').insert(order);

    if (error) {
      return error;
    }

    console.log(order);

    const orderDetailsRows = order.orders.map(item => {
        return `
            <tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.size}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Rp ${item.price.toLocaleString()}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${item.amount}</td>
            </tr>
        `;
    }).join('');

    const mailOptions = {
        from: "smakbo.swag@gmail.com",
        to: ["azmy.arya.rizaldi@gmail.com",'akifazmi1233@gmail.com'],
        subject: "New SWAG Order",
        html: `
            <html>
                <body>
                    <h2>New Order Notification</h2>
                    <p><strong>Customer Name:</strong> ${order.name}</p>
                    <p><strong>Phone Number:</strong> ${order.number}</p>
                    <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                    <p><strong>Total Price:</strong> Rp ${order.totalPrice.toLocaleString()}</p>
                    <h3>Order Details:</h3>
                    <table style="border: 1px solid #ddd; width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th style="padding: 8px; border: 1px solid #ddd;">Product Name</th>
                                <th style="padding: 8px; border: 1px solid #ddd;">Size</th>
                                <th style="padding: 8px; border: 1px solid #ddd;">Price</th>
                                <th style="padding: 8px; border: 1px solid #ddd;">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderDetailsRows}  <!-- Insert dynamically generated rows -->
                        </tbody>
                    </table>
                    <p>If you would like to process the order, please visit the following link:</p>
                    <p><a href="https://dalton-zeta.vercel.app" target="_blank">Go to Order Page</a></p>
                </body>
            </html>
        `,
    };

    this.emailService.sendMail(mailOptions);

    return order;
}

}

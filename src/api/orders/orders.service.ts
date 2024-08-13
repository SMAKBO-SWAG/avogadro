import { Injectable } from '@nestjs/common';
import { Order, Product } from '../../interfaces/orders.interface';
import { DatabaseService } from '../../database/database.service';
import { WhatsAppService } from '../whatsapp/whatsapp.service';

@Injectable()
export class OrdersService {
  constructor(
    private databaseService: DatabaseService,
    private readonly whatsappService: WhatsAppService,
  ) {}

  private supabase = this.databaseService.getClient();

  async createOrder(order: Order) {
    const { data, error } = await this.supabase.from('orders').insert(order);

    if (error) {
      return error;
    }

    console.log(order)

    // const createWhatsAppMessage = (payload : Order) => {
    //   let orderDetails = payload.orders
    //     .map((order : Product, index : number) => {
    //       return `${index + 1}. ${order.name} (${order.type}), Qty: ${order.amount}, Harga: Rp${order.price.toLocaleString('id-ID')}`;
    //     })
    //     .join('\n');

    //   let productPrice = payload.totalPrice - payload.ongkir;

    //   let deliveryInfo = '';
    //   if (payload.paymentMethod === 'ship') {
    //     deliveryInfo = `Total Harga Produk: Rp${productPrice.toLocaleString('id-ID')}\nOngkir: Rp${payload.ongkir.toLocaleString('id-ID')}\n\n🚚 Alamat Pengiriman: ${payload.address}\n\nPesanan kamu bakal segera dikirim setelah masa pre-order dan proses produksi selesai, ya. Stay tuned!`;
    //   } else {
    //     deliveryInfo = `📍 Pickup di SMAKBO: Merch bisa langsung diambil di SMAKBO setelah masa pre-order dan proses produksi selesai, ya. Stay tuned!`;
    //   }

    //   return `Hai ${payload.name},\n\nThank you for copping the coolest merch from SMAKBO SWAG! 😎\n\nIni dia detail pesanan kamu:\n\n${orderDetails}\n\n💸 Total Harga: Rp${payload.totalPrice.toLocaleString('id-ID')}\nMetode Pembayaran: ${payload.paymentMethod}\n\n${deliveryInfo}\n\n🔥 Jangan lupa buat pantengin IG kita di @SMAKBO.SWAG biar nggak ketinggalan update selanjutnya!\n\nPeace out,\nSMAKBO SWAG`;
    // };

    // const number = '62' + order.number.slice(1);
    // const message = createWhatsAppMessage(order);

    // this.whatsappService.sendMessage(number, message);

    return order;
  }

  async getAllOrder() {
    const { data, error } = await this.supabase.from('orders').select('*');

    return data;
  }
}

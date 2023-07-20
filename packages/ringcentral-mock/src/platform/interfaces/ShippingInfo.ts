import type { MethodInfo } from './MethodInfo';
import type { ShippingAddressInfo } from './ShippingAddressInfo';

// Shipping information, according to which devices (in case of  HardPhone ) or e911 stickers (in case of  SoftPhone  and  OtherPhone ) will be delivered to the customer
export interface ShippingInfo {
  /**
   * Shipping status of the order item. It is set to 'Initial' when the order is submitted. Then it is changed to 'Accepted' when a distributor starts processing the order. Finally the status is changed to 'Shipped' which means that distributor shipped the device.
   */
  status: 'Initial' | 'Accepted' | 'Shipped' | "Won't ship";
  /**
   * Shipping carrier name. Appears only if the device status is 'Shipped'
   */
  carrier: string;
  /**
   * Carrier-specific tracking number. Appears only if the device status is 'Shipped'
   */
  trackingNumber: string;
  /**
   */
  method: MethodInfo;
  /**
   */
  address: ShippingAddressInfo;
}

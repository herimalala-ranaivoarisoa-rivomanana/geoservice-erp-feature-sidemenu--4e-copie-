import { makeRequest, getHeaders } from '@project/utils';

const apiUrl = process.env.REACT_APP_API_SERVICE;
console.log('api Url', apiUrl);

/**
 * Order Services API
 */
class OrderService {
  /**
   * Get order list from api
   * @param { string } type         Orders type
   */
  static async GetOrders(type?: string | 'created', token?: string) {
    try {
      const res = await makeRequest(`${apiUrl}/orders.get.json`, 'GET', getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      const orders: any[]= res.data;
      return orders;
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }
}

export default OrderService;
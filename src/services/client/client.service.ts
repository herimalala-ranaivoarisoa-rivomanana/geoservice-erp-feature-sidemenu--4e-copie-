import { makeRequest, getHeaders } from '@project/utils';

const apiUrl = process.env.REACT_APP_API_SERVICE;
console.log('api Url', apiUrl);

/**
 * Client API
 */
class Client {
  /**
   * Get order list from api
   * @param { string } type         Orders type
   */
  static async GetClient(body?:any,type?: string | 'created', token?: string) {
    try {
      const res = await makeRequest(body?`http://localhost:5000/clients/${body.id}`:`http://localhost:5000/clients`, 'GET', getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      let clients: any[]= res.data
      return clients
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async SearchClient(body:any,type?: string | 'created', token?: string) {
    try {
      const res = await makeRequest(`http://localhost:5000/clients?q=${body.searchText}`, 'GET', getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      let chauffeurs: any[]= res.data
      return chauffeurs
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }


  static async AddClient(body:any, type?: string | 'created',token?: string) {
    try {
      const res=await makeRequest(`http://localhost:5000/clients`, 'POST',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetClient()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async UpdateClient(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/clients/${id}`, 'PUT',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetClient()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async DeleteClient(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/clients/${id}`, 'DELETE',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetClient()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }
}



export default Client;

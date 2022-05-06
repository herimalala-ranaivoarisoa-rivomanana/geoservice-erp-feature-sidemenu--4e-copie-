import { makeRequest, getHeaders } from '@project/utils';

const apiUrl = process.env.REACT_APP_API_SERVICE;
console.log('api Url', apiUrl);

/**
 * Facture API
 */
class Facture {
  /**
   * Get order list from api
   * @param { string } type         Orders type
   */
  static async GetFacture(body?:any,type?: string | 'created', token?: string) {
    try {
const res = await makeRequest(body?`http://localhost:5000/factures/${body.id}?_expand=chauffeur&_expand=pharmacien&_expand=client`:`http://localhost:5000/factures?_expand=chauffeur&_expand=pharmacien&_expand=client`, 'GET', getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      const factures: any[]= res.data;
      return factures; 
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async AddFacture(body:any, type?: string | 'created',token?: string) {
    try {
      const res=await makeRequest(`http://localhost:5000/facturess`, 'POST',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetFacture()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async SetFacture(body:any, type?: string | 'created',token?: string) {
    try {
      const res=await makeRequest(`http://localhost:5000/factures`, 'POST',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetFacture()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async UpdateFacture(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/factures/${id}`, 'PUT',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetFacture()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async DeleteFacture(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/factures/${id}`, 'DELETE',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetFacture()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }
}

export default Facture;
import { makeRequest, getHeaders } from '@project/utils';

const apiUrl = process.env.REACT_APP_API_SERVICE;
console.log('api Url', apiUrl);

/**
 * Pharmacien API
 */
class Pharmacien {
  /**
   * Get order list from api
   * @param { string } type         Orders type
   */
  static async GetPharmacien(body?:any,type?: string | 'created', token?: string) {
    try {
const res = await makeRequest(body?`http://localhost:5000/pharmaciens/${body.id}`:`http://localhost:5000/pharmaciens`, 'GET', getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      const pharmaciens: any[]= res.data;
      return pharmaciens; 
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async AddPharmacien(body:any, type?: string | 'created',token?: string) {
    try {
      const res=await makeRequest(`http://localhost:5000/pharmacienss`, 'POST',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetPharmacien()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async SetPharmacien(body:any, type?: string | 'created',token?: string) {
    try {
      const res=await makeRequest(`http://localhost:5000/pharmaciens`, 'POST',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetPharmacien()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async UpdatePharmacien(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/pharmaciens/${id}`, 'PUT',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetPharmacien()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async DeletePharmacien(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/pharmaciens/${id}`, 'DELETE',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetPharmacien()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }
}

export default Pharmacien;
import { makeRequest, getHeaders } from '@project/utils';

const apiUrl = process.env.REACT_APP_API_SERVICE;
console.log('api Url', apiUrl);

/**
 * Medecine API
 */
class Medecine {
  /**
   * Get order list from api
   * @param { string } type         Orders type
   */
  static async GetMedecine(body?:any,type?: string | 'created', token?: string) {
    try {
const res = await makeRequest(body?`http://localhost:5000/medecines/${body.id}`:`http://localhost:5000/medecines`, 'GET', getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      const medecines: any[]= res.data;
      return medecines; 
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async AddMedecine(body:any, type?: string | 'created',token?: string) {
    try {
      const res=await makeRequest(`http://localhost:5000/medeciness`, 'POST',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetMedecine()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async SetMedecine(body:any, type?: string | 'created',token?: string) {
    try {
      const res=await makeRequest(`http://localhost:5000/medecines`, 'POST',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetMedecine()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async UpdateMedecine(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/medecines/${id}`, 'PUT',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetMedecine()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async DeleteMedecine(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/medecines/${id}`, 'DELETE',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetMedecine()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }
}

export default Medecine;
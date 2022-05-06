import { makeRequest, getHeaders } from '@project/utils';

const apiUrl = process.env.REACT_APP_API_SERVICE;
console.log('api Url', apiUrl);

/**
 * Chauffeur API
 */
class Chauffeur {
  /**
   * Get order list from api
   * @param { string } type         Orders type
   */
  static async GetChauffeur(body?:any,type?: string | 'created', token?: string) {
    try {
      const res = await makeRequest(body?`http://localhost:5000/chauffeurs/${body.id}`:`http://localhost:5000/chauffeurs`, 'GET', getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      let chauffeurs: any[]= res.data
      return chauffeurs
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async SearchChauffeur(body:any,type?: string | 'created', token?: string) {
    try {
      const res = await makeRequest(`http://localhost:5000/chauffeurs?q=${body.searchText}`, 'GET', getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      let chauffeurs: any[]= res.data
      return chauffeurs
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async AddChauffeur(body:any, type?: string | 'created',token?: string) {
    try {
      const res=await makeRequest(`http://localhost:5000/chauffeurs`, 'POST',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetChauffeur()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async UpdateChauffeur(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/chauffeurs/${id}`, 'PUT',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetChauffeur()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async DeleteChauffeur(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/chauffeurs/${id}`, 'DELETE',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetChauffeur()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }
}



export default Chauffeur;
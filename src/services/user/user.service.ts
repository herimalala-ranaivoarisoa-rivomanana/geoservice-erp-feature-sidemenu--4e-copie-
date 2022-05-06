import { makeRequest, getHeaders } from '@project/utils';

const apiUrl = process.env.REACT_APP_API_SERVICE;
console.log('api Url', apiUrl);

/**
 * User API
 */
class User {
  /**
   * Get order list from api
   * @param { string } type         Orders type
   */
  static async GetUser(body?:any,type?: string | 'created', token?: string) {
    try {
      const res = await makeRequest(body?`http://localhost:5000/users/${body.id}`:`http://localhost:5000/users`, 'GET', getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      let users: any[]= res.data
      return users
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }
  static async AddUser(body:any, type?: string | 'created',token?: string) {
    try {
      const res=await makeRequest(`http://localhost:5000/users`, 'POST',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetUser()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async UpdateUser(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/users/${id}`, 'PUT',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetUser()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }

  static async DeleteUser(body:any, type?: string | 'created',token?: string) {
    try {
      const {id} = body;
      const res=await makeRequest(`http://localhost:5000/users/${id}`, 'DELETE',body, getHeaders(token));
      if (!res?.data) throw new Error('Not found');
      return this.GetUser()
    } catch (err: any) {
      console.log(err);
      return [];
    }
  }
}



export default User;

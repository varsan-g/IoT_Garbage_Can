import { IUser } from '../3_models/User.js';

class LoginEndpoint{

   public static async evaluate(request:any, response:any){
    try{
        const user:IUser = request.body;

        // Very primitive
        if(user.psw==='123')
           return response.status(200).json("authorized");

        return response.status(404).json("Not authorized");
     } catch(e){
       console.error(e);
     }
   }
}
export {LoginEndpoint}
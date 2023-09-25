export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public phone: string,
        public password: string, // Debe almacenarse de forma segura (hash + salt)
        public active: boolean,
        public canlent: boolean
     ){}
    
   
  }
  
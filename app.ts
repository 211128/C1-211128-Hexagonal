import express from 'express'
import { Signale } from 'signale' 
import { userRouter } from './src/usuarios/infrastructure/userRoutes';


const app = express();
const signale = new Signale();

app.use(express.json());
app.use('/register',userRouter);
app.use('/users', userRouter);

app.listen(3006, () => {
    signale.success("Server online in port 3006");
});
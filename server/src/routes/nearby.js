import { Router } from 'express'
import { executeQuery } from '../config/db';

let router = Router();


router.get('/', (req, res) => {
let sql = `SELECT * FROM stops
     WHERE lat BETWEEN ${33.5100} AND ${33.5000};`;  
executeQuery(sql)  
})

export default router;
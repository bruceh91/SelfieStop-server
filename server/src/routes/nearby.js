import { Router } from 'express'
import { executeQuery } from '../config/db';

let router = Router();


router.get('/nearby', (req, res) => {
    let sql = `select
                i.image as image,
                i.url as imageurl,
                i.rating as imagerating,
                i._created as imagecreated,
                i.lat as imagelat,
                i.lng as imagelng,
                i.height as imageheight,
                i.width as imagewidth,
                i.orientation as orientation,
                s.name as stop,
                s.description as description,
                s.city as city,
                s.lat as stoplat,
                s.lng as stoplng,
                s.rating as stoprating,
                u.firstname as uploadedby,
                u2.firstname as stopsubmittedby

               from userstops us
                join images i on i.id=us.imageid
                join stops s on s.id=us.stopid
                join users u on u.id=us.userid
                join users u2 on u2.id=s.userid;
            WHERE (imagelat BETWEEN ${33.5100} AND ${33.5000}) AND (imagelng BETWEEN ${33.5031} AND ${-86.000});`;
    executeQuery(sql)
})

export default router;
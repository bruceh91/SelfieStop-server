import { Router } from 'express';
// import peopleRouter from './people';
// import classesRouter from './classes';
// import authRouter from './auth';
// import usersRouter from './users';
// import blogRouter from './blogs';
// import stripeDonationsRouter from './stripeDonations';
// import contactRouter from './contactform';
// import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';
import StopsRouter from './stops';
import UsersRouter from './users';
import ImagesRouter from './images';
import NearRouter from './nearby';

let router = Router();

// router.use('/auth', authRouter);
// router.use('/donate', stripeDonationsRouter);
// router.use('/contact', contactRouter);

// router.route('*')
//     .post(tokenMiddleware, isLoggedIn)
//     .put(tokenMiddleware, isLoggedIn)
//     .delete(tokenMiddleware, isLoggedIn);

router.use('/near', NearRouter);
router.use('/stops', StopsRouter);
router.use('/users', UsersRouter);
router.use('/images', ImagesRouter);
// router.use('/blogs', blogRouter);
// router.use('/classes', classesRouter);
// router.use('/people', peopleRouter);
// router.use('/users', usersRouter);

export default router;
import express from 'express';
var router = express.Router();
import authC from "../controllers/auth.c.js";

router.post('/signup', authC.signup)

export default router;
import express from "express";
import { 
    get,
    find,
    create,
    update,
    destroy
 } from "../controllers/activity.controller.js";
 

const router = express.Router();
 
router.get('/', get);
router.get('/:id', find);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);
 
export { router as activityRouter }

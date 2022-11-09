import express from 'express';
import {fetchAll, insert} from '../controllers/userController.js';
import path from 'path';
import multer from "multer";
const studentRouter=express.Router();


const storage = multer.diskStorage(
    {
        destination:"./public/images",
        filename:(req,file,cb)=>{
          return cb(null , `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
       
  }
  );
  const upload=multer({
    storage : storage 
  });

studentRouter.post('/get_data',upload.single("candidates_resume"),insert);
studentRouter.get('/show_data',fetchAll);

export default studentRouter;
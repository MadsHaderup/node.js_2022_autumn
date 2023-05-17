import { Router } from "express";
import db from "../database/mysql_connection.js";
import pkg from "formidable";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("public/productImages"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(uniqueSuffix);
      cb(null, uniqueSuffix + '-' +file.originalname)
    }
});
  
const upload = multer({ storage: storage });

const router = Router();
const {formidable} = pkg;
router.post("/", upload.single("image"), async (req, res) => {
    let title;
    let description;
    let category;
    let price;
    let image;
    const timecreated = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        title = fields.title;
        description = fields.description;
        category = fields.category;
        price = fields.price;
        image = files.image;
        console.log(title + " " + description + " " + category + " " + price + " " + timecreated);
        console.log('files: '); 
        console.log(files.image.originalFilename); 
        //upload.array(files);
        const [result, _] = await db.execute("INSERT INTO products (title, description, category, price, image, timecreated) VALUES (?, ?, ?, ?, ?, ?);", [fields.title, fields.description, fields.category, fields.price, "files.PersistenFile.originalFilename", timecreated]); 
        
    });
    //console.log(title); 
    
    return res.status(200).send({
        message: "success"
    });
});

export default router;
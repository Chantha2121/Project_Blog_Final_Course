import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const filter = (req, file, cb)=>{
    const allowType = ["image/png", "image/jpeg", "image/jpg"]
    if(allowType.includes(file.mimetype)){
        cb(null, true);
    }
    else{
        cb(new Error("Error"))
    }
}

const fileSizeLimit = 1024 * 1024;

export const upload = multer({
    storage,
    fileFilter: filter,
    limits: {
        fileSizeLimit
    }
})
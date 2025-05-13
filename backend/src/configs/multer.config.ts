import path from "node:path";

import multer from "multer";
import { v6 } from "uuid";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiErrors } from "../errors/api.errors";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "upload"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = v6();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /.jpeg|.jpg|.png|.gif/;
  console.log(
    path.extname(file.originalname).toLowerCase(),
    "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
  );
  console.log(file.minetype, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const minetype = allowedTypes.test(file.mimetype);

  if (extname && minetype) {
    return cb(null, true);
  } else
    cb(new ApiErrors("Only images are allowed", StatusCodesEnum.BAD_REQUEST));

};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //5mb
  fileFilter: fileFilter,
});

export { upload };

import multer, { StorageEngine, diskStorage } from "multer";
import path from "path";
import crypto from "crypto";

const storage: StorageEngine = diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: (_req, file, cb) => {
    crypto.randomBytes(10, (err, hash) => {
      if (err) {
        cb(err, file.originalname);
      } else {
        const filename = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, filename);
      }
    });
  },
});

export const multerConfig = multer({ storage });

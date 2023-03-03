import path from "path"
import crypto from "crypto"
import multer from "multer"
import multerS3 from "multer-s3"
import { S3Client } from '@aws-sdk/client-s3';
import { config } from "dotenv"
config()

const MAX_SIZE_MEGABYTES = 4 * 1024 * 1024

const STORAGE_TYPE = process.env.STORAGE_TYPE

const s3Config= new S3Client({
    region: process.env.AWS_DEFAULT_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_USER_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_USER_SECRET_KEY!,
    }
  })

const storageTypes = {
    local: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "..", "..", "..", "tmp", "uploads"))
      },
      filename: (req, file: any, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err, __filename)
  
          file.key = `${hash.toString("hex")}-${file.originalname}`
  
          cb(null, file.key)
        })
      },
    }),
    s3: multerS3({
          s3: s3Config,
          bucket: process.env.BUCKET_NAME!,
          contentType: multerS3.AUTO_CONTENT_TYPE,
          acl: 'public-read',
          metadata: function (req, file, cb) {
              cb(null, { fieldName: file.fieldname });
          },
          key: (req, file, cb) => {
              crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err)
          
                const fileName = `${hash.toString("hex")}-${file.originalname}`
          
                cb(null, fileName)
              })
          }
      })
  }
export const multerConfig = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: storageTypes[STORAGE_TYPE as keyof object],
    limits: {
      fileSize: MAX_SIZE_MEGABYTES,
    },
    fileFilter: (req: any, file: any, cb: any) => {
      const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
      ]
  
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(new Error("Tipo de arquivo invalido!"))
      }
    },
  }
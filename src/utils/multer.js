// import multer,{ diskStorage } from "multer"
// import { nanoid } from "nanoid"
// import fs from "fs"

// export const uploadFile=(customPath)=>{
//     const storage= diskStorage({
//         filename:(req,file,cb)=>{
//             const fileName=`${nanoid()}__${file.originalname}}`
//             cb(null,fileName)
//         },
//         destination:(req,file,cb)=>{
//          const {_id}=req.user;
//          const folderName= `uploads/${_id}/customPath` 
//          if (!fs.existsSync(folderName)) {
//             fs.mkdirSync(folderName,{recursive:true})
//          }
//          cb(null,folderName)
//         }
//     })

//     const filerFilter= (req,file,cb)=>{
//         // image vedio pdf
// if (file.mimetype.startWith("image")) {
//     cb(null,true)
// }else{
//     cb(new Error("Invalid formate"),false)
// }
//     }
// }

// const upload= multer({fileFilter,storage})
// return upload
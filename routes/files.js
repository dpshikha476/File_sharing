const router = require("express").Router();
const multer = require("multer");
const Str = require("@supercharge/strings");
const path = require("path");
const {v4: uuidv4} = require("uuid");

const File = require("../models/file");

let storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = `${Str.random(15)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    // save to database
    const file = new File({
      uuid: uuidv4(),
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });
});

module.exports = router;

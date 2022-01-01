const multer = require('multer');
const path = require('path');

const uploadFolder = path.join(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, uploadFolder);
	},
	filename: (_req, file, cb) => {
		cb(null, new Date().toISOString() + '-' + file.originalname);
	},
});

const fileFilter = (_req, file, cb) => {
	if (/jpeg|jpg|png|gif|webp/.test(file.mimetype)) {
		cb(null, true);
	} else {
		cb({ message: 'Unsupported file format' }, false);
	}
};

const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 },
	fileFilter: fileFilter,
});

module.exports = upload;

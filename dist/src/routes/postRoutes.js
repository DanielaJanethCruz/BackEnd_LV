const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/auth'); // Asegúrate de que este middleware esté implementado
// Ruta para crear una publicación
router.post('/create', authMiddleware, postController.createPost);
module.exports = router;
//# sourceMappingURL=postRoutes.js.map
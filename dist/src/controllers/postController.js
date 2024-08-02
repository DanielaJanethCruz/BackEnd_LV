var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Post = require('../models/postModelo');
exports.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { email, post } = req.body;
        if (!email || !post) {
            return res.status(400).json({ error: 'Email y post son requeridos' });
        }
        const newPost = yield Post.create({ email, post });
        res.status(201).json(newPost);
    }
    catch (error) {
        console.error('Error al crear publicación:', error);
        res.status(500).json({ error: 'Error al crear la publicación' });
    }
});
//# sourceMappingURL=postController.js.map
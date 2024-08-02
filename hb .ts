/**const posts = []; // Array simple para almacenar posts

// Crear un nuevo post
app.post('/api/posts', authenticate, (req, res) => {
    const { title, content } = req.body;
    const post = { id: posts.length + 1, title, content, author: req.user.username };
    posts.push(post);
    res.status(201).json(post);
});

// Obtener todos los posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Actualizar un post
app.put('/api/posts/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = posts.find(p => p.id == id && p.author === req.user.username);
    if (post) {
        post.title = title;
        post.content = content;
        res.json(post);
    } else {
        res.status(404).send('Post no encontrado o no autorizado');
    }
});

// Eliminar un post
app.delete('/api/posts/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id == id && p.author === req.user.username);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Post no encontrado o no autorizado');
    }
});


const comments = []; // Array simple para almacenar comentarios
const likes = {}; // Objeto para almacenar "me gusta" por post

// Agregar un comentario a un post
app.post('/api/posts/:id/comments', authenticate, (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const comment = { id: comments.length + 1, postId: id, content, author: req.user.username };
    comments.push(comment);
    res.status(201).json(comment);
});

// Obtener comentarios de un post
app.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const postComments = comments.filter(c => c.postId == id);
    res.json(postComments);
});

// Agregar un "me gusta" a un post
app.post('/api/posts/:id/like', authenticate, (req, res) => {
    const { id } = req.params;
    if (!likes[id]) {
        likes[id] = [];
    }
    if (!likes[id].includes(req.user.username)) {
        likes[id].push(req.user.username);
    }
    res.json({ likes: likes[id].length });
});

// Obtener cantidad de "me gusta" de un post
app.get('/api/posts/:id/likes', (req, res) => {
    const { id } = req.params;
    const likeCount = likes[id] ? likes[id].length : 0;
    res.json({ likes: likeCount });
});**/

const express = require('express'); // This is importing the downloaded express package
const app = express(); // This is the function i am storing inside a variable called as app
const PORT = 3000;


// Middlewares
app.use(express.json()); // This middleware is used to accept data in the form of JSON

let articles = [
    {
        id: 1,
        title: 'Technology is booming',
        description: 'Technology lorem lorem lorem lorem lorem lorem ',
        author: 'Prabh'
    },
    {
        id: 2,
        title: 'Science is scary',
        description: 'Science lorem lorem lorem lorem lorem lorem ',
        author: 'Daniel'
    },
    {
        id: 3,
        title: 'Maths is boring',
        description: 'Maths lorem lorem lorem lorem lorem lorem ',
        author: 'Mike'
    },
    {
        id: 4,
        title: 'English is a must to know!',
        description: 'English lorem lorem lorem lorem lorem lorem ',
        author: 'David'
    }
]

// GET API ARTICLES
app.get('/articles', (req, res) => {
    res.status(200).json(articles);
});



// POST API ARTICLES
app.post('/articles', (req, res) => {
    const newArticle = req.body;
    if (!newArticle.title || !newArticle.description || !newArticle.author) {
        res.status(400).json({ error: 'Incomplete data for new article' });
    } else {
        const id = articles.length + 1;
        articles.push({ id, ...newArticle });
        res.status(201).json({ id, ...newArticle });
    }
});



// DELETE API ARTICLES
app.delete('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const articleToDelete = articles.find(article => article.id === id);
    if (!articleToDelete) {
        res.status(404).json({ error: `Article with id ${id} not found` });
    } else {
        articles = articles.filter(article => article.id !== id);
        res.status(204).end();
    }
});



// Listening to server on this PORT - 3000
app.listen(PORT, () => {
    console.log("Server running on port : "  +PORT);
})

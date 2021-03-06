const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT || 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json('Hello, Heroku !')
})

// Installation des poiints de terminaison.
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// On ajoute la gestion des erreurs 404
app.use(({ res }) => {
    const message = `Impssible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.`
    res.status(404).json({ message })
})

app.listen(port, () => console.log(`Notre application est démarrée sur : http://localhost:${port}`))

/*
Code de statut HTTP
1xx -> Information
2xx -> Succès
3xx -> Redirection
4xx -> Erreur du client
5xx -> Erreur du serveur
*/
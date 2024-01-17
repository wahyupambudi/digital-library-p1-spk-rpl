const swaggerDefinition = {
    swaggerDefinition: {
        info: {
            title: 'BACKEND UKK RPL',
            version: '1.0.0',
            description: 'Implementation Backend For REST API',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
            {
                url: 'http://localhost:3000',
            },
            {
                url: 'https://binar-algorithm-fsw-mock-test-production.up.railway.app',
            },
        ],
    },
    apis: ['./routes/user.route.js'],

}

module.exports = swaggerDefinition

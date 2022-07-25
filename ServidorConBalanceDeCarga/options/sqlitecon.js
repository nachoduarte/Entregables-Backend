const options = {
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

module.exports = options;
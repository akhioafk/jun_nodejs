const express = require('express');
const { json } = require('express');
const { createConnection } = require('typeorm');
const EntitySchema = require('typeorm').EntitySchema;
const ActionHistorySchema = require('./actionHistoryEntity');

const app = express();
app.use(json());

createConnection({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
    entities: [ActionHistorySchema],
    synchronize: true,
    logging: false
}).then((connection) => {
    const actionHistoryRepository = connection.getRepository('ActionHistory');

    app.get('/', (req, res) => {
        res.send('hello world');
    });

    app.post('/api/history/create', async (req, res) => {
        const action = actionHistoryRepository.create(req.body);
        const result = await actionHistoryRepository.save(action);
        res.send(result);
    });

    app.get('/api/history/actions', async (req, res) => {
        const { plu, shop_id, action, startDate, endDate, page = 1, pageSize = 10 } = req.query;

        const query = actionHistoryRepository.createQueryBuilder('action');

        if (plu) query.andWhere('action.plu = :plu', { plu });
        if (shop_id) query.andWhere('action.shop_id = :shop_id', { shop_id });
        if (action) query.andWhere('action.action = :action', { action });
        if (startDate) query.andWhere('action.date >= :startDate', { startDate });
        if (endDate) query.andWhere('action.date <= :endDate', { endDate });

        const actions = await query
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getMany();

        res.send(actions);
    });

});

app.listen(3001, () => {
    console.log('action history server running');
});

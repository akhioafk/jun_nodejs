const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: "ActionHistory",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        plu: {
            type: "int"
        },
        shop_id: {
            type: "int"
        },
        date: {
            type: "timestamp",
            default: () => 'CURRENT_TIMESTAMP'
        },
        action: {
            type: "varchar"
        }
    }
});

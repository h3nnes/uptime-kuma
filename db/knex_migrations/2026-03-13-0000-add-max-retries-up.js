exports.up = async function (knex) {
    const hasColumn = await knex.schema.hasColumn("monitor", "max_retries_up");

    if (!hasColumn) {
        await knex.schema.alterTable("monitor", function (table) {
            table.integer("max_retries_up").notNullable().defaultTo(0);
        });
    }
};

exports.down = async function (knex) {
    const hasColumn = await knex.schema.hasColumn("monitor", "max_retries_up");

    if (hasColumn) {
        await knex.schema.alterTable("monitor", function (table) {
            table.dropColumn("max_retries_up");
        });
    }
};

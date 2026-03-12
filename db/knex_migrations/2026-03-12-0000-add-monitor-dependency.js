exports.up = async function (knex) {
    const hasDependsOn = await knex.schema.hasColumn("monitor", "depends_on");

    if (!hasDependsOn) {
        await knex.schema.alterTable("monitor", function (table) {
            table
                .integer("depends_on")
                .nullable()
                .defaultTo(null)
                .unsigned()
                .references("id")
                .inTable("monitor")
                .onDelete("SET NULL")
                .onUpdate("CASCADE");
            table.boolean("suppress_child_notifications").notNullable().defaultTo(false);
        });
    }
};

exports.down = async function (knex) {
    const hasDependsOn = await knex.schema.hasColumn("monitor", "depends_on");

    if (hasDependsOn) {
        await knex.schema.alterTable("monitor", function (table) {
            table.dropForeign("depends_on");
            table.dropColumn("depends_on");
            table.dropColumn("suppress_child_notifications");
        });
    }
};

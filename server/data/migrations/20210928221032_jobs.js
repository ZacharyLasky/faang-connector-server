exports.up = (knex) =>
  knex.schema.createTable('jobs', (tbl) => {
    tbl.increments();
    tbl.text('job_title').notNullable();
    tbl.specificType('job_qualifications', 'text ARRAY').notNullable();
    tbl.text('company').notNullable();
    tbl.text('jobs_url').notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('jobs');

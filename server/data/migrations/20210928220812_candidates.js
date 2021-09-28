exports.up = (knex) =>
  knex.schema.createTable('candidates', (tbl) => {
    tbl.increments();
    tbl.text('candidate_name').notNullable();
    tbl.text('candidate_job_title').notNullable();
    tbl.text('candidate_location').notNullable();
    tbl.specificType('candidate_previous_jobs', 'text ARRAY').notNullable();
    tbl.specificType('candidate_skills', 'text ARRAY').notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('candidates');

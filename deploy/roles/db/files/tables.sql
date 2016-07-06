\set ON_ERROR_STOP true

DO
$body$
DECLARE
    changed integer default 0;
BEGIN

    IF NOT EXISTS (SELECT * FROM pg_tables WHERE tablename='category') THEN

        CREATE TABLE category (
            cat_number smallint,
            cat_desc character varying(25),
            tax_deduct smallint
        ) WITH OIDS;

        -- some sample values to seed the table
        INSERT INTO category (cat_number, cat_desc, tax_deduct)
          VALUES (1, 'grocery', 0);
        INSERT INTO category (cat_number, cat_desc, tax_deduct)
          VALUES (2, 'entertainment', 0);
        INSERT INTO category (cat_number, cat_desc, tax_deduct)
          VALUES (3, 'utilities', 1);

        changed := changed + 1;
    END IF;

    IF NOT EXISTS (SELECT * FROM pg_tables WHERE tablename='exp_detail') THEN

        CREATE TABLE exp_detail (
            exp_number integer,
            cat_number smallint,
            exp_portion numeric(14,2),
            istaxd smallint
        ) WITH OIDS;

        CREATE INDEX expdetail_catno_index ON exp_detail USING btree (cat_number);

        CREATE INDEX expdetail_expno_index ON exp_detail USING btree (exp_number);

        changed := changed + 1;
    END IF;

    IF NOT EXISTS (SELECT * FROM pg_tables WHERE tablename='expense') THEN

        CREATE TABLE expense (
            exp_number SERIAL,
            exp_date date,
            exp_desc character varying(50),
            exp_method_payment character varying(50),
            exp_confirmed smallint,
            exp_amount numeric(14,2),
            taxd_amount numeric(14,2),
            lat_long point
        ) WITH OIDS;

        CREATE UNIQUE INDEX expense_exp_number_key ON expense USING btree (exp_number);

        CREATE INDEX expense_expno_index ON expense USING btree (exp_number);

        CREATE INDEX expense_lat_long_index ON expense USING gist (lat_long);

        changed := changed + 1;
    END IF;

    IF NOT EXISTS (SELECT * FROM pg_tables WHERE tablename='geotagged') THEN

        CREATE TABLE geotagged (
            id SERIAL,
            location VARCHAR(50),
            lat_long point NOT NULL,
            when_added timestamp default now()
        ) WITH OIDS;

        changed := changed + 1;
    END IF;

    IF NOT EXISTS (SELECT * FROM pg_tables WHERE tablename='method_payment') THEN

        CREATE TABLE method_payment (
            name varchar(50),
            sort_order smallint
        ) WITH OIDS;

        -- some sample values to seed the table
        INSERT INTO method_payment (name, sort_order)
          VALUES ('cash', 10);
        INSERT INTO method_payment (name, sort_order)
          VALUES ('Visa', 20);
        INSERT INTO method_payment (name, sort_order)
          VALUES ('check', 30);

        changed := changed + 1;
    END IF;

    IF changed = 0 THEN
        -- indicate nothing changed to Ansible playbook runner
        RAISE EXCEPTION 'No changes';
    END IF;

END
$body$;


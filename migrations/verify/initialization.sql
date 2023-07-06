-- Verify labu:initialization on pg

BEGIN;

SELECT * FROM "administrator" WHERE FALSE;

SELECT * FROM "user" WHERE FALSE;

SELECT * FROM "computer" WHERE FALSE;

ROLLBACK;

-- Revert labu:initialization from pg

BEGIN;

DROP TABLE "computer";

DROP TABLE "user";

DROP TABLE "administrator";

COMMIT;

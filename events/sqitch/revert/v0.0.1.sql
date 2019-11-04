-- Revert postgres:v0.0.1 from pg

BEGIN;

DROP TRIGGER insert_message ON txst.messages;

DROP FUNCTION txst.message_insert_trigger();

DROP FUNCTION txst.emit_message(TEXT, txst.messages);

DROP TABLE txst.messages;

DROP TABLE txst.accounts;

DROP SCHEMA txst;

DROP EXTENSION "uuid-ossp";

DROP EXTENSION citext;

COMMIT;

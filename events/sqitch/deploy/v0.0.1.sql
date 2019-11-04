-- Deploy postgres:v0.0.1 to pg

BEGIN;

CREATE EXTENSION "uuid-ossp";
CREATE EXTENSION citext;

CREATE SCHEMA txst;

CREATE TABLE txst.accounts(
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name CITEXT NOT NULL,
    last_name CITEXT NOT NULL,
    user_name CITEXT NOT NULL
);

CREATE TABLE txst.messages(
    id TEXT DEFAULT uuid_generate_v4() PRIMARY KEY,
    "to" TEXT REFERENCES txst.accounts(id) NOT NULL,
    "from" TEXT REFERENCES txst.accounts(id) NOT NULL,
    message CITEXT NOT NULL,
    placed_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION txst.emit_message(channel TEXT, message txst.messages) RETURNS VOID AS $$
BEGIN
    PERFORM pg_notify('channel_1', JSON_BUILD_OBJECT(
        'event', channel,
        'data', message
    )::TEXT);
END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION txst.message_insert_trigger() RETURNS TRIGGER AS $$
BEGIN
    PERFORM txst.emit_message('createMessage', NEW);
    RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER insert_message AFTER INSERT ON txst.messages FOR ROW EXECUTE PROCEDURE txst.message_insert_trigger();

CREATE OR REPLACE VIEW txst.account_messages AS SELECT act1.first_name as to, act2.first_name as "from", msg.message FROM txst.messages msg
    INNER JOIN txst.accounts act1 ON act1.id = msg.to
    INNER JOIN txst.accounts act2 ON act2.id = msg.from;

COMMIT;

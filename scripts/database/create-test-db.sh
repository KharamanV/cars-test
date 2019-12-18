#!/bin/bash
set -e
set -u

if [ -n "$POSTGRES_TEST_DB" ]; then
	echo "Test database creation requested: $POSTGRES_TEST_DB"
	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
	CREATE USER $POSTGRES_TEST_DB;
    CREATE DATABASE $POSTGRES_TEST_DB;
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_TEST_DB TO $POSTGRES_TEST_DB;
EOSQL
	echo "Test database created"
fi

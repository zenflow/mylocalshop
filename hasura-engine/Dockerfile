FROM hasura/graphql-engine:v1.2.1.cli-migrations-v2

COPY metadata /hasura-metadata/
COPY migrations /hasura-migrations/

ENV HASURA_GRAPHQL_CLI_ENVIRONMENT=default

CMD graphql-engine \
    serve \
    --server-port $PORT \
    --auth-hook $HASURA_SUPPORT_ENDPOINT/auth-hook

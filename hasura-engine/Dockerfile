FROM hasura/graphql-engine:v1.1.1

CMD graphql-engine \
    --database-url $DATABASE_URL \
    serve \
    --server-port $PORT \
    --auth-hook $HASURA_SUPPORT_ENDPOINT/auth-hook

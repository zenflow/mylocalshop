FROM hasura/graphql-engine:v1.2.0

CMD graphql-engine \
    --database-url $DATABASE_URL \
    serve \
    --server-port $PORT \
    --auth-hook $HASURA_SUPPORT_ENDPOINT/auth-hook

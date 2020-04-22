# mylocalshop

Shop local, from home

---

## Installing

### Production

Set up `hasura/engine` on Heroku

1. Create app in Heroku Admin
2. In the Resources tab, find the "Heroku Postgres" add-on and provision the "Hobby Dev - Free" plan
3. In the Settings tab, set environment variable HASURA_GRAPHQL_ADMIN_SECRET under "Config Vars"
4. Locally, in any directory, run `heroku stack:set container -a <app name>` (This one is the key)
5. In Deploy tab, select Github as deployment method, select repo and under "Manual Deploy" click "Deploy Branch"

Set up `hasura/support`
1. Locally, clone this repo and `cd hasura/support`
2. Run `yarn`
3. Run `yarn deploy`.
  - Set up and deploy “...”? [Y/n] **enter `y`**
  - Which scope do you want to deploy to? **pick whatever**
  - Link to existing project? [y/N] **enter `n`**
  - What’s your project’s name? **pick a project name**
  - In which directory is your code located? **press enter to use default `./`**
4. In now.sh Admin, add DATABASE_URL environment variable with same value as found in Heroku admin
5. Locally, run `yarn deploy-to-prod`
5. Go back to Config Vars in Heroku Admin and set `HASURA_SUPPORT_ENDPOINT` to `https://<support app name>.now.sh`

---

## Issues
- Hasura graphql-engine's .cli-migrations docker image not working See de4179751dce532265b7b60824506aabf1ebc44e
    https://hasura.io/docs/1.0/graphql/manual/migrations/auto-apply-migrations.html#auto-apply-migrations

## TODO
- Simplify "Installing > Production" README section
- Add "Installing > Development" README section
- Add "Updating Production" README section
- handle auth
- linting
- testing

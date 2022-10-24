# SubQuery for PhalaWorld

This is SubQuery project for PhalaWorld indexing.

## Preparation

#### Environment

- [Typescript](https://www.typescriptlang.org/) are required to compile project and define types.  

- Both SubQuery CLI and generated Project have dependencies and require [Node](https://nodejs.org/en/).

- [Postgres](https://www.postgresql.org/) as Database.

#### Installation

We need create an user and database for SubQuery:

``` bash
sudo -u postgres createuser subquery --interactive --pwprompt
sudo -u postgres createdb subquery -O subquery
```

Install dependencies:

``` bash
npm install
# OR yarn
yarn
```

For testnet, we don't use default `project.yaml`, we create a copy `project_testing.yaml` with some modification:

1. Set up correlative `chainId` and `endpoint`. You can found `chainId` with [Polkadot/Substrate Portal](https://polkadot.js.org/apps/) by navigate to Settings -> Metadata, the Genesis Hash is what we need.
2. Change `startBlock` to recent block number when your first time start indexing.

Before we run this project first time, we need ensure everything is up-to-date:

```bash
npm run codegen && npm run prepack
```

Then we can test our setup with:

```bash
DB_PASS=<YOUR_PASSOWRD> DB_PORT=5432 DB_HOST=127.0.0.1 DB_USER=subquery DB_DATABASE=subquery node_modules/.bin/subql-node -f project_testing.yaml --db-schema public --port 3000
```

The indexer will start to works.

We need start query service as HTTP endpoint:

```
node_modules/.bin/subql-query --indexer=http://127.0.0.1:3000 --name public --port 3001
```

#### Daemonization

We use Supervisor for process control in testing server. Here is snippet for memo purpose:

```
[program:subql-node]
directory=<path_to_subquery_project>
command=/usr/bin/node node_modules/.bin/subql-node -f project_testing.yaml --db-schema public --port 3002
autorestart=true
redirect_stderr=true
killasgroup=true
stopasgroup=true
stdout_logfile=/var/log/supervisor/%(program_name)s.log
stdout_logfile_maxbytes=0
logfile_maxbytes=0
environment=
  DB_PASS="<YOUR_PASSOWRD>",
  DB_PORT="5432",
  DB_HOST="127.0.0.1",
  DB_USER="subquery",
  DB_DATABASE="subquery"

[program:subql-query]
directory=<path_to_subquery_project>
command=/usr/bin/node node_modules/.bin/subql-query --indexer=http://127.0.0.1:3002 --name public --port 3003
autorestart=true
redirect_stderr=true
killasgroup=true
stopasgroup=true
stdout_logfile=/var/log/supervisor/%(program_name)s.log
stdout_logfile_maxbytes=0
logfile_maxbytes=0
environment=
  DB_PASS="<YOUR_PASSOWRD>",
  DB_PORT="5432",
  DB_HOST="127.0.0.1",
  DB_USER="subquery",
  DB_DATABASE="subquery"
```

Save snippet above with path `/etc/supervisor/conf.d/subquery.conf`. You need reload Supervisor's configuration:

```
sudo supervisorctl reread && sudo supervisorctl update
```

## Configure your project

In the starter package, we have provided a simple example of project configuration. You will be mainly working on the following files:

- The Manifest in `project.yaml`
- The GraphQL Schema in `schema.graphql`
- The Mapping functions in `src/mappings/` directory

For more information on how to write the SubQuery, 
check out our doc section on [Define the SubQuery](https://doc.subquery.network/define_a_subquery.html) 

#### Code generation

In order to index your SubQuery project, it is mandatory to build your project first.
Run this command under the project directory.

````
yarn codegen
````

## Build the project

In order to deploy your SubQuery project to our hosted service, it is mandatory to pack your configuration before upload.
Run pack command from root directory of your project will automatically generate a `your-project-name.tgz` file.

```
yarn build
```

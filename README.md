# official website
https://protokit.dev/docs/quickstart

# Info
https://github.com/proto-kit/starter-kit

# my github
https://github.com/MartinYeung5/20240709_protokit

# git remote remove origin

# bug fixed
20240709
* update turbo.json:
change pipeline to tasks

{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {},
    "start": {
      "cache": false
    }
  }
}



# Protokit starter-kit

This repository is a monorepo aimed at kickstarting application chain development using the Protokit framework.

## Quick start

The monorepo contains 1 package and 1 app:

- `packages/chain` contains everything related to your app-chain
- `apps/web` contains a demo UI that connects to your locally hosted app-chain sequencer

**Prerequisites:**

- Node.js v18
- pnpm
- nvm

> If you're on windows, please use Docker until we find a more suitable solution to running the `@proto-kit/cli`. 
> Run the following command and then proceed to "Running the sequencer & UI":
>
> `docker run -it --rm -p 3000:3000 -p 8080:8080 -v %cd%:/starter-kit -w /starter-kit gplane/pnpm:node18 bash`


### Setup

```zsh
git clone https://github.com/proto-kit/starter-kit my-chain
cd my-chain

# ensures you have the right node.js version
nvm use
pnpm install
```

### Running the sequencer & UI

```zsh
# starts both UI and sequencer locally
pnpm dev

## 同時start (重點)
# starts UI only
pnpm dev --filter web
# starts sequencer only
pnpm dev --filter chain

```

pnpm add @dot/env --workspace-root

error:
when run
* pnpm dev --filter chain

error message:
chain:dev: Error: Substituted environment variable PROTOKIT_ENV_FOLDER not found

location:
* in packages/chain/package.json
    "dev:run": "node --loader ts-node/esm --experimental-vm-modules --experimental-wasm-modules --experimental-wasm-threads --es-module-specifier-resolution=node ./src/start.ts start \"./environments/$PROTOKIT_ENV_FOLDER/chain.config.ts\" $1",

why ?
need to update the command:
pnpm env:inmemory dev --filter chain

### Running tests
```zsh
# run and watch tests for the `chain` package
pnpm run test --filter=chain -- --watchAll
```

Navigate to `localhost:3000` to see the example UI, or to `localhost:8080/graphql` to see the GQL interface of the locally running sequencer.

## 20240719
https://protokit.dev/docs/quickstart/configuration
* Your app-chain can be configured at three different levels: runtime, chain and client.

## 20240805
### App-chain's runtime
https://protokit.dev/docs/quickstart/app-chain

packages/chain/src/balances.ts
*  test your runtime modules 
packages/chain/test/balances.test.ts

Then can run :
* pnpm run test --filter=chain
can run the test case !
注意 pnpm run test --filter=chain --watchAll 會出error
error msg: unexpected argument '--watchAll' found

### Configuration
https://protokit.dev/docs/quickstart/configuration

Your app-chain can be configured at three different levels: 
* "runtime", 
* "chain" and 
* "client".
Firstly we start with the overall runtime configuration, specifying the definition/configuration of your runtime module layout:

#### runtime
* packages/chain/src/runtime.ts

#### chain & client
Server & client configuration

* packages/chain/src/chain.config.ts
* packages/chain/src/client.config.ts

The runtime configuration above is then used to define app-chain configurations for both client and server side app-chains. Keep in mind that configuration for the rest of the app-chain, namely the protocol and the sequencer is provided implicitly behind the scenes.

chain.config.ts is used by Protokit's CLI to start a server-side app-chain, while client.config.ts is used by the Protokit SDK to connect to the server-side app-chain via e.g. GraphQL.


#### Implementing runtime modules
https://protokit.dev/docs/quickstart/first-runtime-module

Its safe to assume that you'll want to implement your "own runtime module", and add it to the application chain. Doing so is very easy, and can be done in a few simple steps. We'll walk through the process of creating a simple runtime module called GuestBook.

* Designing a runtime module: 
To design a runtime module, you'll need to consider the following:
What will be configurable in the module?
What data will the module store?
What methods will the module expose?

##### Storage
* create simple module "GuestBook" !
For our GuestBook module, we'll want to allow users to check-in in the guest book. We'll start by defining the data model, namely the CheckIn struct, which will determine what constitutes a check-in.
step 1:
* packages/chain/src/guest-book/check-in.ts

what is dist folder?

step 2:
* Define the runtime module:
Second step is to create our runtime module and define the checkIns storage property, which will map a guest to the check-in they made.
* packages/chain/src/guest-book/index.ts

##### Methods
Now that we have our storage defined, we can start implementing the methods that will allow users to interact with the module. We'll define the checkIn_ method, which will allow users to check-in in the guest book.

update (add "runtimeMethod")
* packages/chain/src/guest-book/index.ts

##### Extending the app-chain configuration
In order to make use of the GuestBook runtime module, we have to add it to the app-chain's runtime configuration.

* update 
packages/chain/src/runtime.ts

* results:  implemented a custom runtime module (done)

#### Client interaction
Once you are ready to interact with your app-chain, the first step is to start the sequencer. You may do so by using the Protokit CLI, which is available as part of the starter-kit under the following command:
 * pnpm dev --filter chain

The command above will start a local sequencer, which will be available at http://localhost:8080/graphql.

### upgrade
* need to upgrade
```zsh
# starts both UI and sequencer locally
pnpm env:inmemory dev

# starts UI only
pnpm env:inmemory dev --filter web
# starts sequencer only
pnpm env:inmemory dev --filter chain
```

### Running tests
```zsh
# run and watch tests for the `chain` package
pnpm run test --filter=chain -- --watchAll
```

## 20240806
1. pnpm install
2. pnpm run build

when run command:
pnpm env:inmemory dev --filter web
Error message:
Module not found: Can't resolve 'chain'
solution:
dont' use this command and change to use "pnpm env:inmemory dev"

## 20240807
when run command:
3. pnpm env:inmemory dev
results:
successful 

### App-chain's runtime
packages\chain\src\runtime\modules\balances.ts = packages/chain/src/balances.ts
*  a single runtime module called Balances.

### Configuration
packages\chain\src\runtime\index.ts = packages/chain/src/runtime.ts

packages\chain\src\environments\client.config.ts = packages/chain/src/client.config.ts

### Implementing runtime modules
https://protokit.dev/docs/quickstart/first-runtime-module

packages\chain\src\runtime\modules\guest-book\client.config.ts = packages/chain/src/guest-book/check-in.ts

* Storage
For our "GuestBook" module, we'll want to allow users to check-in in the guest book. We'll start by defining the data model, namely the CheckIn struct, which will determine what constitutes a check-in.

addBalance() only need to set 1 time at packages\chain\src\runtime\modules\balances.ts
add new file
* index.ts
* check-in.ts
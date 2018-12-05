# brak-its

# READ ME IS COMING 12/5/2018



## Quick Reference
* React Dev Server (frontend)
  * http://192.168.90.20:3000*
* Express API (backend)
  * http://192.168.90.20:3001/api*
  * **IMPORTANT**: If you modify `/api/package.json` or `/api/.env` you will need to run `npm run docker:build` to update the image
  * React Proxys HTTP requests to 3001 in Dev mode (see `package.json`)
* MySQL
  * Port: 3306
  * User: root
  * Password: root
* Docker Environment Configuration
  * Full-Stack Environment: [docker-compose.yml](docker-compose.yml)

## [Notable] File Structure
This is not an exhaustive list, just some worth noting

```
+-- /api                          : Express Server
|   +-- /.env.sample              : Sample .env
|   +-- /package.json             : Express dependencies
+-- /Public                       : React Public assets
+-- /src                          : React App Source
+-- /.dockerignore                : Docker copy ignore (https://docs.docker.com/engine/reference/builder/#dockerignore-file)
+-- /Dockerfile                   : Docker Deploy build spec for React/Express/Heroku (production build/deploy)
+-- /Dockerfile.express           : Docker build spec for (local) Express
+-- /Dockerfile.react             : Docker build spec for React (local) dev server
+-- /docker-compose.yml           : Full Stack Docker environment spec (local development)
+-- /provision.sh                 : Provisioner for Vagrant VM
+-- /vagrantfile                  : Vagrant VM definition
```

Start up the VM with `vagrant up`. Once booted, `vagrant ssh` to access the terminal, and change to the `/var/www` folder where the entire contents of this application is mounted as a shared folder.

> **Note** - if your OS supports Docker without the helper VM, it's just as easy to run this application locally with Docker instead of within the VM. **Dealers choice**!

### Starting Full Stack Environment

> **First** - if you are going to need custom `environment` variables, copy `/api/.env.sample` to `/api/.env`. This file **will not be committed to source control** and is intended for local development only. These values should be matched in **Heroku Config Vars** for production apps.

To start the local development environment, run this command:

`docker-compose up`

> Inside a VM, run this command from `/var/www`

This command will read the `docker-compose.yml` file, which specifies **build** parameters (in [Ruby syntax](https://docs.docker.com/engine/reference/commandline/build/#extended-description)) that sets up the local development environment. This is **not a production build**, this is for local only.

> **Note**: first run will build all three images (see manual rebuilding below), and will take several minutes. Subsequent restarts should be very quick.

### Terminating Environment
While `docker-compose` is running, press `CTRL+C`. Status will show Docker container instances terminating. If the environment is running in the background (`-d` command line param), you can use `docker-compose down` to terminate the environment.

### Manually rebuilding the images (not usually necessary)
`docker-compose build`
> **Note**: This runs only once automatically, on first `docker-compose up`. It should not need to be manually run again unless there is a need to delete an image from docker ([`docker rmi [imageGuid]`](https://docs.docker.com/engine/reference/commandline/image_rm/)).

> **Another Note**: It's **completely** harmless to run this at any point in time. Doing this will re-install any missing packages in your containers as long as you have not removed the `npm install` statements from each `Dockerfile`.

### Connecting to MySQL/Mongo with a client
MySQL/Mongo running as a Docker container registers itself on the local machine, so the host is `localhost` or, more reliably, `127.0.0.1` loopback address. The username and password (defined in `docker-compose.yml`) default to `root`, and the port is default `3306` for MySQL and default `27017` for Mongo.

## Deploying to Heroku
When ready, this project can be deployed to the Heroku container using the Heroku CLI.

Before doing anything, log in to Heroku **and** the Heroku Container Registry.

`heroku login`

`heroku container:login`

> **Important**: For first deployment be sure to run `heroku create` to initialize the app, or use the CLI to connect to an existing project

Now you're ready to build and deploy. An **npm** script is provided in `package.json`:

> NOTE: Before deploying, ensure all **React dependencies from `package.json`** are also added to `/api/package.json`. That file is copied as the deployed `package.json` and the dependencies are needed so Docker can compile React while building the image.

`npm run deploy`

**Tl;Dr;** this does the following:
* Docker image built from `./Dockerfile`, which builds the React app on the fly, and copies the Express app to the root of the deployment image
* Sets Heroku Config Var NODE_ENV to "production" (so Express serves static content)
* Heroku build & release

### Heroku Config Vars (environment variables)
The [Heroku Config Vars](https://devcenter.heroku.com/articles/config-vars) for each project function identical to entries in a `.env` file. Any sensitive credentials your app needs can be added to Heroku Config Vars with the same Key as in the `/api/.env` file and it will be used as the production environment setting.

Example: local `.env` file contains `AWS_KEY` with personal developer key. The Heroku Config Vars for the project can specify `AWS_KEY` as config key, and the value would be the production API key. This insulates all private key data from the repo and public access.

### Docker Cleanup
There is an npm script in `package.json` that will clean up "dangling" images from Docker. Every so often it's recommended you run this command:

`npm run docker:clean`

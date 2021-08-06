# really-meh?

Hackweek '21 project on curbing the spread of fake news through crowdsourcing.

Client Hostname: https://really-meh.netlify.app
Server Hostname: https://really-meh.herokuapp.com

## Deployment

### Client

Ensure that you have permissions to deploy to Netlify

1. Install Netlify CLI (if necessary)

```
npm install -g netlify-cli
```

2. Pull the latest changes from `master` into the branch `deploy-client`

```
git checkout deploy-client
git pull origin master
```


3. At the client directory, generate build files

```
cd client/
npm run build
```

4. Sign in and deploy to Netlify

```
netlify deploy --prod --dir=./build
```

### Server

Ensure that you have permissions to deploy to Heroku

1. Install Heroku CLI (if necessary) and sign in to Heroku

```
brew install heroku/brew/heroku
heroku login
```

2. Pull the latest changes from `master` into the branch `deploy-server`

```
git checkout deploy-server
git pull origin master
```

3. If there are new packages installed, copy and paste the requirements into `requirements.txt`

4. At the project's root directory, deploy the `server` sub-directory to Heroku

```
git subtree push --prefix server heroku deploy-server
```

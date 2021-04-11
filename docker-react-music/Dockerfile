FROM node:14.10 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# ? ->> How it works?
# On line 1, we’re using the FROM <image:tag> as <name> format which is new to Docker 17.05.
# The as build-deps part allows us to name this part of the build process. That name can then be referred to when configuring the production environment later.
# On lines 4 & 5 we copy package.json and yarn.lock into the image and then run yarn — this separates the dependency installation from the edits to our actual source files. This allows Docker to cache these steps so that subsequent builds — one’s in which we only edit source files and don’t install any new dependencies — will be faster.
# Next on lines 6 & 7 we copy everything else into the image and then run the build command. This will produce the ‘artifact’ inside of the build directory — just as it would if you were to run this command locally!
# Be careful, copy . ./ can be quite dangerous is it will copy the entire current directory into a build context, which may be huge! Add a .dockerignore file to combat this, mine would look something like https://gist.github.com/anonymous/f1b3e2cc530900338a0c38bce5e0e4c1

# Contributing to this plugin

Features/bugfixes are welcome!

## About the code

* Written in Typescript 3.x, with ES5 as the target build
* Built with Webpack v4
* All unit/integration tests are in jest
* CircleCI integrated

## Build Environment

* yarn
* jest
* node v8+
* docker
* docker-compose
* circleci (optional)

## Building the plugin

`yarn install` - this will download all needed packages into node_modules
`yarn dev` - will run webpack in "watch" mode with source-maps enabled

A "production" build can be created by running `yarn build`.

## Testing the plugin

* `jest` - runs all tests
* `jest unit` - runs unit tests
* `jest int` - runs integration tests

## Running with Docker
A ``docker-compose.yml`` file is provided to easily stand up a Grafana 5.x server with this app mapped to the container.

### Upgrading packages

Useful commands for upgrading packages and updating the package.json entries:

`yarn global add syncyarnlock`
`syncyarnlock -s -k -g -l`

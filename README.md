# README

Scrape Quora answers for user



## Requirements

- Deno
- Quora User ID, e.g. `123456789`
- Quora 



## Usage

- visit [user profile](https://quora.com/profile/foo) in browser, scroll down, watch for request to `graphql/gql_para_POST` in Dev Tools
- set env vars from request headers in `.env`
- scrape for user ID from request body

```sh
deno task scrape 123456789
```

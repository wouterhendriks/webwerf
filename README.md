# Webwerf

## URLs
Your live/test/acceptance URLs here

## Backend
Your backend URLs here

## Installation
```
#!bash
# Clone the repo and save as 'webwerf'
git clone <URL-to-Git-repository> "$(wh getdatadir)installedmodules/webwerf"

# Make sure WebHare knows about this module
wh softreset

## Satisfy the module dependencies
whcd webwerf/webdesigns/webwerf/
wh noderun npm install
wh noderun bower install
# if whcd is unavailable, try:
# cd "$(wh getmoduledir webwerf)webdesigns/webwerf/"

# Install the site
wh sitemgr install 'Webwerf'
```

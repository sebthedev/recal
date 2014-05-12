#!/bin/bash

# dashboard
rm -f dashboard.js dashboard.min.js
cat nice/static/js/*.js nice/static/js/dashboard/*.js >> nice/static/compiled/dashboard.js
yuicompressor nice/static/compiled/dashboard.js -o nice/static/compiled/dashboard.min.js

rm -f dashboard.css dashboard.min.css
cat nice/static/css/*.css nice/static/css/dashboard/*.css >> nice/static/compiled/dashboard.css
yuicompressor nice/static/compiled/dashboard.css -o nice/static/compiled/dashboard.min.css

# profile
rm -f profile.js profile.min.js
cat nice/static/js/*.js nice/static/js/profile/*.js >> nice/static/compiled/profile.js
yuicompressor nice/static/compiled/profile.js -o nice/static/compiled/profile.min.js

rm -f profile.css profile.min.css
cat nice/static/css/*.css nice/static/css/profile/*.css >> nice/static/compiled/profile.css
yuicompressor nice/static/compiled/profile.css -o nice/static/compiled/profile.min.css

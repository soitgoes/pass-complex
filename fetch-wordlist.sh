wget https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/10_million_password_list_top_1000000.txt
mv 10_million_password_list_top_1000000.txt word-list.txt
node --max-old-space-size=10000 loadPouch.js

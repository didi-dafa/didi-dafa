#!/bin/bash
cd `dirname $BASH_SOURCE`
if [ -f პროც ]; then
    pid=`cat პროც`
    if ps -p $pid > /dev/null; then
        kill $pid
        while ps -p $pid > /dev/null; do
            sleep 0.2
        done
    fi
    rm -f შეც გამოს პროც
fi

for pid in `ps aux | grep node | grep დიდი\ დაფა | grep \`whoami\` | awk '{ print $2 }'`; 
do 
  kill $pid; 
done;

# მოვკლათ მეორეჯერ

sleep 1
for pid in `ps aux | grep node | grep დიდი\ დაფა | grep \`whoami\` | awk '{ print $2 }'`; 
do 
  kill -9 $pid; 
done;

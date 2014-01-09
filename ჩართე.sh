#!/bin/bash
cd `dirname $BASH_SOURCE`
./გააჩერე.sh
node მომსახურე.js > გამოს 2> შეც &
echo $! > პროც

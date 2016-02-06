#!/bin/bash
#
[ "$#" -eq 1 ] || (echo "Error: require one argument" && exit 1)
curl -o $1.zip http://gazette.nat.gov.tw/egFront/OpenData/download.jsp?fn=$1
minimumsize=400
actualsize=`wc -c <$1.zip`
if [ $actualsize -ge $minimumsize ]; then
	unzip $1.zip -d data
else
    echo size too small, ignored.
fi

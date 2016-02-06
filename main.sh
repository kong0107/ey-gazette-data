#!/bin/bash
#
# Usage: $0 <fn>
# This would download `http://gazette.nat.gov.tw/egFront/OpenData/download.jsp?fn=<fn>`,
# unzip it to `./data` if its size is big enough, and then delete the archive.
# @see http://gazette.nat.gov.tw/egFront/OpenData/help.jsp
#
# Usage: $0
# Download all and unzip them to `./data`.
#
# For bash syntax:
# @see http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO.html
# @see http://stackoverflow.com/questions/16489809/emulating-do-while-loop-in-bash

#
# Definitions.
#
minimumsize=400
function grab {
	curl -o $1.zip http://gazette.nat.gov.tw/egFront/OpenData/download.jsp?fn=$1
	actualsize=`wc -c <$1.zip`
	if [ $actualsize -ge $minimumsize ]; then
		unzip $1.zip -d data
		return 0
	else
		echo file too small, ignored
		return 1
	fi
}

if [ -n "$1" ]; then
	grab $1
	rm $1.zip
	exit
fi

nowYear=$[`date +%Y`-1911]
nowMonth=`date +%m`
nowDate=`date +%d`

#
# A wrapper, for easily debug.
#
function wrapper {
	grab $1
	return $?
}

#
# Download history data.
#
year=94
while [ $year -le $nowYear ]; do
	month=1
	while [ $month -le 12 ]; do
		if [[ $year -eq $nowYear && $month -eq $nowMonth ]]; then break; fi
		date=1
		while : ; do
			str=`printf "%03d-%02d_%d" $year $month $date`
			echo $str
			wrapper $str
			rm $1.zip
			if [ $? -ne 0 ]; then break; fi
			sleep 1
			let date=date+1
		done
		let month=month+1
	done
	let year=year+1
done

#
# Download data of the current month
#
date=1
while [ $date -le $nowDate ]; do
	str=`printf "%03d-%02d-%02d" $nowYear $nowMonth $date`
	echo $str
	wrapper $str
	rm $1.zip
	let date=date+1
done

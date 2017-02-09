#coding=utf-8
#!/usr/bin/python

import csv

def getCsvToArray(filename):
	csvreader = csv.reader(open(filename))
	csvlist = list(csvreader)
	tmplist = csvlist[1:]
	data =[]
	for item in tmplist:
		pos = item[0].split(',')
		x = int(pos[0])
		y = int(pos[1])
		name = item[1]
		type = int(item[3])
		url = item[2]
		visible = item[4]
		if type==1:
			element =  [type,name,url,x,y,visible]
		else:
			status = int(item[5])
			tx = int(item[6])
			ty = int(item[7])
			rx = int(item[8])
			ry = int(item[9])
			rw = int(item[10])
			rh = int(item[11])
			rect = [rx,ry,rw,rh]
			element = [type,name,url,status,x,y,tx,ty,rect,visible]
		data.append(element)
	return data
def parsefile(filename):
	result = getCsvToArray(filename)
	print result
def printcsv(filename):
	l = getCsvToArray(filename)
	for row in l:
		print '%s,' % row

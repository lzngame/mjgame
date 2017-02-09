#!/usr/bin/env python
import Image
import sys
import json
import os

def exepic(dirname,name):
	im = Image.open(dirname+'/'+name)
	width = im.size[0]
	height = im.size[1]
	w = 0
	h = 0
	rw = w
	rh = h
	rw1 = width
	rh1 = height
	tp = im.getpixel((w,h))
	while(tp[3] == 0):
		w = w+1
		if(w==width):
			w = 0
			h = h+1
		tp = im.getpixel((w,h))
	
	rh = h
	w = 0
	h = 0
	tp = im.getpixel((w,h))
	while(tp[3] == 0):
		h = h+1
		if(h==height):
			h =0
			w = w+1
		tp = im.getpixel((w,h))
	rw = w
	
	w = 0
	h = height-1
	tp = im.getpixel((w,h))
	while(tp[3] == 0):
		w = w+1
		if(w==width):
			w = 0
			h = h-1
		tp = im.getpixel((w,h))
	rh1 = h+1
	
	
	w = width -1
	h = 0
	tp = im.getpixel((w,h))
	while(tp[3] == 0):
		h = h+1
		if(h==height):
			h =0
			w = w-1
		tp = im.getpixel((w,h))
	rw1 = w+1
	rect = (rw,rh,rw1,rh1)
	minpic = im.crop(rect)
	minpic.save(name)
	return rect 
	
def exedir(path):
	l = os.listdir(path)
	jsondir = {}
	for item in l:
		if item.index('png') > 0:
			filename =  path+'/'+item
			print(filename)
			rect = exepic(path,item)
			jsondir[item] = rect
	print(jsondir)	
	st = json.dumps(jsondir)	
	f = open('./offset.json','w')
    f.write(st)
    f.close()

	return jsondir
	
		
		
		
	
	
	
	


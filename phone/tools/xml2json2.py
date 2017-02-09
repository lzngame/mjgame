#coding=utf-8
#!/usr/bin/python

from xml.sax.handler import ContentHandler
from xml.sax import make_parser
from glob import glob
import json
import sys
import re
import os
import string

class tempHandler(ContentHandler):
	def __init__(self):
		self.tags ={}
		self.currentKey = ""
		self.currentTag=""
		self.step = 0
		self.parseStep = 0
		self.pngNum = 0
		self.skip = False
	def startElement(self,tag,attr):
                if tag == 'SubTexture':
                        key = attr['name']
			key = key[0:len(key)-4]
                        x = attr['x']
                        y = attr['y']
                        w = attr['width']
                        h = attr['height']
                        self.tags[key]=[string.atoi(x),string.atoi(y),string.atoi(w),string.atoi(h)]
                
	def endElement(self,name):
		pass

	def characters(self,content):
		pass

	def endDocument(self):
		print repr(self.tags)
		print "JSON\n",json.dumps(self.tags)
		f = open('../js/data/loaddata.js','w')
		title00 = json.dumps(self.tags)
		title01 = 'game.loaddata = new function(){\nvar self=this;\n'
		title02 = 'self.IMAGEDATA_1 ='
		title03 = 'self.DOWNLOADLIST_PNGS ='
		title04 = os.listdir('../img/loadimgs/')
		title05 = ';\n'
		title04 = json.dumps(title04)
		#title04 = '[\''+reduce(lambda x,y:x+',\''+y+'\'',title04)+']'
		title06 = '}'
		content = ''.join([title01,title02,title00,title05,title03,title04,title05,title06])
		print('\n')
		print(content)
		f.write(content)

		f.close()

def parsefile(filename):
	parser = make_parser()
	parser.setContentHandler(tempHandler())
	parser.parse(filename)

if __name__ == '__main__':
	filename = sys.argv[1]
	parsefile(filename)

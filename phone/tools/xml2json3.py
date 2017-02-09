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
import os.path  


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
		print "JSON\n ",json.dumps(self.tags),';'
		title00 = json.dumps(self.tags)
		
	
		

def parsefile(filename):
	parser = make_parser()
	parser.setContentHandler(tempHandler())
	parser.parse(filename)

if __name__ == '__main__':
	filename = sys.argv[1]
	parsefile(filename)

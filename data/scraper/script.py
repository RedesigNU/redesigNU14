#!/usr/bin/env python

import requests
import json

BASE_URL = "http://vazzak2.ci.northwestern.edu/"
SUBJECTS_URL = BASE_URL + "subjects/"
TERMS_URL = BASE_URL + "terms/"

subjects = []
sub_response = requests.get(SUBJECTS_URL)
sub_data = json.loads(sub_response.content)
for x in sub_data:
	subjects.append(x['symbol'])

terms = []
terms_response = requests.get(TERMS_URL)
terms_data = json.loads(terms_response.content)
for x in terms_data:
	terms.append(x['term_id'])


for term in terms:
	fname = str(term) + "_data"
	f = open(fname, 'w')
	f.write("[")
	for subject in subjects:
		url = BASE_URL + 'courses/?term=' + str(term) + '&subject=' + subject
		course_response = requests.get(url)
		course_data = json.loads(course_response.content)
		f.write(str(course_data)[1:-1])
	f.write("]")

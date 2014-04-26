#!/usr/bin/env python

import requests

BASE_URL = "http://vazzak2.ci.northwestern.edu/"
SUBJECTS_URL = BASE_URL + "subjects/"

subjects = []

r = requests.get(SUBJECTS_URL)
sub_json = r.json

for a in sub_json:
	pass

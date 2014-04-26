#!/usr/bin/env python

import requests
import json
import time

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
        if x['term_id'] > 4400: #Fall 2010
                terms.append(x['term_id'])
                
for term in terms:
        course_response = ""
        cumlen = 0
        fname = str(term) + "_data"
        f = open(fname, 'w')
        for subject in subjects:
                url = BASE_URL + 'courses/?term=' + str(term) + '&subject=' + subject
                resp = str(requests.get(url).content)
                if resp[-2] != "}": #Check whether the block is empty and if it is, move on.
                        print "Get request to " + url, "EMPTY"
                        continue;
                print "Get request to " + url, "End chars: " + resp[-10:]
                cumlen += len(resp)
                course_response += resp[1:-1] + "," #Remove the first and last list delimiters. Essentially we append the departments together
        print cumlen
        f.write('['+course_response[:-1]+']') #[-1] removes the last comma before the end of the list.
f.close()

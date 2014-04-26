redesigNU14
===========

* Alex Duner
* Alexander Martin
* David Heydari
* Shu Funato
* Adam Baker

*************** Description *****************
This project started during ASG's 2014 (and first) Hackathon at Northwestern University. We wanted to create something which would make it easier for students to compare peripheral degree requirements (e.g. "distros" in Weinberg, "themes" in McCormick) and get data on which classes fulfil which of these requirements. Students are often daunted by the sheer number of classes which they can take to meet these "distro" requirements. Because distro information is not always readily aviailble via CAESAR, we wanted to make an application which would simplify the process of finding these peripheral classes. 

Our project cross-references data from CAESAR (via an API) with information from distro data sheets. We then use a combination of python and javascript to take a user search query and return a list of classes which satisfy their request. For example, if the user wants to find all classes which can satisfy the FAL (Fine Arts and Literature) requirement for McCormick in Spring 2014, we will return a cross-department list which they can then filter down by department.
The interface gives students quick access to class data including meeting times, location, professor, and a description where available.

The limited access provided by the CAESAR API (we were unable to query the caesar class search by anything more than term and department data)) means that our first implementation of this software is rather crude. With improvement to the API, however, it could become much more powerful. 

*************** Software used **************
	-   jQuery
	-   Python
	-   moment.js
	-   CAESAR API


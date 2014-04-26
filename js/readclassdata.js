function getTime(inClass)
{
	//Returns the meeting times of a class as a string
	var meetingDays = inClass.meeting_days;
	var startTime = moment(inClass.start_time, "HH:mm:ss").format("LT");
	var endTime = moment(inClass.end_time, "HH:mm:ss").format("LT");
	return meetingDays + " " + startTime + "-" + endTime;
}

function getInstructor(inClass)
{
	//Returns the course instructor's name
	return inClass.instructor.name;
}

function getRoom(inClass)
{
	//Returns the room the class is held in
	return inClass.room;
}

function getAvailability(inClass)
{
	//Returns whether the class has availability, could be made more complex later on.
	return inClass.seats;
}

function getOverview(inClass)
{
	if (inClass.overview == null)
	{
		return {"desc": "No Class Description Available. See Department Website", "desc_set": null};
	}
	else
	{
		return {"desc": inClass.overview, "descSet": inClass.coursedesc_set};
	}
}

function getDiscussions(inClass)
{
	//Looks for discussion sections in the course components field and formats them as a string.
	var returnData = [];
	if (inClass.coursecomponent_set.length > 0)
	{
		for (c in inClass.coursecomponent_set)
		{
			var comp = inClass.coursecomponent_set[c];
			if (comp.component = "DIS")
			{
				returnData[comp.section] = {"Time": getTime(comp), "Room": getRoom(comp)};
			}
		}
	}
	return returnData;
}

function getName(inClass)
{
	//Returns a  title for the course, e.g. "General Physics"
	return inClass.title;
}

function getSysId(inClass)
{
	//Returns the class/dep id number "PHYSICS 135-1"
	return inClass.subject + " " + inClass.catalog_num;
}

function getFlags(flag)
{
	//returns an array of all the flags which are encoded in the flag value.
	var flags = new Array(9);
	var i = 0;
	while (flag != 0)
	{
		if ((flag & 1) > 0)
		{ flags[i] = true;}
		else
		{ flags[i] = false;}
		flag = flag >> 1;
		i++;
	}
	return flags;
}

function getDept(inClass)
{
	return inClass.subject;
}

function getMatchingClasses(toFind,termData) //Arguments: Special array of classes to find, list of classes for a particular term and department(from the scraped API)
{
	//Searches the API class list for all the classes matching the departments and numbers given in toFind.
	//Returns a data structure containing all the important information from the classes.
	var curClass = 0; //indexer to the JSON classes data structure
	var returnData = []; // --->>> Fields: "Header" "Time" "Instructor" "Room" "Available" "Overview" "Flags" "Class_num" <<<---
	var continueSearch = false; // when toggled allows us to continue the search for the next class.
	console.log(toFind); //DEBUG
	console.log(termData); //DEBUG
	//Search the classes in this department
	//Check whether the class number is in toFind (Requires that both toFind and Classes be sorted, which they are as of now.
	for (var i = 0; i < toFind.classlist.length; i++)
	{
		continueSearch = false;
		curClass = 0; //Move back to the top of the department 
		var classnumber = toFind.classlist[i];
		//console.log(getFlags(toFind.flags[i]));
		
		//Look ahead to find the class
		while (termData[curClass].catalog_num != classnumber)
		{ 
			curClass += 1;
			
			//If we have reached the end of the department, stop searching for this class.
			if (curClass >= termData.length) 
			{ continueSearch = true; break; }
		}
		
		if (continueSearch)
		{ continue;  } //Move to next class
		
		var nameData = getName(termData[curClass]);
		var sysidData = getSysId(termData[curClass]);
		
		var overviewData = getOverview(termData[curClass]);
		var flagsData = getFlags(toFind.flags[i]);
		var availabilityData = getAvailability(termData[curClass]);
		var DISdata = 	getDiscussions(termData[curClass]);
		var classNumData = termData[curClass].class_num;
		var classIdData = termData[curClass].id;
		
		//Get the time, discussion section, and room data
		var timeData = []; //A dictionary of section numbers and the times they meet.
		var roomData = [];
		var instructorData = [];
		var sectionData = [];
		while (termData[curClass].catalog_num == classnumber)
		{ 
			var section = termData[curClass].section;
			sectionData.push(section);
			timeData[section] = getTime(termData[curClass]); 
			roomData[section] = getRoom(termData[curClass]);
			instructorData[section] = getInstructor(termData[curClass]);
			curClass += 1;
		}
		
		//Add the class description to the return data
		returnData.push({"id": classIdData, "Name": nameData, "SysId":sysidData, "Time": timeData, "Instructor": instructorData, "Room": roomData, "Sections":sectionData, "Overview": overviewData, "Flags": flagsData, "Available": availabilityData, "Class_num": classNumData, "Discussions":DISdata});
	}
	return returnData;
}
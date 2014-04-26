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

function getOverview(inClass)
{
	if (inClass.overview == null)
	{
		return "No Class Description Available. See Department Website";
	}
	else
	{
		return inClass.overview;
	}
}

function getHeader(inClass)
{
	//Returns a header title for the course, e.g. "PHYSICS 135-1 General Physics"
	return inClass.subject + " " + inClass.catalog_num + " " + inClass.title;
}

function getDept(inClass)
{
	return inClass.subject;
}

function getMatchingClasses(toFind,termData) //Arguments: Special array of classes to find, list of classes for a particular term (from the scraped API)
{
	//Searches the API class list for all the classes matching the departments and numbers given in toFind.
	//Returns a data structure containing all the important information from the classes.
	var curClass = 0; //indexer to the JSON classes data structure
	var returnData = []; //Fields: "Header" "Time" "Instructor" "Overview" "Flags"
	console.log(toFind);
	//Iterate by department
	for (dept in toFind)
	{
		var continueSearch = false;
		//Find the top class for the first department in toFind.
		while (getDept(termData[curClass]) != dept)
		{ 
			curClass += 1; 
			if (curClass >= termData.length)
			{ continueSearch = true; break; }
		}
		
		if (continueSearch) //If the department does not exist in this term.
		{ continue; }
		
		var deptTop = curClass;
		
		//Check whether the class number is in toFind (Requires that both toFind and Classes be sorted, which they are as of now.
		for (var i = 0; i < toFind[dept].classlist.length; i++)
		{
			curClass = deptTop; //Move back to the top of the department 
			var classnumber = toFind[dept].classlist[i];
			console.log(classnumber);
			//Look ahead to find the class
			while (termData[curClass].catalog_num != classnumber)
			{ 
				curClass += 1;
				
				//If we have reached the end of the department, stop searching for this class.
				if (curClass >= termData.length) 
				{ continueSearch = true; break; }
				else if (getDept(termData[curClass]) != dept)
				{ continueSearch = true; break; }
			}
			
			if (continueSearch)
			{ continue; }//Move to next class
			
			var headerData = getHeader(termData[curClass]);
			var instructorData = getInstructor(termData[curClass]);
			var overviewData = getOverview(termData[curClass]);
			var flagsData = toFind[dept].flags[i];
			
			//Get the time and other descriptive info.
			var timeData = []; //A dictionary of section numbers and the times they meet.
			while (termData[curClass].catalog_num == classnumber)
			{ 
				timeData[termData[curClass].section] = [getTime(termData[curClass])]; 
				curClass += 1;
			}
			
			//Add the class description to the return data
			returnData.push({ "Header": headerData, "Time": timeData, "Instructor": instructorData, "Overview": overviewData, "Flags": flagsData })
		}
	}
	return returnData;
}
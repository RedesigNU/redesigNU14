//Functions for loading and searching our distro Distros file.

const cAPI = "http://vazzak2.ci.northwestern.edu/"

//Search objects
var Classes = []; //Stores all the classes for a given term.
var Terms; //Available Terms data

var Distros; //Object to store our Distros data
var DistroFields;
var flagsIndexStart = 3;
var flagsIndexEnd = 5; //Magic Numbers

//init function
function LoadApp()
{
	//Load the files we need right now.
	$.when
	(
		LoadTerms(),
		LoadDistros()
	)
	.then(function ()
	{
		SearchClasses("4540","","","");
	});
}
//Load the Distros CSV file from the server
function LoadDistros()
{
	var Distrosstr;
	return $.get("data/mccormick.csv", function(data) {
		Distrosstr = String(data);
		ParseDistros(Distrosstr);
	})

	function ParseDistros(str)
	{
		var parseobj = $.parse(str).results;
		Distros = parseobj.rows;
		DistroFields = parseobj.fields;
		
		//Replace strings with bools
		for (var i = 0; i < Distros.length-1; i++)
		{
			var bitcode  = 0;
			for (var j = flagsIndexStart; j <= flagsIndexEnd; j++)
			{
				var flag = DistroFields[j];
				
				if (Distros[i][flag] == "")
				{
					Distros[i][flag] = false;
				}
				else
				{
					Distros[i][flag] = true;
					bitcode += 1 << (j-flagsIndexStart);
				}
			}
			Distros[i]["flags"] = bitcode;
		}
		
		console.log({ "fields": DistroFields, "content": Distros });
	}
}

//Load Available Terms
function LoadTerms()
{
	return $.getJSON(cAPI + "terms", function(data) {
		Terms = data;
	})
}

//Load the Classes .json
function LoadClasses(term,section)
{
	if (!(term in Classes))
	{
		return $.getJSON("data/scraper/"+term+"_data", function(data) {
			Classes[term]= data
		}).done(function() { console.log("Success")}).fail(function(data) { console.log(data)});
	}
}

//Searches the Caesar API for classes matching the search terms given
//Use an empty string in a field to match all values (term must be specified).
function SearchClasses(term, clsnumber, clsname, flags)
{
	if (term == "")
	{ alert("Term not specified, please select a term."); }
	else
	{
		$.when(LoadClasses(term))//Load the classes for the given search term. Classes[term] now contains your data.
		.then(function () {
			console.log("Beginning search on term" + term);
			//Search
		});
	}	
}

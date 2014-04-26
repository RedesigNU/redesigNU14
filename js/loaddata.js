//Functions for loading and searching our Themes file.

const cAPI = "http://vazzak2.ci.northwestern.edu/"

//Search objects
var Classes = []; //Stores all the classes for a given term.
var Terms; //Available Terms data

var Themes; //Object to store our Distros data
var ThemeFields;
var flagsIndexStart = 3;
var flagsIndexEnd = 5; //Magic Numbers

//init function
function LoadApp()
{
	//Load the files we need right now.
	$.when
	(
		LoadTerms(),
		LoadThemes()
	)
	.then(function ()
	{
		// Do some other stuff that needs to happen only after loading Themes and Terms
	});
}
//Load the Themes CSV file from the server
function LoadThemes()
{
	var Themesstr;
	return $.get("data/mccormick.csv", function(data) {
		Themesstr = String(data);
		ParseThemes(Themesstr);
		console.log("themes");
	})

	function ParseThemes(str)
	{
		var parseobj = $.parse(str).results;
		Themes = parseobj.rows;
		ThemeFields = parseobj.fields;
		
		//Replace strings with bools
		for (var i = 0; i < Themes.length-1; i++)
		{
			var bitcode  = 0;
			for (var j = flagsIndexStart; j <= flagsIndexEnd; j++)
			{
				var flag = ThemeFields[j];
				
				if (Themes[i][flag] == "")
				{
					Themes[i][flag] = false;
				}
				else
				{
					Themes[i][flag] = true;
					bitcode += 1 << (j-flagsIndexStart);
				}
			}
			Themes[i]["flags"] = bitcode;
		}
	}
}

//Load Available Terms
function LoadTerms()
{
	return $.getJSON(cAPI + "terms", function(data) {
		Terms = data;
	})
}

//Load the Classes .json for the specified department
function LoadClasses(term,dept)
{
	return $.getJSON(cAPI + "courses/?term="+term+"&subject="+dept, function(data) {
		Classes[term] = [];
		Classes[term][dept] = data;
	}).done(function() { console.log("Success")}).fail(function(data) { console.log(data)});
}

//Searches the Caesar API for classes matching the search terms given
//Use an empty string in a field to match all values (term must be specified).
function SearchClasses(term, dept, clsnumber, clsname, flags)
{
	if (term == "")
	{ alert("Term not specified, please select a term."); }
	else
	{
		$.when(LoadClasses(term,dept))//Load the classes for the given search term. Classes[term] now contains your data.
		.then(function () {
			console.log("Beginning search on term" + term);
			var testsearch = { "classlist": ["201-0", "210-0", "310-0"], "flags":[2, 2, 0] };
			console.log(getMatchingClasses(testsearch,Classes[term][dept]));
		});
	}	
}

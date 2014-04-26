function Search(Term_num,course_num,dept_id,theme_areas){
var themes_matching = [];
var Final_classes = [];
themes_matching = Theme_Search(theme_areas);
Final_classes = json_search(Term_num, course_num, dept_id)
}

function Theme_Search(themes){

console.log(mccormick);
var theme_list = [];
var count=0;

for (var i=0; i<Themes.length,i++){
	if (data.distro == "FAL")
		theme_id=0;
	else if (data.distro == "HSV")
		theme_id=1;
	else if (data.distro == "SBS")
		theme_id=2;	
	if (Themes[i].flags & (1<<theme_id){
		theme_list[count++]=Themes[i];
		flag_list[count++]=theme_id;
	}
}
return theme_list;
return flag_list; 
}


function Dept_Search(dept_id,theme_list,flag_list){
var dept_list = [];
var dept_struct = [];
var count=0;
for (var i=0; i<dept_id.length,i++){
	for (var j=0; j<theme_list.length,j++){
		if (theme_list[j].DEPT==dept_id[i]){
			dept_list[count++]=theme_list[j].COURSE;
			var Dept = dept_id[i];
			Dept.classlist = dept_list;
			Dept.flag = flag_list[j];
			dept_struct.push(Dept);
		}
	}
	return dept_struct;
}


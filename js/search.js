function main(){
	var theme_list = new Array;
	var Final = new Array;
	theme_list = Theme_Search(theme);
	Final = json_search(Term_num, course_num, dept_id)
}



function Theme_Search(data.school,data.distro){
	var mccormick = $.csv.toObjects("/mccormick.csv"):
	console.log(mccormick);
	var theme_list = new Array();
	var count=0;
	if (data.distro == "FAL")
		theme_id=0;
	else if (data.distro == "HSV")
		theme_id=1;
	else if (data.distro == "SBS")
		theme_id=2;	
	
	for (var i=0; i<mccormick.length,i++){
		if (mccormick[i].flags & (1<<theme_id){
			theme_list[count++]=mccormick[i];
		}
	}
	return theme_list;
}

function Dept_Search(dept_id){
	var dept_list = new Array();
	var count=0;
	for (var i=0; i<theme_list.length,i++){
		if (theme_list[i].DEPT)==dept_id
			dept_list[count++]=theme_list[i];
	}
	return dept_list; 
}

function json_search(Term_num, course_num, dept_id){

	var count_1 = 0;
	for (var i=0; i<dept_id.length; i++){
		var count_2= 0;
		var temp = new Array();
		for(var j =0; j < classes[Term_num].length; j++)
			if(dept_id[i] == classes[Term_num].subject){
				temp[count_2++] = classes[Term_num][j];
			}
		}
		var dept_list = new Array();
		var Final = new Array();
		dept_list = Dept_Search(dept_id[i]);
		for(var k = 0; k < dept_list.length; k++)
		{
			var a = binary_search(dept_list[k], temp);
			if (a != null)
			{
				Final[count_1++] = temp[a];
			}
		}
	}
}

function binary_search(find, array){
	var low=0, high =array.length -1, i, comparison;

		while (low<=high){
			i=Math.floor((low+high)/2);
			comparison= array[i] - find;
			if (comparison <0){low=i+1; continue;};
			if (comparison >0){high=i-1; continue;};
			return i;
		}
		return null; 
}
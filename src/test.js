console.log('hello world');

var array = [0, 1, null, 2, "", 3, undefined, 3,,,,,, 4,, 4,, 5,, 6,,,,];

var filtered = array.filter(function (el) {
  return el != null;
});

console.log(filtered);

var arrayDoc = [{"name": 0}, {"name": 1}, null, {"name": 2}, {"name": ""}, {"name": 3}, undefined, {"name": 3},{},{},,,, {"name": 4},{}, {"name": 4},,];

var filteredDoc = arrayDoc.filter(function (el) {

            return el!=null && !isEmpty(el);//typeof el !== "object";//el.length>0;//!isNaN(el);
      
});

function isEmpty(obj) { 
    for (var x in obj) { return false; }
    return true;
 }

console.log(filteredDoc);

var arr = [1,2,null, undefined,3,,3,,,0,,,[],,{},,5,,6,,,,],
    len = arr.length, i;

for(i = 0; i < len; i++ )
    arr[i] && arr.push(arr[i]);  // copy non-empty values to the end of the array

arr.splice(0 , len);

console.log(arr);
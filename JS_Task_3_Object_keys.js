myOBJ = {
   	name: "Vazgen",
    age: 44,
    familia: {
      number: 2,
      Mother:{
        name: "Lusine",
        age: 65
      },
   Father:{
        name: "Paruyr",
        age: 72,
        work: {
          employed: 1,
          adress: 14
        }
      }
    }
  }
  let reversedOBJ = {}
  
  function reverse(obj){ 
    let modified = {}
    for (let [key, value] of Object.entries(obj)) {
      if(obj.hasOwnProperty(`${key}`)){
        if(typeof(value)==="object"){
          let nestedOBJ = reverse(value)
           modified = {... modified, [key]: nestedOBJ} 
        }
        else{
          modified[value]=key
        }
      }
    }
    reversedOBJ = modified
    return modified
  }
  console.log("reversedOBJ -- ", JSON.stringify(reverse(myOBJ), null, 2))
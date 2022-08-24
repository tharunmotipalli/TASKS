let prompt=require('prompt-sync')(); // install prompt-asyn package using npm

const count=prompt('Enter the no of patients:');//prompt the no of patients
var i=0;
console.log('enter the names of patients');
for (let i=0;i<count;i++){ //for loop for getting data for n count of patients
let promise1= new Promise(function(myResolve, myReject) {  //create a promise 
  let rand=(Math.floor(Math.random() * 10))
  const name = prompt('Patient  name:');// get the name of the patient using prompt 
  setTimeout(function() {
  
    myResolve('Time taken By "'+name+'":'+ rand+'s'); //print the time taken by the patient
  }, rand*1000);
});

async function myfunction(){
  let value=await promise1;
  console.log(value);

}
myfunction();
}

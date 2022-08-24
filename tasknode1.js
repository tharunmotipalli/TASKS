let prompt=require('prompt-sync')(); // install prompt-asyn package using npm

const count=prompt('Enter the no of patients:');//prompt the no of patients
var i=0;
for (let i=0;i<count;i++){ //for loop for getting data for n count of patients
let promise1= new Promise(function(myResolve, myReject) {  //create a promise 
  var rand=(Math.floor(Math.random() * 10) + 1 )*1000
  setTimeout(function() {
    const name = prompt('Patient  name:');// get the name of the patient using prompt 
    myResolve('Time taken By the Patient:'+ rand/1000+'s'); //print the time taken by the patient
  }, rand);
});

async function myfunction(){
  let value=await promise1;
  console.log(value);

}
myfunction();
}

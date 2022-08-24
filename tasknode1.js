let prompt=require('prompt-sync')();

const count=prompt('Enter the no of patients:');
var i=0;


for (let i=0;i<count;i++){
let i= new Promise(function(myResolve, myReject) {
  var rand=(Math.floor(Math.random() * 10) + 1 )*1000
  setTimeout(function() {
    const name = prompt('Patient  name:');
  
    console.log('Time taken By the Patient:'+ rand/1000+'s'); 
    myResolve("next patient go inside"); 
  }, rand);
});

async function myfunction(){
  let z=await i;
  console.log(z);

}
myfunction();
}

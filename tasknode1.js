
const names=['tharun','purushottam','roshini','rakesh','sushmitha']
var i=0;
var count=0;
num=names.length;
for (let i=0;i<num;i++){
let i= new Promise(function(myResolve, myReject) {
  let rand=(Math.floor(Math.random() * 10) + 1 )*1000
  setTimeout(function() {
   name=names[count]
   count=count+1
  
    console.log('name:'+name+' , Time Taken:'+rand) 
    myResolve("next patient go inside"); 
  }, rand);
});

async function myfunction(){
  let z=await i;
  console.log(z);

}
myfunction();
}

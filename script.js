const inputSlider=document.querySelector("[data-lengthSlider]");
const inputdiplay=document.querySelector("[data-passDisplay]");
const lenNumber=document.querySelector("[data-lenNumber]");
const copybtn=document.querySelector("[data-copy]");
const copymsg=document.querySelector("[data-cpyMsge]");
const upperletter=document.querySelector("#UpperCase");
const lowerletter=document.querySelector("#LowerCase");
const number=document.querySelector("#Numbers");
const symbolCheck=document.querySelector("#Symbol");
const indi=document.querySelector("[data-indicator]");
const generate=document.querySelector(".Generate");
const inputall=document.querySelectorAll("input[type=checkbox]");
const symbols='~!@#$%^&*()_-+=[]{}|:;<>?/.'

let password="";
var passwordLength=10;
let checkcount=0;
handSlider();
//deault set indi color to grey
setIndicator("#ccc");

function handSlider(){
    inputSlider.value=passwordLength;
    lenNumber.innerText=passwordLength;
    const min=inputSlider.min;
    const max= inputSlider.max;
    inputSlider.style.backgroundSize =( (passwordLength - min)*100/(max-min) ) + "% 100%";
}
console.log("slider done");

function setIndicator(color){
    indi.style.backgroundColor=color;
    indi.style.boxShadow= `0px 0px 12px 1px  ${color}`;
    //shadow 

}
console.log("Set done");
function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min)) +min;
    
}
function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97, 123));

}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65, 91));

}

function generateSymbols(){
    const randIndex= getRandomInteger(0,symbols.length);
    return symbols.charAt(randIndex);
}

function calculateStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    // if(upperletter.checked) hasUpper=true;
    // if(lowerletter.checked) hasUpper=true;
    // if(symbolCheck.checked) hasUpper=true;
    // if(number.checked) hasUpper=true;
    if(upperletter.checked) hasUpper=true;
    if(lowerletter.checked) hasLower=true;
    if(symbolCheck.checked) hasSym=true;
    if(number.checked) hasNum=true;


     /// Now apply your custom rules for your password
     if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
      setIndicator("#0f0")
     } else if(
        (hasLower || hasUpper)&&
        (hasNum || hasSym)&&
        passwordLength>=6
     ) 
     {
        setIndicator("#ff0")
     } else {
        setIndicator("#f00")
     }
}
console.log("Strength done");
//copycontent
async function copyContent(){
    try{
        await navigator.clipboard.writeText(inputdiplay.value);
       copymsg.innerText="copied";
    }
    catch(e){
       copymsg.innerText="Failed"
    }
   //to make copy walaspan visible
   copymsg.classList.add("active")

   setTimeout(()=>{
    copymsg.classList.remove("active")
   },1000)
}

//add event listner on   slider

inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handSlider();
    
})

//shuffle password by using algo
//fisher yastes method ALGO
function shufflePassword(array){
    for(let i =array.length-1; i>=0; i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=> (str+=el));
    return str;
}





function handleCheckboxChange(){
    checkcount=0;
    inputall.forEach((checkbox) => {
        if(checkbox.checked)
           checkcount++;
    });

    //special corner condition
    if(passwordLength<checkcount){
        passwordLength=checkcount;
        handSlider();
    }
}
console.log("handle check box done");
inputall.forEach((checkbox)=> {
    checkbox.addEventListener('change', handleCheckboxChange);
})







copybtn.addEventListener('click',() => {
    if (inputdiplay.value) {
        copyContent();
    }
})
console.log("copy cone");


generate.addEventListener('click',() =>{
 //none checkbbox are selected in that case
 console.log("start");
 if(checkcount<=0) return;
 
    //special corner condition
    if(passwordLength<checkcount){
        passwordLength=checkcount;
        handSlider();
    }

    //lets start the journey to find new  password

    console.log("start -AGAIN")
    //remove old password
    password="";

   
    let funcArr =[];
    if(upperletter.checked)
      funcArr.push( generateUpperCase);
        
    if(lowerletter.checked)
     funcArr.push( generateLowerCase);
       
    if(number.checked)
     funcArr.push( generateRandomNumber);
   
    if(symbolCheck.checked)
     funcArr.push(generateSymbols);
//compulsory addtion that checked

for(let i=0; i<funcArr.length;i++){
    password+=funcArr[i]();
}
console.log("compuslsory");
//remaining
for(let i=0; i<passwordLength-funcArr.length;i++){
    let randomIndex=getRandomInteger(0,funcArr.length);
    password+=funcArr[randomIndex]();
}
console.log("remaimng");
password=shufflePassword(Array.from(password));
console.log("Shuffling");
//show in Ui
  inputdiplay.value=password;
  console.log("UI done");

  //calcuate strength
 calculateStrength();
  
});
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,);
  });

// about click event 

document.getElementById("about").addEventListener('click', function(){

    Swal.fire({
        // title: 'Custom animation with Animate.css',
        html:`<p id="about_text">   This is just a small project whose objective is to help me memorize and familiarize “Hangul” or “Hangeul” Characters in a fun way (<strong>at least for me as a learner</strong>) by generating it in a random order, and by doing it in a <span id="important_message">re·pet·i·tive</span> action.</p>`,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })

});  // end of about click event





// function to generate API 
async function hangul(){

  try {
    let array_for_splice = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39];  // array where random picker will be subtracted


  let random_picker = Math.floor((Math.random() * 40));// generate no. random 


    for( var i = 0; i < array_for_splice.length; i++){ 
    
      if ( array_for_splice[i] === random_picker) { 
  
        array_for_splice.splice(i, +1); 
      }}

  

  let random_picker_for_other_answer = Math.floor(Math.random() * array_for_splice.length);// this is the random no. for the incorrect answer

  

  // console.log(random_picker);
  // console.log(array_for_splice);
  // console.log(random_picker_for_other_answer);

// API call
  var get_api = await fetch(`JS/Korpabet_API.json`);
  var hangul_json = await get_api.json();


  // this is the value for the main div
  var hangul_character = await hangul_json[random_picker].Hangul;
  var type = await hangul_json[random_picker].type;
  var hint = await hangul_json[random_picker].hint;
  var Pronunciation1 = await hangul_json[random_picker].Pronunciation1;

  

  var another_answer = hangul_json[random_picker_for_other_answer].Pronunciation1; // this is the value for the incorrect answer
  

  var answer_array = ([Pronunciation1 , another_answer]).sort((b, a) => 0.5 - Math.random()); // array for combined value of Pronunciation1 , another_answer with sort
  

 

  document.getElementById('container').innerHTML +=`
  
  <div id="main_div">
  <h1 id="hangul_character">${hangul_character}</h1>

<br> <br> 
<div id="answer_Field">
    <div id="answer1_btn">
         <p>
            <label>
            <input name="group" type="radio" value="${answer_array[0]}"/>
            <span id="answer1">${answer_array[0]}</span>
          </label>
        </p>
          
    </div>  
    <div id="answer2_btn">
      <p>
         <label>
         <input name="group" type="radio"  value="${answer_array[1]}"/>
         <span id="answer2">${answer_array[1]}</span>
       </label>
     </p>
 </div>        

</div> <!--Answer field DIV end-->
</div>  <!-- THis is end of main div -->
  `; //End of innerHTM 


  // this is the section where we will get the value and will make teh comparison for HINT and Answer
  document.getElementById('type').innerHTML = type;
  document.getElementById('hint').innerHTML = hint;
  document.getElementById('answer').innerHTML = Pronunciation1;

  document.getElementById("submit_btn").style.display = "block";  // remove button


  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error Occurred !',
      text: `${error}`,      
    }).then(() => {
      document.getElementById("submit_btn").style.display = "none";  // remove button
      document.getElementById("help").style.display = "none";  // remove hint button
      document.getElementById("error_display").style.display = "block";  // show bug Image
    })  // end of error SWAL 
  }

  

    
} // End hangul to generate API 




// Function for Help
document.getElementById('help').addEventListener('click', function(){

  var get_type = document.getElementById('type').textContent; // get the type of character via embeded value
  var get_hint = document.getElementById('hint').textContent; // get the hint of character via embeded value
  var get_answer = document.getElementById('answer').textContent; // get the answer of character via embeded value

  // console.log(get_type);

  if (get_type === "Vowel") {
   
    var vowel_sound = new Audio(`/Audio/${get_answer}.mp3`);  // fetch sound fro Audio folder
    vowel_sound.play();  // play sound


  } else {    
    Swal.fire(`Hint: ${get_hint}`); // Show hint
  } 

 }) //End of Function for Help




//  submit button function 
document.getElementById('submit_btn').addEventListener('click', function(){

  var answer = document.querySelector('input[name="group"]:checked').value // get answer value from radio button
  var answer_comparison = document.getElementById('answer').textContent;  // get value from embeded data for comparison



  if (answer == answer_comparison) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'You are correct !',
      showConfirmButton: false,
      timer: 2000     
    }).then(() => {
      location.reload()
    })  // end of Success SWAL event
    
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      html: `<p id="swal_error"> The correct answer is <span id="important_message">${answer_comparison}</span></p>`,
      showConfirmButton: false,
      timer: 1600     
    }).then(() => {
      location.reload()
    })  // end of Success SWAL event
  }
})  //END of submit button function 


 let carousal = document.getElementById("car");
 let cards = carousal.children;



 let index = 0;
 const delay = 5000;
 function slideDown(i){
   cards[i].classList.add("show-card");
 }
 function hideSlide(i){
   cards[i].classList.remove("show-card");
 }
 function animate(){
   hideSlide(index);
   //go to next card
   ++index;
   console.log(cards.length);
   //if we reached past the final card, revert to the first
   if(index >= cards.length)
     index = 0; 

   slideDown(index); 
 }

 
 setInterval(animate, delay);
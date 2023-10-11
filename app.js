/* 
    Tutorial link:
    https://www.creativecodingclub.com/pages/free-scrolltrigger-line-indicator
*/

// gsap.fromTo(
//   ".line",
//   { y: -100 },
//   { y: 200, repeat: 20, yoyo: true, duration: 3, ease: "none" }
// );
/* 

- THE FISRT ATTEMPT - OLD
ScrollTrigger.create({
  trigger: ".spacer",
  start: "top 300", // start the animation when THE TOP EDGE OF THE SPACER ELEMENT REACHES THE 300Ppx DWON FROM THE TOP OF THE BROWSER WINDOW.
  end: "bottom 300", // stop the animation when THE BOTTOM EDGE OF THE SPACER ELEMENT REACHES THE 300px DWON FROM THE TOP OF THE BROWSER WINDOW.
  markers: true,
  animation: gsap.fromTo(".line", { y: -100 }, { y: 200, ease: "none" }),
  scrub: true,
});
 */


/* THE SECOND ATTEMPT - OLD :the problem was when we added ease by stten scrub: 1 (means it waits 1s before stopping)
but this little edit makes the line to be breaks into all spacers because we've made an multiple ScrollTrigger that work for each spacer independently.
// 1) Getting all spacer element and put them in an array:

const spacers = gsap.utils.toArray(".spacer");
spacers.forEach((spacer, index) => {
    let line = spacer.querySelector(".line"); // select each line in each spacer .
    ScrollTrigger.create({
        trigger: spacer, // the current spacer in the loop is the trigger .
        start: "top 300",
        end: "bottom 120",
        markers: true,
        animation: gsap.fromTo(line,
            {y: -200},
            {y: 300, ease: "none"}),
            scrub:true
    });
});

// the proplem in this attemp is that the line is fully disappeared 
// from the first holder before appearing in the second
// which is not the behaviour we want. to achive the wanted behaviour
// we're going to change the END value from 300 to a smaller number
 */

// the solution is 
// 1) Creating one ST that scrubs ONE staggered animation
// 2) Using the time-line parent container as a ST trigger
const moveTheLine = gsap.fromTo(".line", {y:-200}, {y:200, ease: "none", duration:1, stagger:0.7});

ScrollTrigger.create({
    trigger: ".timeline-container",
    start: "top 300",
    end: "bottom 300",
    markers: true,
    animation: moveTheLine,
    scrub:1
});

/*
    with this implementation we solved the previouse problem but now we rolled back to that problem
    when the first holder's line must be fully disappeared before the next holder's line starts to move.
    to overcome this we're going to change the value of the stagger form 1 (which means one element starts after one element is finished)
    to stagger: 0.7 (means when the first element reches 0.7s from its duration start the next one)
*/


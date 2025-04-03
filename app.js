document.addEventListener('DOMContentLoaded', function() {
    // Handle "Start Counseling" Button
    const counselingButton = document.querySelector('#counseling button');
    counselingButton.addEventListener('click', function() {
      alert("Starting an anonymous counseling session...");
      // You can later integrate with a live chat system or an API
    });
  
    // Handle "Start Exercise" Button
    const exerciseButton = document.querySelector('#stress-relief button');
    exerciseButton.addEventListener('click', function() {
      alert("Starting a stress-relief exercise...");
      // Link to actual exercise routines
    });
  
    // Handle "Track Mood" Button
    const trackingButton = document.querySelector('#tracking button');
    trackingButton.addEventListener('click', function() {
      alert("Tracking your mood...");
      // Implement mood tracking form or API
    });
  
    // Handle "Explore Resources" Button
    const resourcesButton = document.querySelector('#resources button');
    resourcesButton.addEventListener('click', function() {
      alert("Opening mental health resources...");
      // Link to a resources page or a list of useful links
    });
  });
  
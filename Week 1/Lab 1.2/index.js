function show(id) {
    var img = document.getElementById("image");
    var cap = document.getElementById("cap");

      if (id.value=='btn2019') {
        img.src = "/images/y2019.png";
        cap.innerHTML = "Fig 1. Household ownership in 2019."
      } else if(id.value=='btn2021'){
        img.src = "/images/y2021.png";
        cap.innerHTML = "Fig 2. Household ownership in 2021.";
      } else if (id.value=='btnboth'){
          img.src = "/images/both.png";
        cap.innerHTML = "Fig 3. Comparison of Household ownership in 2019 vs 2021.";
      }
}
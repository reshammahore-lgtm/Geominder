let reminders = JSON.parse(localStorage.getItem("geominder_reminders") || "[]");

function save(){localStorage.setItem("geominder_reminders", JSON.stringify(reminders)); render();}

function addReminder(){
  const task=document.getElementById("task").value.trim();
  const place=document.getElementById("place").value.trim();
  if(!task || !place){alert("Enter both a reminder and location.");return;}
  reminders.push({id:Date.now(),task,place,created:new Date().toLocaleString()});
  document.getElementById("task").value="";
  document.getElementById("place").value="";
  save();
}

function removeReminder(id){
  reminders=reminders.filter(r=>r.id!==id);
  save();
}

function render(){
  const box=document.getElementById("reminders");
  if(!reminders.length){box.innerHTML="<p><small>No reminders yet.</small></p>";return;}
  box.innerHTML=reminders.map(r=>`
    <div class="reminder">
      <div><strong>${escapeHtml(r.task)}</strong><br><small>📍 ${escapeHtml(r.place)} · ${r.created}</small></div>
      <button class="delete" onclick="removeReminder(${r.id})">Delete</button>
    </div>`).join("");
}

function getLocation(){
  const output=document.getElementById("location");
  if(!navigator.geolocation){output.textContent="Geolocation is not supported.";return;}
  output.textContent="Requesting location permission...";
  navigator.geolocation.getCurrentPosition(
    p=>output.textContent=`Current coordinates: ${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`,
    ()=>output.textContent="Location permission was denied or unavailable."
  );
}

function escapeHtml(value){
  return value.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
render();

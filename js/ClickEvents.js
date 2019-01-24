function handler(ev) {
  ev = window.event || ev;
  if(this === ev.target) PLAYER.room.showValidActions(ev.target.id);
}
document.getElementById("changeRoom").addEventListener("click", handler);
document.getElementById("attackThreat").addEventListener("click", handler);

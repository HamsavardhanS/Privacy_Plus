// Simulates Ghost Mode by removing scripts and disabling cookies
document.querySelectorAll("script").forEach(el => el.remove());
document.cookie.split(";").forEach(cookie => {
  document.cookie = cookie + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});
localStorage.clear();
sessionStorage.clear();
alert("Ghost Mode Activated: JS disabled, cookies cleared.");

navigator.permissions.query({ name: "camera" }).then(res => {
  if (res.state === "granted") {
    alert("⚠️ This site is using your CAMERA");
  }
});
navigator.permissions.query({ name: "microphone" }).then(res => {
  if (res.state === "granted") {
    alert("⚠️ This site is using your MICROPHONE");
  }
});
navigator.permissions.query({ name: "geolocation" }).then(res => {
  if (res.state === "granted") {
    alert("⚠️ This site is using your LOCATION");
  }
});

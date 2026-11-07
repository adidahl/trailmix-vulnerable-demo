export async function fetchForecast(provider, lat, lon) {
  const res = await fetch(`${provider}/forecast?lat=${lat}&lon=${lon}`);
  return res.json();
}

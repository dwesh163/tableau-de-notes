async function fetchAPI() {
    return await fetch(
    `https://raw.githubusercontent.com/dwesh163/tableau-de-notes-Off/main/data.json`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "POST, GET, OPTIONS, DELETE"

      },
    }
  );
}

const init = async () => {
  let res = await fetchAPI()
  console.log(res)
}
init()


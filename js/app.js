let add_ = true;

function run_a_cookie() {
  if (add_ === true) {
    Cookie.set({
      key: "netlifyCookieAfsin",
      value: "netlifyAfsin",
      expires: { seconds: 5 },
      secure: true,
    });
  } else if (add_ === false) {
    Cookie.delete({
      key: "netlifyCookieAfsin",
      value: "",
    });
  } else if (add_ === null) {
    let cookie_data = Cookie.get("netlifyCookieAfsin");

    console.log(cookie_data);
  }
}

run_a_cookie();

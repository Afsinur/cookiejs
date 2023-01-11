window.Cookie === undefined &&
  (window.Cookie = (function () {
    function _Cookie() {}
    _Cookie.prototype = {
      get_utc_string: function (expires) {
        let date = new Date();
        let add_days = expires.days * 24 * 60 * 60 * 1000 || 0;
        let add_hours = expires.hours * 60 * 60 * 1000 || 0;
        let add_minutes = expires.minutes * 60 * 1000 || 0;
        let add_seconds = expires.seconds * 1000 || 0;

        let GMT_ = -(date.getTimezoneOffset() * 60 * 1000);

        date.setTime(
          date.getTime() +
            add_days +
            add_hours +
            add_minutes +
            add_seconds +
            GMT_
        );
        utcString = date.toUTCString();

        return utcString;
      },
      set: function ({
        key,
        value,
        expires,
        path = "/",
        httpOnly,
        secure,
        sameSite,
        sameParty,
        domain,
      }) {
        let utcString = this.get_utc_string(expires);

        let new_Cookie = `${key}=${value}; expires=${utcString}; path=${path}; ${
          httpOnly === true ? `httpOnly=${httpOnly};` : ``
        }${secure === true ? `secure=${secure};` : ``}${
          sameSite === true ? `sameSite=${sameSite};` : ``
        }${sameParty === true ? `sameParty=${sameParty};` : ``}${
          domain === true ? `domain=${domain};` : ``
        }`;

        document.cookie = new_Cookie;
      },
      get: function (str) {
        let cookie_ = document.cookie;

        let decodedCookie_ = decodeURIComponent(cookie_);

        let splitBySemiColon_ = decodedCookie_.split(";");

        let reduceAndMKaNewObj = splitBySemiColon_.reduce((a, item) => {
          let splitByEqual = item.split("=");
          a[splitByEqual[0].trim()] = splitByEqual[1].trim();

          return a;
        }, {});

        return reduceAndMKaNewObj[str];
      },
      delete: function ({ key, value, path = "/" }) {
        let utcString = this.get_utc_string((expires = { days: -1 }));

        let new_Cookie = `${key}=${value}; expires=${utcString}; path=${path};`;
        document.cookie = new_Cookie;
      },
    };

    let Cookie = new _Cookie();

    return Cookie;
  })());

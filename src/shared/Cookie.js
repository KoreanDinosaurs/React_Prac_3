const setCookie = (name, value, exp = 5) => {
    let date = new Date();
    date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * exp);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()};`
}

const getCookie = (name) => {
    let cookie = "; " + document.cookie;
    let parts = cookie.split(`; ${name}=`)

    if(parts.length === 2){
        return parts.pop().split(';').shift()
    }
}

const deleteCookie = (name) => {
    let date = new Date("2020-01-01")
    document.cookie = `${name}=; expires=${date.toUTCString()};`
}

export { getCookie, setCookie, deleteCookie }
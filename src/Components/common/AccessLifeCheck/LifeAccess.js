const CheckAccess = () => {
    let parceAccess = localStorage.getItem("access").split(/(\.)/);
    let secondPart = atob(parceAccess[2]);
    let timeLifeToken = JSON.parse(secondPart).exp;
    let now = new Date();
    if ((timeLifeToken - now.getTime()/1000) < 180){
        return true
    }else {
        return false
    }
}
export default CheckAccess
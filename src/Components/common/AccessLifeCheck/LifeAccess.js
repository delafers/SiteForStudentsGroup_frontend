const CheckAccess = () => {
    if(localStorage.access != undefined){
        let parceAccess = localStorage.getItem("access").split(/(\.)/);
        let secondPart = atob(parceAccess[2]);
        let timeLifeToken = JSON.parse(secondPart).exp;
        let now = new Date();
        debugger
        if (((timeLifeToken - now.getTime()/1000) - 10) > 0){
        return true
        }else {return false}
    }
    else{
        localStorage.removeItem("access")
    }
}
export default CheckAccess
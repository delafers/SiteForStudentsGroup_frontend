const baseURL = 'https://dev.studorg.online/'

export const authAPI = {
    me(result) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${result}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        return fetch(baseURL + "auth/users/me/", requestOptions)
    },
    login(requestOptions) {
        return fetch(baseURL + "auth/jwt/create/", requestOptions)
    },
    logout() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow',
        };
        return fetch(baseURL + `auth/users/me/`, requestOptions)
    },
    auth(requestOptions) {
        return fetch(baseURL + "auth/users/", requestOptions)
    },
    registrConfirm(requestOptions){
        return fetch(baseURL + "auth/users/activation/", requestOptions)
    },
}
export const tokenAPI = {
    refreshAccess(){
        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            withCredentials: true
        };
        return fetch(baseURL + "auth/jwt/refresh/", requestOptions)
    }
}
export const mailAPI = {
    OneMail(mailId){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
       return  fetch(baseURL +`api/letters/` + mailId, requestOptions)
    },
    mailCheck(){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        return fetch(baseURL +"api/letters/check_email/10", requestOptions)
    },
    getAllMails(){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        return fetch(baseURL + `api/letters/?count=10&page=1`, requestOptions)
    },
    getCurrentPageMails(pageNumber){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }
        return fetch(baseURL +`api/letters/?count=10&page=${pageNumber}`, requestOptions)
    }
}
export const NewsAPI = {
    getCurrentNews(tags){
        let i = 0;
        let activeTag = "";
        if(tags !== undefined) {
            if (tags !== []) {
                while (i < tags.length) {
                    if(i === 0){
                    activeTag = tags[i]
                    i++
                    }else {
                        activeTag = activeTag+","+tags[i]
                        i++
                    }
                }
                let myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
                let requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                return fetch(baseURL + `api/demosnews/posts/?tags=${activeTag}`, requestOptions)
            }
        }
        tags === undefined ? tags = "": tags = "?tags="+tags
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        return fetch(baseURL+`api/demosnews/posts/${tags}`, requestOptions)
    },
    savePhoto(photoFile){
        let formData = new FormData()
        formData.append("image",photoFile)
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', "multipart/form-data")
        return fetch(`profile/photo`, formData, {

        } )
    },
    sendNewPost(title, text, tag, img){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`);
        let formdata = new FormData();
        formdata.append("title", title);
        formdata.append("text", text);
        formdata.append("tags", tag);
        if(img !== null){
        formdata.append("picture", img)
        }
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        return fetch(baseURL +"api/demosnews/posts/", requestOptions)
    },
    getAllTags(){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`)
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
       return  fetch(baseURL +"api/demosnews/tags/", requestOptions)
    },
    changePost(PostId, tags, title, text, img){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`)
        let formdata = new FormData()
        formdata.append("title", title)
        formdata.append("text", text)
        formdata.append("tags", tags)
        if(typeof img !== "string" && img !== null){

        formdata.append("picture", img)
        }
        let requestOptions = {
            method: 'PUT',
            body: formdata,
            headers: myHeaders,
            redirect: 'follow'
        };
        return  fetch(baseURL +"api/demosnews/posts/"+PostId, requestOptions)
    },
    getOnePost(id){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`)
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        return fetch(baseURL +"api/demosnews/posts/"+id, requestOptions)
    },
    deleteOnePost(id){
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access")}`)
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        return fetch(baseURL +"api/demosnews/posts/"+id, requestOptions)
    }

}
export const ProfileAPI = {
    getUserPosts(){

    }
}


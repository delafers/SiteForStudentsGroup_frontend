export const required = value => {
    if (value) return undefined;
    return 'Поле должно быть заполнено';
}

export const maxLengthCreator = (maxlength) => (value) =>{
    if (value.length > maxlength) return `Max length is ${maxlength} symbols`
}

export const tagCheck = (value = "") => {
    if (value.indexOf(" ") !== -1){
        return "Если хотиете записать несколько тегов, то разделите их запятой, без пробелов"
    }
}
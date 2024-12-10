export const random =(len:number)=>{
    const object = "fnanfkemenfsnkdnsb335234252342"
    let length = object.length;
    let ans = ""
    for (let i=0;i<object.length;i++){
        ans+=object[Math.floor(Math.random()) * 10]
    }
    return ans;
}
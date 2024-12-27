export const random =(len:number)=>{
    const object = "abcdefghijklmnopqrstuvwxyz1234567890"
    let length = object.length;
    let ans = ""
    for (let i=0;i<object.length;i++){
        ans+=object[Math.floor(Math.random()) * 10]
    }
    return ans;
}
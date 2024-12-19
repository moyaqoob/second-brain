export interface InputProps{
    placeholder:string,
    type:string
}

export const CreateModel = ({open,onClose}) =>{
    return (
        <div>

        
        {open &&
        <div className="w-screen h-screen border bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center items-center z-10">
            <div className="bg-white  flex items-center rounded-md">
                {/* <div className="flex justify-between p-4">
                    <h1>Create Model</h1>
                    <button onClick={close}>X</button>
                </div>
                <div className="p-4">
                    <Input placeholder="Model Name" type="text"/>
                    <Input placeholder="Model Description" type="text"/>
                </div>
                <div className="p-4">
                    <button>Create</button>
                </div> */}
                hi there
            </div>
            
        </div>}
        </div>
    )
}

const Input = (props:InputProps)=>{
    return (
        <div>
            <input type="text" placeholder={props.placeholder}/>

        </div>
        
    )
}
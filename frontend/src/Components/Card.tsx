import { ReactElement } from "react"  
// import Link from "/"

export interface CardProps {
    title:String,
    heading:String,
    startIcon:ReactElement,
    endIcon:ReactElement,
    tags: "productivity"|"ideas"|"learning"|"useful"
    delete:ReactElement
    image ?:ReactElement
}

export const Card =(props:CardProps)=>{
    return (
        <>
            <div className= "w-[100px] h-[120px] ">
                <nav className="flex justify-between">
                    <span>
                        {props.startIcon}
                    </span>
                    <h2>{props.title}</h2>
                    <span>
                        {props.endIcon}
                    </span>
                    {props.delete}
                </nav>  

                <section className="">
                    <h1 className="text-lg font-bold">
                        {props.title || props.image}
                    </h1>
                    h

                </section>
                


            </div>
        </>
    )
}
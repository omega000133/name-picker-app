const Item = (props) => {
    return (

        <button
            key={props.id}
            className={"font-semibold p-2 rounded-2xl m-1 " + (props.gender === "f" ? " bg-pink-400" : "bg-sky-500")}
            onClick={props.onClick}
        >{props.name}</button>
    )
}
export default Item;
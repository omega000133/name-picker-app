const RadioField = (props) => {
    return (
            <label className ="mx-1">
                <input type="radio" name={props.name} value={props.value} defaultChecked={props.checked&&'true'} />
                <img alt="All" src={props.imgSrc} width={props.width}/>
            </label>
    )
}
export default RadioField;
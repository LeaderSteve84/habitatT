export default function AddProperty() {
    return (
        <form className="">
            <label htmlFor="address">Address</label>
            <input type="text" />
            <label htmlFor="tyep">Type</label>
            <input type="text" />
            <label htmlFor="">Unit Availability</label>
            <input type="radio" /><label htmlFor="">Yes</label>
            <input type="radio" /><label htmlFor=""><No></No></label>
            <label htmlFor="">Rentage Fee</label>
            <input type="text" />
            <button>Sumbit</button>
        </form>
    )
}
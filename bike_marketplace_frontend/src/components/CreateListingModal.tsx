import React from "react";
import Modal from "bootstrap/js/dist/modal";
import { post } from "./backendInterface";

interface ICreateListModalProps {
    isShow: boolean,
    closeCallback: () => void
}

function CreateListingModal(props: ICreateListModalProps) {
    const myModal = React.useRef<Modal | undefined>(undefined);
    const [vehicleType, setVehicleType] = React.useState(-1);
    const [saleType, setSaleType] = React.useState(-1);
    const [saleAmount, setSaleAmount] = React.useState(0);
    const [pickupLocation, setPickupLocation] = React.useState("");
    const [extraNotes, setExtraNotes] = React.useState("");

    React.useEffect(() => {
        if (myModal.current == undefined) {
            myModal.current = new Modal(document.getElementById('createListingModal') as any, {
                keyboard: false
            });
        }
        if (props.isShow) {
            myModal.current.show();
            console.log(myModal);
        } else {
            console.log("hide modal");
            myModal.current.hide();
            console.log(myModal);
        }
    }, [props.isShow])

    function clearForm() {
        setVehicleType(-1);
        setSaleType(-1);
        setSaleAmount(0);
        setPickupLocation("");
        setExtraNotes("");
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("is_create", "true");
        formData.append("vehicle_type", vehicleType.toString());
        formData.append("sale_type", saleType.toString());
        formData.append("amount", saleAmount.toString());
        formData.append("pickup_location", pickupLocation);
        formData.append("extra_notes", extraNotes);

        const requestResponse = post("/api/listing/", formData);
        requestResponse.then(() => {
            closeCallback();
        })
    }

    function closeCallback() {
        clearForm();
        props.closeCallback();
    }
    return (
        <div className="bootstrap-modal">
            <div className="modal fade" id="createListingModal">
                <div className="modal-dialog" role="document">
                    <form onSubmit={onSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Listing</h5>
                                <button type="button" className="close" onClick={(e) => closeCallback()}><span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="basic-form">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Vehicle Type</label>
                                            <select id="inputState" value={vehicleType} className="form-control"
                                                onChange={(e) => setVehicleType(parseInt(e.target.value))}>
                                                <option value={-1}>Choose Vehicle...</option>
                                                <option value={0}>Bike</option>
                                                <option value={2}>Scooter</option>
                                                <option value={3}>Electric Bike</option>
                                                <option value={4}>Electric Scooter</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Type of Sale</label>
                                            <select id="inputState" className="form-control"
                                                value={saleType} onChange={(e) => setSaleType(parseInt(e.target.value))}>
                                                <option value={-1}>Choose Sale...</option>
                                                <option value={0}>Rent</option>
                                                <option value={1}>Sell</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="number" className="form-control" placeholder="100"
                                            value={saleAmount} onChange={(e) => setSaleAmount(parseFloat(e.target.value))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Pickup Location</label>
                                        <input type="text" className="form-control" placeholder="Memorial Union"
                                            value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label>Extra Notes</label>
                                        <input type="textarea" className="form-control" placeholder="Rent for the weekend"
                                            value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {/*<button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onClick={(e) => closeCallback()}>Close</button>*/}
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateListingModal;
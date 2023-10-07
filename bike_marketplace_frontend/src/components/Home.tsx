import React from "react";

import Header from "./Header";
import TabsWithBikes from "./TabsWithBikes";
import CreateListingModal from "./CreateListingModal";
import { get, post } from "./backendInterface";
import { AxiosResponse } from "axios";
import Loader from "./Loader";

export interface IBikes {
    id: number,
    ll_user_id: number,
    ll_vehicle_type: number,
    ll_sale_type: number,
    ll_sale_status: number,
    ll_sale_amount: number,
    ll_pickup_location: string,
    ll_extra_notes: string,
    is_self: boolean
}

export interface IAxiosBikes extends AxiosResponse {
    data: {
        data: IBikes[]
    }
}

export interface IAxiosBike extends AxiosResponse {
    data: {
        data: IBikes
    }
}

function Home() {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isShowListingModal, setIsShowListingModal] = React.useState(false);
    const [tabContent, setTabContent] = React.useState<(IBikes[])[]>([[], [], []])

    React.useEffect(() => {
        const requestResponse = get("/api/listing/", undefined, 
            {is_public_reservations: "is_public_reservations"}) as Promise<IAxiosBikes>;
        requestResponse.then((success) => {
            setIsLoaded(true);
            setTabContent((currTabContent) => {
                currTabContent[0] = success.data.data;
                return currTabContent;
            })
        })
    }, [])

    function tabCallback(tabIndex: number) {
        let query_param_key = "";
        if (tabIndex == 0) {
            query_param_key = "is_public_reservations";
        } else if (tabIndex == 1) {
            query_param_key = "is_self_reservations";
        } else if (tabIndex == 2) {
            query_param_key = "is_self_reserved";
        }
        let queryParams: any = {};
        queryParams[query_param_key] = query_param_key
        const requestResponse = get("/api/listing/", undefined, queryParams) as Promise<IAxiosBikes>;
        requestResponse.then((success) => {
            setTabContent((currTabContent) => {
                currTabContent[tabIndex] = success.data.data;
                return JSON.parse(JSON.stringify(currTabContent));
            })
        })
    }

    function reserveCallback(tabIndex: number, index: number) {
        let formData = new FormData()
        formData.append("is_reserve", "true");
        formData.append("listing_id", tabContent[tabIndex][index].id.toString());
        const requestResponse = post("/api/listing/", formData) as Promise<IAxiosBike>
        requestResponse.then(() => {
            tabCallback(0);
        })
    }

    function tabsBikesActionButtonCallback(buttonName?: string) {
        if (buttonName != undefined && buttonName == "Add Listing") {
            setIsShowListingModal(true);
        }
    }

    function addListingModalCloseCallback() {
        tabCallback(1);
        setIsShowListingModal(false);
    }

    function createTabsWithBikes() {
        let tabNames = ["Public Listings", "My Listings", "My Reservations"];
        let actionButton = [false, true, false];
        let emptyContent = ["There are no public listings", "You don't have any listings", 
            "You don't have any reservations"];
        let actionButtonName = [undefined, "Add Listing", undefined];
        return <TabsWithBikes tabNames={tabNames} tabContent={tabContent} emptyContent={emptyContent}
            actionButton={actionButton} actionButtonName={actionButtonName}
            actionButtonCallback={tabsBikesActionButtonCallback} tabCallback={tabCallback}
            reserveCallback={reserveCallback} />
    }
    return (
        <>
            <Loader isLoaded={isLoaded} />
            <Header />
            {createTabsWithBikes()}
            <CreateListingModal isShow={isShowListingModal} closeCallback={addListingModalCloseCallback} />
        </>
    )
}

export default Home;
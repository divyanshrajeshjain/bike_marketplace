import React from "react";
import { IBikes } from "./Home";

import bikePng from "../images/bicycle.png";
import scooterPng from "../images/micro-scooter.png";

interface ITabsWithBikesProps {
    tabNames: string[]
    tabContent: (IBikes[])[],
    emptyContent: string[],
    actionButton: boolean[],
    actionButtonName: (string | undefined)[],
    tabCallback: (tabIndex: number) => void,
    actionButtonCallback: (buttonName?: string) => void,
    reserveCallback: (tabIndex: number, index: number) => void
}

function TabsWithBikes(props: ITabsWithBikesProps) {
    const [currActiveTabIndex, setCurrActiveTabIndex] = React.useState(0);

    function tabCallback(newTabIndex: number) {
        setCurrActiveTabIndex(newTabIndex);
        props.tabCallback(newTabIndex);
    }

    return (
        <div className="content-body" style={{ margin: 0 }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <ul className="d-flex nav nav-pills mb-3">
                                    {props.tabNames.map((tabName, index) => {
                                        return (
                                            <li className="nav-item">
                                                <a href="#" className={index == currActiveTabIndex ? "nav-link active" : "nav-link"} data-toggle="tab" aria-expanded="false"
                                                    onClick={(e) => tabCallback(index)}>
                                                    {tabName}
                                                </a>

                                            </li>
                                        )
                                    })}
                                    {(() => {
                                        if (props.actionButton[currActiveTabIndex]) {
                                            return (
                                                <a href="#" className="btn btn-primary mr-auto"
                                                    onClick={(e) => props.actionButtonCallback(props.actionButtonName[currActiveTabIndex])}>
                                                        {props.actionButtonName[currActiveTabIndex]}</a>
                                            )
                                        }
                                    })()}
                                </ul>
                                <div className="tab-content br-n pn">
                                    {props.tabContent.map((tabContent, tabIndex) => {
                                        return (
                                            <div id="navpills-1" className={tabIndex == currActiveTabIndex ? "tab-pane active" : "tab-pane"}>
                                                {(() => {
                                                    if (tabContent.length == 0) {
                                                        return (
                                                            <div className="row align-items-center">
                                                                <p>{props.emptyContent[tabIndex]}</p>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div className="row">
                                                                {tabContent.map((currTabContent, index) => {
                                                                    return (
                                                                        <div className="col-md-6 col-lg-3" key={currTabContent.id}>
                                                                            <div className="card">
                                                                                {(() => {
                                                                                    if (currTabContent.ll_vehicle_type == 0 || currTabContent.ll_vehicle_type == 3) {
                                                                                        return (
                                                                                            <img className="img-thumbnail" src={bikePng} alt="" />
                                                                                        )
                                                                                    } else if (currTabContent.ll_vehicle_type == 2 || currTabContent.ll_vehicle_type == 4) {
                                                                                        return (
                                                                                            <img className="img-thumbnail" src={scooterPng} alt="" />
                                                                                        )
                                                                                    }
                                                                                })()}
                                                                                <div className="card-body">
                                                                                    {(() => {
                                                                                        if (currTabContent.ll_vehicle_type == 0 || currTabContent.ll_vehicle_type == 2) {
                                                                                            return (
                                                                                                <p className="card-text">Vehicle Type: Manual</p>
                                                                                            )
                                                                                        } else if (currTabContent.ll_vehicle_type == 3 || currTabContent.ll_vehicle_type == 4) {
                                                                                            return (
                                                                                                <p className="card-text">Vehicle Type: Electric</p>
                                                                                            )
                                                                                        }
                                                                                    })()}
                                                                                    {(() => {
                                                                                        if (currTabContent.ll_sale_type == 0) {
                                                                                            return (
                                                                                                <p className="card-text">Sale Type: Rent</p>
                                                                                            )
                                                                                        } else if (currTabContent.ll_sale_type == 1) {
                                                                                            return (
                                                                                                <p className="card-text">Sale Type: Sell</p>
                                                                                            )
                                                                                        }
                                                                                    })()}
                                                                                    <p className="card-text">Amount: ${currTabContent.ll_sale_amount}</p>
                                                                                    <p className="card-text">Pickup Location: {currTabContent.ll_pickup_location}</p>
                                                                                    <p className="card-text">Extra Notes: {currTabContent.ll_extra_notes}</p>
                                                                                </div>
                                                                                <div className="card-footer">
                                                                                    <p className="card-text d-inline"><small className="text-muted"></small>
                                                                                    {(() => {
                                                                                        if (currTabContent.ll_sale_status == 0) {
                                                                                            return (
                                                                                                <span className="card-text d-inline badge badge-success">Available</span>
                                                                                            )
                                                                                        } else if (currTabContent.ll_sale_status == 1) {
                                                                                            return (
                                                                                                <span className="card-text d-inline badge badge-danger">Taken</span>
                                                                                            )
                                                                                        }
                                                                                    })()}
                                                                                    {(() => {
                                                                                        if (!currTabContent.is_self && currTabContent.ll_sale_status != 1) {
                                                                                            return (
                                                                                                <a href="#" className="card-link float-right" onClick={(e) => props.reserveCallback(tabIndex, index)}><small>Reserve</small></a>
                                                                                            )
                                                                                        }
                                                                                    })()}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        )
                                                    }
                                                })()}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabsWithBikes;
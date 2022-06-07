import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddNameLayer from "../AddNameLayer";

export default function ButtonAddLayer() {

    const [project, setProjects] = useState([])
    const [layers, setLayers] = useState([])

    const readProjects = async () => {
        try {
        const response = await fetch("http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/")
        const projects = await response.json()
        console.log(projects.layer_set)
        setLayers(projects.layer_set)
        setProjects(projects)
        } catch (error) {
        console.log(error)
        }
    }

    useEffect(() => {
        readProjects()
    }, [])

    const addNameLayer = (layer) => {
        axios.post("http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/", {
        layer_set: [
            ...layers,
            layer
        ]
    })
    .then( response => {
        console.log(response.data.layer_set)
        readProjects()
        // setLayers([
        //   ...layers,
        //   layer
        // ]
        // )
    })
    .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <button className="button_show_modal button_ui">
                    <i>
                        <FontAwesomeIcon icon={faPlus} />
                    </i>
                    Agregar layer
                </button>
            </div>
            <div className="modal_ui modal_container">
                <button className="button_close_modal button_square_icon button_square_icon_bg button_square_icon_tr15">
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className="modal_content card_content">
                    <h2 className="title_head">Agregar layer</h2>
                    <AddNameLayer addNameLayer={addNameLayer} />
                </div>
            </div>
        </React.Fragment>
    )
}

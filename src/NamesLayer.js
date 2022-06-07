import React, {useEffect, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddNameLayer from "./AddNameLayer";


export default function NamesLayer (props) {
    
    // console.log(props.layers)
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

    return(
        <React.Fragment>
            <div className="card_content_container">
            {
                props.layers.map((item, index) => (
                    <div key={item.name} className="card_content">
                        <div>
                            <div>Layer {index + 1}: </div>
                            <div>{item.name}</div>
                            <div>
                                <button className="button_square_dropdown button_square_icon button_square_icon_line">
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </button>
                            </div>
                        </div>
                    </div>                          
                ))
            }
            </div>
            <div className="d-flex justify-content-center mt-3">
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

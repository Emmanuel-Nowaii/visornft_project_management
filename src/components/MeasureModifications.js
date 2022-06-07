import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function MeasureModifications() {

    const [project, setProjects] = useState([])
    const [imageWidth, setImageWidth] = useState("")
    const [imageHeigth, setImageHeigth] = useState("")
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

    const saveMeasures = () => {
        axios.post(`http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/`, {
            image_width: imageWidth,
            image_heigth: imageHeigth,
            layer_set: []
        })
        .then(function(response) {
            console.log('Post exitoso', response)
            setImageWidth("")
            setImageHeigth("")
            readProjects()
        })
        .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            <div className="card_content">
                <div className="button_show_modal tag">
                    <span>Size</span>
                    <div>{project.image_width}</div>
                    <span>x</span>
                    <div>{project.image_heigth}</div>
                </div>
                <div className="modal_ui modal_container">
                    <button className="button_close_modal button_square_icon button_square_icon_bg button_square_icon_tr15">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    <div className="modal_content card_content">
                        <h2 className="title_head">NFT Collection Settings</h2>
                        <form className="mt-4" onSubmit={saveMeasures}>
                            <div className="form_textfield">
                                <label htmlFor='width'>Width</label>
                                <input 
                                    type='text' 
                                    id='width' 
                                    value={imageWidth} 
                                    placeholder={project.image_width} 
                                    onChange={(e) => setImageWidth(e.target.value)} 
                                />
                            </div>
                            <div className="form_textfield">
                                <label htmlFor='heigth'>Heigth</label>
                                <input 
                                    type='text' 
                                    id='heigth' 
                                    value={imageHeigth} 
                                    placeholder={project.image_heigth} 
                                    onChange={(e) => setImageHeigth(e.target.value)} 
                                />
                            </div>
                            <div className="mt-3">
                                <button className="button_ui button_ui_w100">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

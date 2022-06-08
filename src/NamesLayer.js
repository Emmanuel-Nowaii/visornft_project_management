import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddNameLayer from "./AddNameLayer";


export default function NamesLayer ({layers, readProjects, setLayers}) {
    
    // console.log(layers)
    // readProjects()

    // const readProjects = async () => {
    //     try {
    //       const response = await fetch("http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/")
    //       const projects = await response.json()
    //       console.log(projects.layer_set)
    //       setLayers(projects.layer_set)
    //       setProjects(projects)
    //     } catch (error) {
    //       console.log(error)
    //     }
    // }
  
    // useEffect(() => {
    //     readProjects()
    // }, [])

    const addNameLayer = (layer) => {
        axios.post("http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/", {
            layer_set: [
                ...layers,
                layer
            ]
        })
        .then( response => {
            readProjects()
            console.log(response.data.layer_set)
            let modalsUI = document.querySelectorAll(".modal_ui")
            modalsUI.forEach(modalUI => {
                modalUI.classList.remove("show_modal")
            })
        })
        .catch(error => console.log(error))
    }

    const deleteProject = (item) => {
        console.log(item)
        axios.post('http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/', {
           data: { 
            layer_set: [
                item
            ]
           }
        })
        .then(function(response) {
            console.log('Eliminado',response)
            readProjects()
        })   
        .catch(error => console.log(error))
    };

    let dropdownsContent = document.querySelectorAll(".dropdown_content");
    let buttonsSquareDropdown = document.querySelectorAll(".button_square_dropdown");

    buttonsSquareDropdown.forEach((buttonSquareDropdown, index) => {
        buttonSquareDropdown.onclick = function() {
            dropdownsContent[index].classList.toggle("show_dropdown")
        }
    });

    document.addEventListener("click", function(e) {
        let click = e.target

        dropdownsContent.forEach((dropdownContent, index) => {
            if (dropdownContent.classList.contains("show_dropdown") && click !== buttonsSquareDropdown[index]) {
                dropdownContent.classList.remove("show_dropdown");
            }
        })
    })

    return(
        <React.Fragment>
            <div className="card_content_container">
            {
                layers.map((item, index) => (
                    <div key={item.slug} className="card_content">
                        <div className="layer_head">
                            <div className="layer_head_index">
                                <p className="mb-0">Layer {index + 1}</p>
                            </div>
                            <div className="layer_head_name">
                                <div className="layer_head_name_content">
                                    <p className="mb-0">{item.name}</p>
                                </div>
                            </div>
                            <div className="layer_head_action">
                                <div className='card_icon_container'>
                                    <div className="card_icon_content">
                                        <button className="button_square_dropdown button_square_icon button_square_icon_line">
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                        </button>
                                        <div className="dropdown_content dropdown_content__right dropdown_content__top">
                                            <button className="dropdown_item" >Mover arriba</button>
                                            <button className="dropdown_item" >Mover abajo</button>
                                            <button className="dropdown_item" onClick={() => deleteProject(item)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
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

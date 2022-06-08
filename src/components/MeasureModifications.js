import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faRedo } from '@fortawesome/free-solid-svg-icons';

export default function MeasureModifications({imageWidth, imageHeigth, widthChange, heigthChange, project, layers, readProjects}) {

    const saveMeasures = (e) => {
        e.preventDefault()
        let numberWidth = Number(imageWidth)
        let numberHeigth = Number(imageHeigth)
    
        if(imageWidth === "" && imageHeigth === "") {
          alert("Tus campos se encuentran vacios")
        } else if (numberWidth < 500 || numberWidth > 1200 || numberHeigth < 500 || numberHeigth > 1200) {
          alert("Las medidas deben ser entre 500 y 1200")
          widthChange("")
          heigthChange("")
        } else {
          axios.post(`http://pruebafront.nowaii.com/api/v1/collection/designer/7f0afe1efd2544bd8ff1a82ea1088df8/`, {
            image_width: imageWidth,
            image_heigth: imageHeigth,
            layer_set: [
              ...layers
            ]
          })
          .then(function(response) {
            console.log('Post exitoso', response)
            readProjects()
            let modalsUI = document.querySelectorAll(".modal_ui")
            modalsUI.forEach(modalUI => {
              modalUI.classList.remove("show_modal")
            })
            widthChange("")
            heigthChange("")
            // readProjects()
          })
          .catch(error => console.log(error))
        }
      }

    return (
        <React.Fragment>
           <div className="card_content">
                  <div className="project_head">
                    <div className="button_show_modal tag">
                      <span>Size</span>
                      <div>{project.image_width}</div>
                      <span>x</span>
                      <div>{project.image_heigth}</div>
                    </div>
                      {
                        layers.length === 0 ?
                          <button className="button_ui" disabled>
                            <i>
                              <FontAwesomeIcon icon={faRedo} />
                            </i>
                            Generate Collection
                          </button>
                        :
                          <a href={`https://www.google.com.gt/search?q=[${project.slug}]`} className="button_ui">
                            <i>
                              <FontAwesomeIcon icon={faRedo} />
                            </i>
                            Generate Collection
                          </a>
                      }
                  </div>
                  <div className="modal_ui modal_container">
                      <button className="button_close_modal button_square_icon button_square_icon_bg button_square_icon_tr15">
                        <FontAwesomeIcon icon={faClose} />
                      </button>
                      <div className="modal_content card_content">
                        <h2 className="title_head">NFT Collection Settings</h2>
                        <form className="mt-4" onSubmit={(e) => saveMeasures(e)}>
                          <div className="form_textfield">
                            <label htmlFor='width'>Width</label>
                            <input 
                              type='text' 
                              id='width' 
                              value={imageWidth} 
                              placeholder={project.image_width} 
                              onChange={(e) => widthChange(e.target.value)} 
                            />
                          </div>
                          <div className="form_textfield">
                            <label htmlFor='heigth'>Heigth</label>
                            <input 
                              type='text' 
                              id='heigth' 
                              value={imageHeigth} 
                              placeholder={project.image_heigth} 
                              onChange={(e) => heigthChange(e.target.value)} 
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

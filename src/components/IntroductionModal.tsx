import React, {useState, Fragment} from 'react'
import { Modal, Button} from "flowbite-react"

const IntroductionModal = () => {
    const [open, setopen] = useState(true)
    
    function onClick () {
      console.log("heyy i happened :)")
      setopen(!open)
    }


  return (
    <div style={{width: "80px", overflow: 'hidden'}}>
    <>
    <Modal
      show={open}
      onClose={onClick}
    >
      <Modal.Header>
        About fact book
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Dear visitor, this webpage was created to showcase various IGOs (inter-governmental organisations) 
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Data were scraped from cia world fact book in the year 2020 so there might be some inaccuracies
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClick}>
          Got it
        </Button>
        
      </Modal.Footer>
    </Modal>
  </>
  </div>
  )
}

export default IntroductionModal
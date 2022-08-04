import React, {TextareaHTMLAttributes, useEffect} from 'react'
import { Fragment, useRef, useState} from 'react'
import { Dialog, Transition} from '@headlessui/react'
import { PencilIcon } from '@heroicons/react/outline'
import organizations from "../../data/IGOs.json"
import emailjs from '@emailjs/browser';

interface editModalProps {
    currentOrganization: String
}

const EditModal = (props : editModalProps) => {

    const editIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
   </svg>;


    const form = useRef() as React.MutableRefObject<HTMLFormElement>


function changeWikiLinkInput (e : React.ChangeEvent<HTMLInputElement>) {
    if(e.target.value.startsWith("https://en.wikipedia.org/wiki/")){
        setwikiValue(e.target.value)}
}

function proposeChanges (){

    emailjs.sendForm('service_vuwjrfj', 'template_64jsehy',  form.current, "8L4NVsiqUC8RE1HZw")
      .then((result : any) => {
          console.log(result.text);
      }, (error: any) => {
          console.log(error.text);
      });

    
}

function suggestionBoxValueChange(e : React.ChangeEvent<HTMLTextAreaElement>){
    setsuggestionBoxValue(e.target.value)
}

const wikiPage = organizations[props.currentOrganization as keyof typeof organizations].wikiPage

useEffect(() => {
  setwikiValue(wikiPage)
}, [wikiPage])


const [open, setOpen] = useState(false)
const [wikiValue, setwikiValue] = useState(wikiPage)
const [suggestionBoxValue, setsuggestionBoxValue] = useState(wikiPage)

const cancelButtonRef = useRef(null)

  return (
<>
{/* the triggering icon */}
<div onClick={() => setOpen(!open)} className=' m-2 w-fit p-4 h-fit bg-slate-100 bg-opacity-80 hover:bg-slate-600 hover:cursor-pointer rounded-full'>{editIcon}</div>

{/* Modal */}
<Transition.Root show={open} as={Fragment}>
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
    <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-25"
        leave="ease-in duration-200"
        leaveFrom="opacity-25"
        leaveTo="opacity-0"
    >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    </Transition.Child>

    <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
            <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                <div className=" flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PencilIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="mt-3 mx-auto text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Edit information on {props.currentOrganization}
                    </Dialog.Title>
                    <h3>Edit wikipedia page</h3>
                    <p className=' text-slate-700 text-lg'><a href={wikiPage}>{wikiPage}</a></p>
                    <div className="mt-2">
                        <form ref = {form}>
                        <div className="flex justify-center m-4 ">
                                <input type="text"  name = "wikiChange"
                                className="form-control flex-auto min-w-0 block 
                                text-lg font-normal text-gray-700 
                                bg-white bg-clip-padding border border-solid 
                                border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 
                                focus:bg-white focus:border-blue-900
                                focus:outline-none" placeholder = {wikiPage}  onChange={changeWikiLinkInput} value = {wikiValue}>
                                </input>
                        </div>
                        <p>Change anything else about this organisation  </p>
                        <div className="flex justify-center m-4 ">
                                <textarea  name='suggestionText'
                                className=" h-40 form-control flex-auto min-w-0 block 
                                text-lg font-normal text-gray-700 
                                bg-white bg-clip-padding border border-solid 
                                border-gray-300 rounded transition 
                                ease-in-out m-0 focus:text-gray-700 
                                focus:bg-white focus:border-blue-900
                                focus:outline-none" placeholder = " your suggestion" onChange = {suggestionBoxValueChange} >
                                </textarea>
                        </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {proposeChanges(); setOpen(false)}}
                >
                Propose the edit
                </button>
                <button 
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setOpen(false)}
                ref={cancelButtonRef}
                >
                Cancel
                </button>
            </div>
            </Dialog.Panel>
        </Transition.Child>
        </div>
    </div>
    </Dialog>
</Transition.Root>
</>
  )
}

export default EditModal
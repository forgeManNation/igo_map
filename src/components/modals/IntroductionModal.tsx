import React, {TextareaHTMLAttributes, useEffect} from 'react'
import { Fragment, useRef, useState} from 'react'
import { Dialog, Transition} from '@headlessui/react'
import { InformationCircleIcon, CheckIcon, EmojiHappyIcon } from '@heroicons/react/outline'

interface introductionModalProps {
    open: boolean,
    triggerIntroductionModal: () => void
}


const IntroductionModal = (props: introductionModalProps) => {

const cancelButtonRef = useRef(null)

  return (
<>
{/* Modal */}
<Transition.Root show={props.open} as={Fragment}>
    <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={props.triggerIntroductionModal}>
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
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <InformationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Information about IGO Map
                    </Dialog.Title>
                    <hr className='my-4' />
                    <p className="text-base leading-relaxed text-gray-900 dark:text-gray-400">
                    Dear visitor, this webpage was created to showcase various IGOs (inter-governmental organisations) 
                    <hr className='my-4' />
                    the data were scraped from <a href='#www.ciaworldfactbook.com' target="_blank" className=' font-semibold text-slate-700'>The World Factbook</a> in the year 2020 and 
                    may be obsolete or incomplete, if that is the case you can help us update these data by filling form in edit button
                    <hr className='my-4' />
                    <span className='text-gray-500'>created by <a className='underline' href = "myPortfolio.com">Radek Starý</a></span>
                    </p>
            </div>            
            </div>
            </div>


            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={props.triggerIntroductionModal}
                >
                Understand &nbsp;<CheckIcon className='h-6 w-6'></CheckIcon>
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



export default IntroductionModal
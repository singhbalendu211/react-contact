import React from 'react'
import Modal from './Modal'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { db } from '../config/firebase'
import {addDoc, collection, doc, updateDoc,} from 'firebase/firestore';
import { toast } from 'react-toastify';
import * as Yup from 'yup';


const contactSchemaValidation= Yup.object().shape({
    name: Yup.string().required("*name is required."),
    Email: Yup.string().email("*invalid email").required("*email is required."),

})



const AddAndUpdateContact = ({isOpen, onClose, isUpdate, contact}) => {

    const addContact=async (contact)=>{
        try {
            const contactRef= collection(db, "contacts");
            await addDoc(contactRef, contact);
            onClose();
            toast.success("Contact added successfully.")
            
        } catch (error) {
            console.log(error);
            
            
        }

    }

    const updateContact=async (contact, id)=>{
        try {
            const contactRef= doc(db, "contacts", id);
            await updateDoc(contactRef, contact);
            onClose();
            toast.success("Contact updated successfully.")

        } catch (error) {
            console.log(error);
            
            
        }

    }
  return (
    <div>
        <Modal isOpen={isOpen} onClose={onClose}>
           <Formik 
           validationSchema={contactSchemaValidation}
            initialValues={
                isUpdate
                ?{
                    name: contact.name,
                    Email: contact.Email,
                 }
                :{
                    name:"",
                    Email:"",
                 }
        }
            onSubmit={(values)=>{
                console.log(values);
                isUpdate?
                updateContact(values, contact.id):
                addContact(values)
                
            }}
           >
            <Form className='flex flex-col gap-4' >
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name">Name</label>
                    <Field name='name' className='h-10 border ' />  
                    <div className='text-sm text-red-500'>
                        <ErrorMessage name="name" />
                    </div>
                </div>
                
                 <div className='flex flex-col gap-1'>
                    <label htmlFor="Email">Email</label>
                    <Field name='Email' className='h-10 border' />  
                     <div className='text-sm text-red-500'>
                        <ErrorMessage name="Email" />
                    </div>
                </div>

                <button className='border px-3 py-1.5 bg-[#F6820C] rounded-2xl self-center font-semibold text-white cursor-pointer'>
                    {isUpdate? "Update": "Add"} Contact
                </button>
            </Form>
           </Formik>
        </Modal>
    </div>
  )
}

export default AddAndUpdateContact
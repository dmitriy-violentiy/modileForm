import React from "react"
import classes from '../App.module.css';
import { useForm } from "react-hook-form"
import ReactInputMask from "react-input-mask"

const ModalForm = ({children, visible, setVisible}) => {

   const rootClasses = [classes.modalForm]
   if (visible) {
      rootClasses.push(classes.modalFormActive)
   } 

   const {
      register,
      formState: { errors },
      handleSubmit,
      reset
   } = useForm(
      {
         mode: "onTouched"
      }
   )

   const onSubmit = (data) => {
      data.phoneNumber = data.phoneNumber.replace(/[^0-9+]/gi, '')
      alert('Ваши данные успешно отправлены и сгруппированы в JSON формат:' + JSON.stringify(data))
      reset()
      setVisible(false)
   }

   return (
      <div className={rootClasses.join(' ')} onClick={() => {setVisible(false)}}>
      
         <form onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
            {children}
            <h1>Форма отправки</h1>
            <label htmlFor='phoneNumber'>
               Номер телефона <span>*</span>:
               <ReactInputMask
                  mask='+7 (999)-999-99-99'
                  placeholder='+7 (999)-999-99-99'
                  {...register('phoneNumber', {
                     required: 'Поле обязательно к заполнению',
                     pattern: {
                        value: /^[0-9+)() -]+$/i,
                        message: "Введите полный номер телефона"
                     }
                  })}/>
            </label>

            <div>
               {errors?.phoneNumber && <p className={classes.error}>{errors?.phoneNumber?.message || "Ошибка"}</p>}
            </div>

            <label htmlFor='name'>
               Имя <span>*</span>:
               <input 
                  {...register("name", { 
                     required: 'Поле обязательно к заполнению',
                     maxLength: {
                        value: 20,
                        message: "Превышено допустимое число символов"
                     },
                     pattern: {
                        value: /^[A-Za-zА-Яа-я]+$/i,
                        message: "Введены недопустимые символы"
                     }
                  })}/>
            </label>
            <div>
               {errors?.name && <p className={classes.error}>{errors?.name?.message || "Ошибка"}</p>}
            </div>

            <label htmlFor='message'>
               Сообщение <span>*</span>:
               <input
                  {...register('message', {
                     required: 'Поле обязательно к заполнению',
                     maxLength: {
                        value: 100,
                        message: "Превышено допустимое число символов"
                     },
                     pattern: {
                        value: /^[A-Za-zА-Яа-я0-9,.!-]+$/i,
                        message: "Введены недопустимые символы"
                     }
                  })}/>
            </label>
            <div>
            {errors?.message && <p className={classes.error}>{errors?.message?.message || "Ошибка"}</p>}
            </div>
            
            <input type='submit' value='Отправить'/>
         </form>

      </div>
   )
}

export default ModalForm
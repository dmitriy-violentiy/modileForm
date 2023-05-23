import React, { useState } from 'react';
import classes from './App.module.css';
import ModalForm from './components/ModalForm';

function App() {
   const [modal, setModal] = useState(false)

   return (
      <div className={classes.App}>
         <button className={classes.openFormButton} onClick={() => {setModal(true)}}>Открыть форму</button>
         <ModalForm visible={modal} setVisible={setModal} />
      </div>
   );
}

export default App;

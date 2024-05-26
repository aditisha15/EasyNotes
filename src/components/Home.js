import React from 'react'
import Notes from './Notes';
import AddNote from './AddNote';

export default function Home({showAlert, mode, text}) {

  return (
    <div>
      <AddNote showAlert={showAlert} mode={mode} text={text}/>
      <Notes showAlert={showAlert} text={text} mode={mode}/>
    </div>
  )
}

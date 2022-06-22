import React from 'react'

import Clients from "../components/Clients";
import Projects from "../components/Projects";
import AddClientModel from "../components/AddClientModel";
import AddProjectModel from "../components/AddProjectModdel";


export default function Home() {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddClientModel />
        <AddProjectModel />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  )
}

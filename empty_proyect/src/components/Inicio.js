import React from 'react';
import '../styles/Inicio.css';

import ButtonTipo1 from './btn_tipo1';


function Inicio({ scrollToSection }) {
  return (
    <div className="h-screen w-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">¡Tailwind CSS!</h1>
      <p className="mt-4 text-white">
        Tailwind CSS es increíblemente poderoso. ¡No puedo esperar para seguir explorándolo!
      </p>

      <ButtonTipo1 text="Texto del botón" url="#section1" />
    </div>
  );
}

export default Inicio;

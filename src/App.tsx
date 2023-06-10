import React, {ChangeEvent, useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { createPopper } from '@popperjs/core';
import { tippy } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/translucent.css';

const Home = () => {
  const defaultImageUrl = 'https://www.habbo.com.br/habbo-imaging/avatarimage?direction=3&head_direction=3&action=wav&gesture=sml&size=l&user=Fabbri';
  const [username, setUsername] = useState('Fabbri');
  const [direction, setDirection] = useState(3);
  // Initialize tooltips after the component is mounted
  useEffect(() => {
    tippy('[data-tippy-content]', {
      allowHTML: true,
      placement: 'right',
      theme: 'translucent',
    });
  }, []);

  const imageUrl = `https://www.habbo.com.br/habbo-imaging/avatarimage?direction=${direction}&head_direction=3&action=std&gesture=sml&size=l&user=${username}`;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    (username !== '') ? setUsername(event.target.value) : setUsername('Fabbri');

    // if user == 'Fabbri', add verified icon
  };

  const handleEsquerdaClick = () => {
    setDirection(direction + 1);
  };

  const handleDireitaClick = () => {
    if(direction === 0) return setDirection(8);
    setDirection(direction - 1);
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-2/4 px-4 mb-8">
            <div className="bg-gray-900 rounded-lg shadow-md p-4">
              {/* Card Content */}
              <h2 className="text-xl font-semibold mb-2">Informações</h2>
              <p className="text-gray-600">Insira as informações de estilização para seu usuário</p>

              {/* Input with username */}
              <div className="mt-4">
                <label className="block text-gray-400 mb-2">Usuário</label>
                <input
                  className="bg-gray-800 appearance-none border-2 border-gray-800 rounded w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                  type="text"
                  placeholder="Usuário"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/4 px-4 mb-8">
            <div className="bg-gray-900 rounded-lg shadow-md p-4">
              {/* Card Content */}
              <h2 className="text-xl font-semibold mb-2">Visualização</h2>
              <p className="text-gray-600">Visualização da(s) estilização(ões) do usuário.</p>
                <h2 className="mx-auto text-center mt-2 font-bold text-xl">{ username }
                  <span data-tippy-content="Habbo Verificado">
          &nbsp;<FontAwesomeIcon icon={faCircleCheck} style={{ color: 'rgb(107 33 168)', fontSize: '18px',}} />
        </span>
                </h2>
              <img className="mx-auto" src={imageUrl || defaultImageUrl} alt="" onError={() => setUsername('Fabbri')} />
              {/* Arrow left and right */}
              <div className="flex justify-between mt-4">
                <button onClick={handleEsquerdaClick} className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  <svg className="w-4 h-4 fill-current inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M14.59 7.58L10 12.17l4.59 4.59L13 18l-6-6 6-6z" />
                  </svg>
                  Esquerda
                </button>
                <button onClick={handleDireitaClick} className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Direita
                  <svg className="w-4 h-4 fill-current inline-block ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M9.41 7.58L14 12.17l-4.59 4.59L11 18l6-6-6-6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

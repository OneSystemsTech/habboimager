import React, { ChangeEvent, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { createPopper } from '@popperjs/core';
import { tippy } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/translucent.css';

const Home = () => {
  const defaultImageUrl =
      'https://www.habbo.com.br/habbo-imaging/avatarimage?direction=3&head_direction=3&action=wav&gesture=sml&size=l&user=Fabbri';
  const [username, setUsername] = useState('Fabbri');
  const [direction, setDirection] = useState(3);
  const [emblemas, setEmblemas] = useState<string[]>([]);

  // Initialize tooltips after the component is mounted
  useEffect(() => {
    tippy('[data-tippy-content]', {
      allowHTML: true,
      placement: 'right',
      theme: 'translucent',
    });
  }, []);

  const imageUrl = `https://www.habbo.com.br/habbo-imaging/avatarimage?direction=${direction}&head_direction=3&action=std&gesture=sml&size=l&user=${username}`;

  const fetchHabboData = async () => {
    try {
      const response = await fetch(
          `https://www.habbo.com.br/api/public/users?name=${username}`
      );
      const data = await response.json();
      console.log(data);
      setUsername(data.name);
      const emblemas: string[] = data.selectedBadges.map(
          (badge: { code: string }) => badge.code
      );
      console.log(emblemas);
      setEmblemas(emblemas);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value || 'Fabbri');
  };

  const handleEsquerdaClick = () => {
    setDirection((prevDirection) => prevDirection + 1);
  };

  const handleDireitaClick = () => {
    if (direction === 0) return setDirection(8);
    setDirection((prevDirection) => prevDirection - 1);
  };

  const handleImageLoad = () => {
    fetchHabboData();
  };

  return (
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-2/4 px-4 mb-8">
              <div className="bg-gray-900 rounded-lg shadow-md p-4">
                {/* Card Content */}
                <h2 className="text-xl font-semibold mb-2">Informações</h2>
                <p className="text-gray-600">
                  Insira as informações de estilização para seu usuário
                </p>

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
                <p className="text-gray-600">
                  Visualização da(s) estilização(ões) do usuário.
                </p>
                <h2 className="mx-auto text-center mt-2 font-bold text-xl">
                  {username}
                  <span data-tippy-content="Habbo Verificado">
                  &nbsp;
                    <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{
                          color: 'rgb(107 33 168)',
                          fontSize: '18px',
                        }}
                    />
                </span>
                </h2>
                <img
                    className="mx-auto"
                    src={imageUrl || defaultImageUrl}
                    alt=""
                    onError={() => setUsername('Fabbri')}
                    onLoad={handleImageLoad}
                />

                {/* User badges */}
                <div className="flex justify-center mt-3">
                  <div className="flex flex-wrap mx-4">
                    <div className="px-2 w-1/1 text-center">
                      <div className="bg-gray-800 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-2">Emblemas</h2>
                        <div className="badge-container">
                          {emblemas.map((badgeCode) => (
                              <img
                                  data-tippy-content={badgeCode}
                                  style={{ display: "inline-block" }}
                                  key={badgeCode}
                                  src={`https://images.habbo.com/c_images/album1584/${badgeCode}.png`}
                                  alt={badgeCode}
                                  className="badge-image"
                              />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow left and right */}
                <div className="flex justify-between mt-4">
                  <button
                      onClick={handleEsquerdaClick}
                      className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <svg
                        className="w-4 h-4 fill-current inline-block"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M14.59 7.58L10 12.17l4.59 4.59L13 18l-6-6 6-6z" />
                    </svg>
                    Esquerda
                  </button>
                  <button
                      onClick={handleDireitaClick}
                      className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Direita
                    <svg
                        className="w-4 h-4 fill-current inline-block ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
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

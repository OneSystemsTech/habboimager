import React, { ChangeEvent, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { createPopper } from '@popperjs/core';
import { tippy } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/translucent.css';
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

const Home = () => {
  const defaultImageUrl =
      'https://www.habbo.com.br/habbo-imaging/avatarimage?direction=3&head_direction=3&action=wav&gesture=sml&size=l&user=Fabbri';
  const [username, setUsername] = useState('Fabbri');
  const [direction, setDirection] = useState(3);
  const [emblemas, setEmblemas] = useState<{ code: string; name: string }[]>([]);
  const [figure, setFigure] = useState<string>("hr-3163-61.hd-190-28.ch-210-110.lg-280-64.sh-290-92.ha-3156-110.ea-3925-94-99");
  const [online, setOnline] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | UserData>(null);

  interface UserData {
    figureString: string;
    // Add other properties of UserData if needed
  }

  // Initialize tooltips after the component is mounted
  useEffect(() => {
    window.onload = () => {
      tippy('[data-tippy-content]', {
        allowHTML: true,
        placement: 'right',
        theme: 'translucent',
      });
      // setUsername('Fabbri');
      // fetchHabboData('Fabbri');
    };
  }, []);


  const imageUrl = `https://www.habbo.com.br/habbo-imaging/avatarimage?direction=${direction}&head_direction=3&action=std&gesture=sml&size=l&figure=${figure}`;

  const fetchHabboData = async (username: string) => {
    try {
      const response = await fetch(
          `https://www.habbo.com.br/api/public/users?name=${username}`
      );
      const data = await response.json();

      setUsername(data.name);

      const figure = data.figureString;
      setFigure(figure);

      const emblemasData = data.selectedBadges.map((badge: {
        code: string;
        name: string;
      }) => ({ code: badge.code, name: badge.name }));
      setEmblemas(emblemasData);

      // Store the user data in the state
      setUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    fetchHabboData(event.target.value || 'Fabbri');
  };


  const handleEsquerdaClick = () => {
    setDirection((prevDirection) => prevDirection + 1);
  };

  const handleDireitaClick = () => {
    if (direction === 0) return setDirection(8);
    setDirection((prevDirection) => prevDirection - 1);
  };

  const handleImageLoad = () => {
//
  };

  // create an int called counter

  const changeUserFigure = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && userData) {
      // Use the figureString from userData
      const figureString = userData.figureString;

      // find ch in figure and "isolates" it till next dot
      const chFigure = figureString.substring(
          figureString.indexOf("ch-"),
          figureString.indexOf(".", figureString.indexOf("ch-"))
      );
      // console.log(chFigure);
      // replace chFigure with ch-225-73
      const newFigure = figureString.replace(chFigure, "ch-225-73");
      // console.log(newFigure);
      setFigure(newFigure);
    } else {
      // Revert the figure back to the figure received from the API response
      if (userData) {
        setFigure(userData.figureString);
      }
    }
  };

  return (
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-2/4 px-4 mb-8">
              <div className="bg-gray-50  rounded-lg shadow-md p-4 dark:bg-gray-900 ">
                {/* Card Content */}
                <h2 className="text-xl font-semibold mb-2">Informações</h2>
                <p className="text-gray-600">
                  Insira as informações de estilização para seu usuário
                </p>

                {/* Input with username */}
                <div className="mt-4">
                  <label className="block text-gray-400 mb-2">Usuário</label>
                  <input
                      className="text-black dark:bg-gray-800 appearance-none border-2 dark:border-gray-800 rounded w-full py-2 px-4 dark:text-gray-100 leading-tight focus:outline-none dark:focus:bg-gray-700 focus:border-purple-500"
                      type="text"
                      placeholder="Usuário"
                      onBlur={handleInputChange}
                  />
                </div>

                {/* Button vestir farda */}
                <div className="mt-4">
                  {/* Radio clothing selection input */}
                    <div className="flex flex-wrap mt-3">

                      { /* Toggle switch ON */}
                        <div className="w-1/2">
                            <label className="block text-gray-400 mb-2">Vestimenta</label>
                          <input
                              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-500 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-purple-800 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-purple-800 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-bg-purple-800 checked:focus:bg-purple-800 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-purple-800 dark:checked:after:purple-800 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                              type="checkbox"
                              role="switch"
                              onChange={changeUserFigure}
                              id="flexSwitchCheckDefault"/>
                          <label
                              className="inline-block pl-[0.15rem] hover:cursor-pointer text-black dark:text-white"
                              htmlFor="flexSwitchCheckDefault">
                            Opção 1
                          </label>
                        </div>

                    </div>

                </div>

              </div>
            </div>
            <div className="w-full md:w-2/4 px-4 mb-8">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md p-4">
                {/* Card Content */}
                <h2 className="text-xl font-semibold mb-2 dark:text-white">Visualização</h2>
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
                      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-2">Emblemas</h2>
                        <div className="badge-container">
                          {emblemas.map((badge) => (
                              <div key={badge.code} className="badge-item">
                                <img
                                    data-tippy-content={badge.name}
                                    style={{ display: "inline-block"}}
                                    key={badge.code}
                                    src={`https://images.habbo.com/c_images/album1584/${badge.code}.png`}
                                    alt={badge.code}
                                    className="badge-image hover:opacity-75"
                                    title={badge.name}
                                />
                              </div>
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

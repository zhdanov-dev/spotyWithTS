import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import { ClientId, ClientSecret } from './Client';
import { GenreAndPlaylist } from './components/GenreAndPlaylist';
import { Tracks } from './components/Tracks';
import useThemeMode from './hooks/useThemeMode';
import { lightTheme, darkTheme } from './styles/themes';
import { ThemeProvider } from 'styled-components';
import ThemeContext from './ThemeContext';
import GlobalStyle from './styles/global';
import TogglerButton from './components/TogglerButton';


const App: React.FC = () => {

  const { theme, themeToggler } = useThemeMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  
  const [collum, setCollum] = useState<string>('');
  const collumRef = useRef<string>(collum);
  collumRef.current = collum;

  const [flag, setFlag] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');  
  const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
  const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
  const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});

  const error = (error: any): void => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
    if (error.request) {
      console.log(error.request);
    }
  }

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(ClientId + ':' + ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .catch(error)
    .then(tokenResponse => {      
      if (tokenResponse) {
        setToken(tokenResponse.data.access_token);
        axios('https://api.spotify.com/v1/browse/categories?locale=sv_RU', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .catch(error)
      .then (genreResponse => {        
        if (genreResponse) {
          setGenres({
            selectedGenre: genres!.selectedGenre,
            listOfGenresFromAPI: genreResponse.data.categories.items,
          })
        }
      });
      }
    });
  }, [genres!.selectedGenre, ClientId, ClientSecret]); 

  const GenreChanged = (value: string): void => {
    setTimeout(() => {
      if (collum === '') setCollum(() => 'two__collum');
    });
    setGenres({
      selectedGenre: value, 
      listOfGenresFromAPI: genres!.listOfGenresFromAPI
    });

    axios(`https://api.spotify.com/v1/browse/categories/${value}/playlists?limit=10`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .catch(error)
    .then(playlistResponse => {
      if (playlistResponse) {
        setPlaylist({
          selectedPlaylist: playlist!.selectedPlaylist,
          listOfPlaylistFromAPI: playlistResponse.data.playlists.items
        })
      }
    });
  }

  const buttonClicked = (value: string): void => {
    setTimeout(() => {
      setCollum(() => 'three__collum');
    });
    setPlaylist({
      selectedPlaylist: value,
      listOfPlaylistFromAPI: playlist!.listOfPlaylistFromAPI
    });

    axios(`https://api.spotify.com/v1/playlists/${value}/tracks?limit=10`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
    .catch(error)
    .then(tracksResponse => {
      if(tracksResponse) {
        setTracks({
          selectedTrack: tracks!.selectedTrack,
          listOfTracksFromAPI: tracksResponse.data.items
        })
      }
    });
  }

  const isActive = (): string => {
    if (collumRef.current === 'two__collum') return 'main__section ' + collum;
    else if (collumRef.current === 'three__collum') return 'main__section ' + collum;
    else return 'main__section';
  }

  const hello = (): string => {
    if (flag) return 'hello__hidden';
    else return 'hello';
  }

  const collums = (): string => {
    if (flag) return 'collum';
    else return 'collum collum__hidden';
  }

  const handleClick = (): void => {
    setFlag(true);
  }
  
  return (
    <div className='app'>
        <div className="main__container">
          <div className={isActive()}>
            <header className="main__header">
              <div className="main__logo">
                <a className="logo__link link__decoration" href="/">
                  <p className="text__logo">SpotifyStats</p>
                </a>          
              </div>
              <nav className="header__nav">
                <a className="header__link hover__link link__decoration" href="/">Треки</a>
                <a className="header__link hover__link link__decoration" href="/">Исполнители</a>
                <a className="header__link hover__link link__decoration" href="/">Жанры</a>
                <a className="header__link hover__link link__decoration" href="/">История</a>
              </nav>
              <div className="theme__acc">
                <div className="theme__icon">
                <ThemeContext>
                    <ThemeProvider theme={themeMode}>
                      <GlobalStyle />
                        <TogglerButton themeToggler={themeToggler} />
                    </ThemeProvider>
                  </ThemeContext>
                </div>
                <div className="main__account hover__link">Аккаунт</div>
              </div>
            </header>
            <div className={hello()}>
              <h1>
                Привет!<br />
              </h1>
              <h2>
                Функционал связаный с авторизацией сейчас недоступен.<br />
                Вы можете подобрать себе плейлист по жанру!<br />
                Для этого: выберете жанр, затем выберете плейлист и вуаля, у Вас есть список треков.
              </h2>
              <div onClick={handleClick} className="start">Let's Go!</div>
            </div>
		          <GenreAndPlaylist collums={collums} items={genres!.listOfGenresFromAPI} selectedValue={genres!.selectedGenre} onClick={GenreChanged} />
		          <GenreAndPlaylist collums={collums} items={playlist!.listOfPlaylistFromAPI} selectedValue={playlist!.selectedPlaylist} onClick={buttonClicked}  />
		          <Tracks collums={collums} items={tracks!.listOfTracksFromAPI} />                          
          </div>
        </div>
        <hr className="hr" />
        <footer className="footer">
          <div className="footer__content">© 2022 - SpotifyStats</div>
        </footer>
      </div>
  );
}

export default App;

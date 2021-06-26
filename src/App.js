import React, { useState, useRef, useEffect } from 'react';
import Qs from 'querystring';
import $ from 'jquery';
import axios from 'axios';
import * as _ from "lodash";
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import './App.css';
import smallblank from './smallblank.png';
import cross from "./cross.png";
import { config, debugPort, title } from 'process';
import { username, password } from './credentials';
import { slice } from 'lodash';
import { SSL_OP_NO_COMPRESSION, SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

let initAlbums = {
  'row1': {
    isHidden: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      hideCol: false,
  }),
},
  'row2': {
    isHidden: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      hideCol: false,
  }),
},
  'row3': {
    isHidden: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      hideCol: false,
  }),
},
  'row4': {
    isHidden: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      hideCol: false,
  }),
},
  'row5': {
    isHidden: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      hideCol: false,
  }),
},
  'row6': {
    isHidden: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      hideCol: false,
  }),
},
  'row7': {
    isHidden: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      hideCol: false,
  }),
},
  'row8': {
    isHidden: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      hideCol: false,
  }),
},
  'row9': {
    isHidden: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      hideCol: false,
  }),
},
  'row10': {
    isHidden: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      hideCol: false,
  }),
},
}

// console.log(initAlbums['row1']['cols'])
// initAlbums['row1']['cols'].splice(9,1,{
//   src: smallblank,
//   alt: "",
//   hideCol: true,
// });
// initAlbums['row2']['cols'].splice(9,1,{
//   src: smallblank,
//   alt: "",
//   hideCol: true,
// });
// initAlbums['row3']['cols'].splice(9,1,{
//   src: smallblank,
//   alt: "",
//   hideCol: true,
// });
// initAlbums['row4']['cols'].splice(9,1,{
//   src: smallblank,
//   alt: "",
//   hideCol: true,
// });
// initAlbums['row5']['cols'].splice(9,1,{
//   src: smallblank,
//   alt: "",
//   hideCol: true,
// });
// initAlbums['row6']['cols'].splice(9,1,{
//   src: smallblank,
//   alt: "",
//   hideCol: true,
// });
// initAlbums['row7']['cols'].splice(9,1,{
//   src: smallblank,
//   alt: "",
//   hideCol: true,
// });
// initAlbums['row8']['cols'].splice(9,1,{
//   src: smallblank,
//   alt: "",
//   hideCol: true,
// });
// initAlbums['row9']['cols'].splice(9,1,{
//   src: smallblank,
//   alt: "",
//   hideCol: true,
// });
// initAlbums['row10']['cols'].splice(9,1,{
//   src: smallblank,
//   alt: "",
//   hideCol: true,
// });

// console.log(initAlbums);

const initTitles = {
  row1: new Array(10).fill(""),
  row2: new Array(10).fill(""),
  row3: new Array(10).fill(""),
  row4: new Array(10).fill(""),
  row5: new Array(10).fill(""),
  row6: new Array(10).fill(""),
  row7: new Array(10).fill(""),
  row8: new Array(10).fill(""),
  row9: new Array(10).fill(""),
  row10: new Array(10).fill(""),
};

function App() {

  const [ albums, setAlbums ] = useState(initAlbums);
  const [ showSearch, setShowSearch ] = useState('none');
  const [ selected, setSelected ] = useState(null);
  const [ term, setTerm ] = useState("");
  const [ country, setCountry ] = useState("us");
  const [ searchResult, setSearchResult ] = useState([]);
  const [ showAlbumTitle, setShowAlbumTitle ] = useState(false);
  const [ showOptions, setShowOptions ] = useState('none');
  const [ backgroundColor, setBackgroundColor ] = useState("#000");
  const [ rows, setRows ] = useState(10);
  const [ columns, setColumns] = useState(10);
  const [ albumWidth, setAlbumWidth ] = useState("10%");
  const [ titles, setTitles ] = useState(initTitles);
  const [ topConHeight, setTopConHeight ] = useState('95vw');
  const [ row1Cols, setRow1Cols ] = useState(10);
  const [ row2Cols, setRow2Cols ] = useState(10);
  const [ row3Cols, setRow3Cols ] = useState(10);
  const [ row4Cols, setRow4Cols ] = useState(10);
  const [ row5Cols, setRow5Cols ] = useState(10);
  const [ row6Cols, setRow6Cols ] = useState(10);
  const [ row7Cols, setRow7Cols ] = useState(10);
  const [ row8Cols, setRow8Cols ] = useState(10);
  const [ row9Cols, setRow9Cols ] = useState(10);
  const [ row10Cols, setRow10Cols ] = useState(10);
  const [ curTopsterStyle, setCurTopsterStyle ] = useState("10x10");
  const topStyles = useRef({
    "10x10": 'repeat(10, 1fr)',
    "42": "calc(95vw/5) calc(95vw/5) calc(95vw/6) calc(95vw/6) calc(95vw/10) calc(95vw/10)",
  })


  const handleClickTopster = (e) => {
    e.preventDefault();
    if (showSearch === 'none') {
      setShowSearch('');
      setSelected(e.target.id);
      // console.log(e.target.id);
    }
    
  }

  const handleClickAlbum = (e) => {
    // console.log('handle click album');
    let selectedRow = null;
    let selectedCol = null;

    if (selected.slice(0, 5) === "row10") {
      selectedRow = selected.slice(0, 5);
      selectedCol = Number.parseInt(selected.slice(6));
    }
    else {
      selectedRow = selected.slice(0, 4);
      selectedCol = Number.parseInt(selected.slice(5));
    }

    const newAlbums = _.assign({}, albums);  
    // console.log(selectedRow);
    // console.log(selectedCol);
    // console.log(newAlbums[selectedRow].cols[selectedCol]);
    newAlbums[selectedRow].cols.splice(selectedCol, 1, { src: e.target.src, alt: e.target.alt, hideCol: false });

    setAlbums(newAlbums);

    const newTitles = {...titles};
    newTitles[selectedRow][selectedCol] = e.target.alt;
    setTitles(newTitles);
    // console.log('topster updated');

    setSelected(null);
    setShowSearch('none');
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // console.log(term);
    const trimTerm = term.trim();
    if (trimTerm.slice(0, 4) === 'http') {
      const artists = window.prompt('아티스트명을 입력해주세요.');
      const albumName = window.prompt('앨범명을 입력해주세요.');

      const arr = [{
        artists: [{ name: '' }],
        name: '',
        images: [{ url: smallblank }],
        id: '00000',
      },
      {
        artists: [{ name: artists }],
        name: albumName,
        images: [{ url: trimTerm }],
        id: '99999',
      }
    ]
    setSearchResult(arr);
    return;
    }
    const queryTerm = trimTerm.replace(" ", "+");
    
    // const ITUNES_API = `https://itunes.apple.com/search?term=${queryTerm}&country=${country}&media=music&entity=album&callback=jsonpcallback`;

    // query itunes api
    // $.ajax({
    //   url: 'https://itunes.apple.com/search',
    //   crossDomain: true,
    //   dataType: 'jsonp',
    //   data: {
    //     term: queryTerm,
    //     country: country,
    //     // media: 'music',
    //     entity: 'album',
    //     limit: 100,
    //     explicit: 'No'
    //   },
    //   method: 'GET',
    //   success: function(data){
    //     console.log(data);
    //     const { results } = data;
    //     const arr = [{
    //       collectionId: '000000',
    //       collectionName: '',
    //       artistName: '',
    //       artworkUrl100: smallblank,
    //     }, ...results]
    //     setSearchResult(arr);
    //   }
    // });

    // query spotify api 
    const authConfig = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: { 
        // 'Authorization': 'Basic MDY0YzVhODRkODFhNDkwNDg2NjA4ODNmMGI0ZmVlNTI6OTIxZjFiNzE4NDE2NGE4Nzk4ZDdkNDNiMWFkZWY0YmM=', 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: Qs.stringify({ 'grant_type': 'client_credentials' }),
      auth: {
        username: username,
        password: password,
      },
      withCredentials: true
  }

    axios(authConfig)
    .then(res => {
      const api1 = `https://api.spotify.com/v1/search/?q=album:${queryTerm}%20OR%20artist:${queryTerm}&type=album&market=${country}&limit=50`;
      const api2 = `https://api.spotify.com/v1/search/?q=${queryTerm}&type=album&market=${country}&limit=50`;
      // console.log(res.data);
      const { access_token } = res.data;
      const queryConfig = {
        method: 'get',
        url: api2,
        headers: { 
          'Authorization': `Bearer ${access_token}`
        }
      };

      axios(queryConfig)
      .then(res => {
        // console.log(res.data);
        const { albums: { items } } = res.data;
        const arr = [{
          artists: [{ name: '' }],
          name: '',
          images: [{ url: smallblank }],
          id: '00000',
        }, ...items]
        setSearchResult(arr);
      })
    })
    .catch(err => console.warn(err));

  }

  useEffect(() => {
    console.log(curTopsterStyle);
  }, [])

  // const ImgWithCaption = (props) => (
  //   <figure className="figure" style={{...props.style, width: albumWidth }}>
  //     <img id={props.id} src={props.src} alt={props.alt} onClick={handleClickTopster}/>
  //     {/* {showAlbumTitle ? <figcaption>{props.alt}</figcaption> : <></>} */}
  //   </figure>)

  // const handleColumns = (curColumns) => {
  //   // const docRows = Array.from(document.getElementsByClassName('row'));
  //   // // const showingRows = docRows.filter(row => row.style.display === '');
  //   // docRows.forEach((arow) => {
  //   //   const showingColumns = Array.from(arow.children).filter(acolumn => acolumn.style.display === '');
  //   let newAlbums = { ...albums };
  //   const showingColumns = newAlbums.row1.cols.filter(album => album.hideCol === false);

  //     if (curColumns === showingColumns.length) {
  //       return
  //     }
  //     else if (curColumns > showingColumns.length) {
  //       // 새로운 칼럼이 기존보다 더 많을 경우
  //       for (let row of Object.values(newAlbums)) {
  //         for (let i = showingColumns.length; i < curColumns; i++) {
  //           row[i].hideCol = '';
  //         }

  //       }
  //     }
  //     else {
  //       // 새로운 칼럼이 기존보다 더 적을 경우
  //       // for (let row of Object.values(newAlbums)) {
  //       //   for (let i = curColumns; i < showingColumns.length; i++) {
  //       //     row[i].hideCol = 'none';
  //       //   }
  //       // }
  //       // for (let key of _.keys(albums)) {
  //       //   // const toUpdate = _.takeRight(newAlbums[key].cols, diff);
  //       //   // const updated = toUpdate.map(each => {
  //       //   //   const newOne = { ...each, hideCol: true };
  //       //   //   return newOne
  //       //   // })
  //       //   // const dropped = _.dropRight(newAlbums[key], diff);
  //       //   // const merged = _.concat(dropped, updated);
  //       //   // newAlbums[key].cols = merged;
  
  //       //   // const last = _.nth(newAlbums[key].cols);
  //       //   // console.log(last);
  //       //   // last.hideCol = true;
  //       //   // newAlbums[key].cols.splice(newAlbums[key].cols.length - 1, 1, last);
  //       //   newAlbums[key].cols[showingColumns.length - 1].hideCol = true;
  //       // }
  //       setAlbums(newAlbums);
  //       console.log(newAlbums);
  //     }
  //   // })
    
  // }

  // const handleRows = (curRows) => {
  //   const topCon = document.getElementById('topCon');
  //   const showingRows = Array.from(topCon.children).filter(arow => arow.style.display === '');
  //   if (curRows === showingRows.length) {
  //     return
  //   }
  //   else if (curRows > showingRows.length) {
  //     // 새로운 로우가 기존보다 많을 경우
  //     for (let i = showingRows.length; i < curRows; i++) {
  //       topCon.children[i].style.display = '';
  //     }
  //   }
  //   else {
  //     // 새로운 로우가 기존보다 적을 경우 
  //     for (let i = curRows; i < showingRows.length; i++) {
  //       topCon.children[i].style.display = 'none';
  //     }
  //   }
  // }
  const getExtenedHeight = (gridtemplaterow) => {
    const heights = gridtemplaterow.split(' ');
    const viewportWidth = window.innerWidth;
    const viewportRatios = _.map(heights, height => {
      return viewportWidth * Number.parseFloat(height.slice(5,9)) / 100; 
    })
    const tentimes = _.map(viewportRatios, viewportRatio => 10 * viewportRatio + 'px');
    return tentimes.join(" ");
  }

  const handleSave = () => {
    const mainCon = document.getElementById('mainContainer');
    const topCon = document.getElementById('topCon');
    const titleContainer = document.getElementById('titleContainer');
    const gridStyle = topCon.style.gridTemplateRows;
    if (curTopsterStyle === "42") {
      const extendedStyle = getExtenedHeight(gridStyle);
      topCon.style.gridTemplateRows = extendedStyle;
    }
    const topConWidth = topCon.offsetWidth;
    topCon.style.width = topCon.offsetWidth * 10 + 'px';
    topCon.style.height = curTopsterStyle === "42" ? topCon.offsetHeight * 9.5 + 'px' : topCon.offsetHeight * 10 + 'px';
    topCon.style.padding = '25vw';

    titleContainer.style.width = topConWidth * 10 + 'px';
    titleContainer.style.padding = '25vw';
    titleContainer.style.fontSize = '5em';

    const options = {
      pixelRatio: 1,
    }
    htmlToImage.toBlob(mainCon, options)
    .then(blob => {
      saveAs(blob, 'topster-mobile.png');
      topCon.style.gridTemplateRows = gridStyle;
      topCon.style.width = '95vw';
      topCon.style.height = '95vw';
      topCon.style.padding = '2.5vw';
      titleContainer.style.width = '95vw';
      titleContainer.style.fontSize = '.5em';
      titleContainer.style.padding = '2.5vw';
    })
    .catch(err => console.warn(err));
  }

  const handleSetGrid = (curRows, curColumns) => {
    // console.log('handling set grid');
    
    let newAlbums = { ...albums };
    const showingColumns = newAlbums.row1.cols.filter(album => album.hideCol === false);

    const hideCol = (row, differ) => {
      const theRow = newAlbums[row];
      const toUpdate = _.takeRight(theRow.cols, differ);
      // console.log(toUpdate);
     
      const updated = _.map(toUpdate, each => ({ ...each, hideCol: true}));
      const dropped = _.dropRight(theRow.cols, differ);
      // console.log(dropped);
      const merged = _.concat(dropped, updated);
      newAlbums[row].cols = merged;

    }
    
    const showCol = (row, differ) => {
      const theRow = newAlbums[row];
      const toUpdate = _.take(theRow.cols, differ);
      console.log(toUpdate);

      const updated = _.map(toUpdate, each => ({ ...each, hideCol: false}));
      const dropped = _.drop(theRow.cols, differ);
      console.log(dropped);
      const merged = _.concat(updated, dropped);
      newAlbums[row].cols = merged;  
    }

    if (curColumns === showingColumns.length) {
      
    }
    else if (curColumns > showingColumns.length) {
      // 새로운 칼럼이 기존보다 더 많을 경우
   
      const diff = curColumns;
      showCol('row1', diff);
      showCol('row2', diff);
      showCol('row3', diff);
      showCol('row4', diff);
      showCol('row5', diff);
      showCol('row6', diff);
      showCol('row7', diff);
      showCol('row8', diff);
      showCol('row9', diff);
      showCol('row10', diff);
      console.log(newAlbums);
    }
    else {
      
      // 새로운 칼럼이 기존보다 더 적을 경우
      
      const diff = 10 - curColumns;
      console.log(albums);
  
      console.log(newAlbums);
      hideCol('row1', diff);
      hideCol('row2', diff);
      hideCol('row3', diff);
      hideCol('row4', diff);
      hideCol('row5', diff);
      hideCol('row6', diff);
      hideCol('row7', diff);
      hideCol('row8', diff);
      hideCol('row9', diff);
      hideCol('row10', diff);
      console.log(newAlbums);
    }
    // columns 조정이 끝난 후 row의 그리드를 수정
    const allRows = document.getElementsByClassName('row');
    const changeGridColumnNumber = (row) => {
      row.style.gridTemplateColumns = `repeat(${curColumns}, 1fr)`;
    }
    _.forEach(allRows, changeGridColumnNumber);

    console.log('handling rows');

    let count = 0;
    for (let row of Object.values(newAlbums)) {
      if (row.isHidden === false) {
        count += 1;
      }
    }

    console.log(count);
    console.log(curRows);

    if (curRows === count) {
      
    }
    else if (curRows > count) {
      // 새로운 로우가 기존보다 많을 경우
      Object.keys(newAlbums).forEach((key, index) => {
        if (index < curRows) {
          newAlbums[key].isHidden = false;
        }
      })
    }
    else {
      // 새로운 로우가 기존보다 적을 경우
      Object.keys(newAlbums).forEach((key, index) => {
        if (index >= curRows) {
          newAlbums[key].isHidden = true;
        }
      })
    }
    // 탑스터 컨테이너를 가져와서 row를 수정 
    const newImgWidth = `${Math.floor(95 / curColumns)}%`;
    const topCon = document.getElementById('topCon');
    topCon.style.gridTemplateRows = `repeat(${curRows}, 1fr)`;
    const topHeight = Number.parseFloat(Number.parseInt(curRows) * Math.floor(95 / curColumns));
    const newTopConHeight = `${topHeight}vw`;
    setTopConHeight(newTopConHeight);
    // console.log(newAlbums);
    setAlbums(newAlbums);

    // console.log(curColumns);
    // console.log(newImgWidth);
    setAlbumWidth(newImgWidth);
  }

  const handleShowOptions = () => {
    if (showOptions === '') {
      setShowOptions('none');
    }
    else {
      setShowOptions('');
    }
  }

  const handleDoubleClick = (e) => {
    const img = e.target;
    img.src = smallblank;
    img.alt = "";
  }

  const handleShowTitles = (albums) => {
    const showingRows = _.filter(albums, row => row.isHidden === false);
    const titles = [];
    _.forEach(showingRows, (rowData, rowname) => {
      _.forEach(rowData.cols, (albumData) => {
        if (!albumData.hideCol ) {
          titles.push(albumData.alt);
        }
      })
    })
    const titleLists = _.map(titles, (title, key)=> {
      const listElement = document.createElement('li');
      listElement.textContent = title;
      return listElement;
    })
    console.log(titleLists);
    return titleLists;
  }

  return (
    <div className="App">
      <button onClick={handleShowOptions}>Options</button>
      <button onClick={handleSave}>Save</button>
      {/* 탑스터  */}
      <div id="mainContainer">
      <div id="topCon" className="topCon" style={{ backgroundColor: backgroundColor, height: topConHeight, gridTemplateRows: topStyles.current[curTopsterStyle],  rowGap: curTopsterStyle === '42' ? '' : '1%', }}>
        <div className="row" id="row1" style={{ gridTemplateColumns: `repeat(${row1Cols}, 1fr)` ,display: albums['row1'].isHidden ? 'none' : ''}}>
          {albums['row1']['cols'].map((album, index) => {
            return (<div key={`row1-${index}`} style={{ display: album.hideCol ? 'none' : 'block', backgroundImage: `url(${album.src})` }}  id={`row1-${index}`} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row2" style={{ gridTemplateColumns: `repeat(${row2Cols}, 1fr)` ,display: albums['row2'].isHidden ? 'none' : ''}}>
          {albums['row2']['cols'].map((album, index) => {
            return (<div key={`row2-${index}`} style={{ display: album.hideCol ? 'none' : 'block', backgroundImage: `url(${album.src})` }}  id={`row2-${index}`} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row3" style={{ gridTemplateColumns: `repeat(${row3Cols}, 1fr)` ,display: albums['row3'].isHidden ? 'none' : ''}}>
          {albums['row3']['cols'].map((album, index) => {
            return (<div key={`row3-${index}`} style={{ display: album.hideCol ? 'none' : 'block', backgroundImage: `url(${album.src})` }}  id={`row3-${index}`} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row4" style={{ gridTemplateColumns: `repeat(${row4Cols}, 1fr)` ,display: albums['row4'].isHidden ? 'none' : ''}}>
          {albums['row4']['cols'].map((album, index) => {
            return (<div key={`row4-${index}`} style={{ display: album.hideCol ? 'none' : 'block', backgroundImage: `url(${album.src})` }}  id={`row4-${index}`} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row5" style={{ gridTemplateColumns: `repeat(${row5Cols}, 1fr)` ,display: albums['row5'].isHidden ? 'none' : ''}}>
          {albums['row5']['cols'].map((album, index) => {
            return (<div key={`row5-${index}`} style={{ display: album.hideCol ? 'none' : 'block', backgroundImage: `url(${album.src})` }}  id={`row5-${index}`} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row6" style={{ gridTemplateColumns: `repeat(${row6Cols}, 1fr)` ,display: albums['row6'].isHidden ? 'none' : ''}}>
          {albums['row6']['cols'].map((album, index) => {
            return (<div key={`row6-${index}`} style={{ display: album.hideCol ? 'none' : 'block', backgroundImage: `url(${album.src})` }} id={`row6-${index}`} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row7" style={{ gridTemplateColumns: `repeat(${row7Cols}, 1fr)` ,display: albums['row7'].isHidden ? 'none' : ''}}>
          {albums['row7']['cols'].map((album, index) => {
            return (<div key={`row7-${index}`} style={{ display: album.hideCol ? 'none' : 'block', backgroundImage: `url(${album.src})` }} id={`row7-${index}`} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row8" style={{ gridTemplateColumns: `repeat(${row8Cols}, 1fr)` ,display: albums['row8'].isHidden ? 'none' : ''}}>
          {albums['row8']['cols'].map((album, index) => {
            return (<div key={`row8-${index}`} style={{ display: album.hideCol ? 'none' : 'block', backgroundImage: `url(${album.src})` }} id={`row8-${index}`} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row9" style={{ gridTemplateColumns: `repeat(${row9Cols}, 1fr)` ,display: albums['row9'].isHidden ? 'none' : ''}}>
          {albums['row9']['cols'].map((album, index) => {
            return (<div key={`row9-${index}`} style={{ display: album.hideCol ? 'none' : 'block', backgroundImage: `url(${album.src})` }} id={`row9-${index}`} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row10" style={{ gridTemplateColumns: `repeat(${row10Cols}, 1fr)` ,display: albums['row10'].isHidden ? 'none' : ''}}>
          {albums['row10']['cols'].map((album, index) => {
            return (<div key={`row10-${index}`} style={{ display: album.hideCol ? 'none' : 'block', backgroundImage: `url(${album.src})` }} id={`row10-${index}`} onClick={handleClickTopster}/>)
            })}
        </div>
      </div>
      <div id="titleContainer" style={{ display: showAlbumTitle ? '' : 'none' }}>
          <ul id="titleUnorderedlist">
            {titles['row1'].map((title,index) => {
              return title.length !== 0 ? (<li key={`row1-${index}-title`} >{title}</li>) : null})}
            <br></br>
            {titles['row2'].map((title,index) => {
              return title.length !== 0 ? (<li key={`row2-${index}-title`} >{title}</li>) : null})}
            <br></br>
            {titles['row3'].map((title,index) => {
              return title.length !== 0 ? (<li key={`row3-${index}-title`} >{title}</li>) : null})}
            <br></br>
            {titles['row4'].map((title,index) => {
              return title.length !== 0 ? (<li key={`row4-${index}-title`} >{title}</li>) : null})}
            <br></br>
            {titles['row5'].map((title,index) => {
              return title.length !== 0 ? (<li key={`row5-${index}-title`} >{title}</li>) : null})}
            <br></br>
            {titles['row6'].map((title,index) => {
              return title.length !== 0 ? (<li key={`row6-${index}-title`} >{title}</li>) : null})}
            <br></br>
            {titles['row7'].map((title,index) => {
              return title.length !== 0 ? (<li key={`row7-${index}-title`} >{title}</li>) : null})}
            <br></br>
            {titles['row8'].map((title,index) => {
              return title.length !== 0 ? (<li key={`row8-${index}-title`} >{title}</li>) : null})}
            <br></br>
            {titles['row9'].map((title,index) => {
              return title.length !== 0 ? (<li key={`row9-${index}-title`} >{title}</li>) : null})}
            <br></br>
            {titles['row10'].map((title,index) => {
              return title.length !== 0 ? (<li key={`row10-${index}-title`} >{title}</li>) : null})}
            {/* {handleShowTitles(albums)} */}
          </ul>
        </div>
      </div>
      
      <div style={{ display: showOptions }}>
        <input type="checkbox" checked={showAlbumTitle} onChange={(e) => {
          setShowAlbumTitle(!showAlbumTitle);
          }}/>
        <label>show album titles </label>
        <br></br>
        <label>BackgroundColor: </label>
        <input type="text" placeholder="#HEX color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)}/>
        <label>#HEX</label>
        <br></br>
        <label>rows</label>
        <input type="range" min="1" max="10" value={rows} onChange={e => {
          setRows(Number.parseInt(e.target.value))
          e.preventDefault();
          }}/><span>{rows}</span>
        <br></br>
        <label>columns</label>
        <input type="range" min="1" max="10" value={columns} onChange={e => {
          setColumns(Number.parseInt(e.target.value));
          e.preventDefault();
          }}/><span>{columns}</span>
          <br></br>
        <button onClick={(e) => {
          handleSetGrid(rows, columns)
          e.preventDefault();
          }}>SetGrid</button>
        <button onClick={(e) => {
          setCurTopsterStyle("42");
          setTopConHeight('93vw');
          setRows(6);
          setRow1Cols(5);
          setRow2Cols(5);
          setRow3Cols(6);
          setRow4Cols(6);
          setRow5Cols(10);
          setRow6Cols(10);
          e.preventDefault();
          }}>Set42</button>
        <button onClick={(e) => {
            handleSetGrid(10, 10);
            setRows(10);
            setColumns(10);
            setTopConHeight('95vw');
            setCurTopsterStyle('10x10');
            setRow1Cols(10);
            setRow2Cols(10);
            setRow3Cols(10);
            setRow4Cols(10);
            e.preventDefault();
          }}>reset</button>

          <div id="columnController">
            <p>행별 개수 조절하기↓</p>
            <p style={{ fontSize: '.8em' }}>반드시 그리드 조절 후 해주시기 바랍니다.</p>
            <div className="columnControl" style={{ width: '100vw', display: 'grid', gridTemplateRows: 'repeat(2, 1fr)', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                <p>row1</p>
                <p>row2</p>
                <p>row3</p>
                <p>row4</p>
                <p>row5</p>
                <div>
                  <input type="text" value={row1Cols} onChange={ e => setRow1Cols(e.target.value)}/>
                </div>
                <div>
                  <input type="text" value={row2Cols} onChange={ e => setRow2Cols(e.target.value)}/>
                </div>
                <div>
                  <input type="text" value={row3Cols} onChange={ e => setRow3Cols(e.target.value)}/>
                </div>
                <div>
                  <input type="text" value={row4Cols} onChange={ e => setRow4Cols(e.target.value)}/>
                </div>
                <div>
                  <input type="text" value={row5Cols} onChange={ e => setRow5Cols(e.target.value)}/>
                </div>
                <p>row6</p>
                <p>row7</p>
                <p>row8</p>
                <p>row9</p>
                <p>row10</p>
                <div>
                  <input type="text" value={row6Cols} onChange={ e => setRow6Cols(e.target.value)}/>
                </div>
                <div>
                  <input type="text" value={row7Cols} onChange={ e => setRow7Cols(e.target.value)}/>
                </div>
                <div>
                  <input type="text" value={row8Cols} onChange={ e => setRow8Cols(e.target.value)}/>
                </div>
                <div>
                  <input type="text" value={row9Cols} onChange={ e => setRow9Cols(e.target.value)}/>
                </div>
                <div>
                  <input type="text" value={row10Cols} onChange={ e => setRow10Cols(e.target.value)}/>
                </div>
            </div>
          </div>
      </div>
         {/* 검색창  */}
      <div id="framecontainer" style={{ display: showSearch, position: 'absolute', width: '100%', top: '20px', left: 0, backgroundColor: 'rgba(189, 229, 237, .9)', overflow: 'auto'}}>
        <img src={cross} alt="cross" onClick={() => setShowSearch('none')}/>
        <div id="formcontainer">
          <form action="" method="get" acceptCharset="utf-8" id="iTunesSearchForm" onSubmit={handleSubmit}>
	  	      <input type="text" className="text" name="term" id="term" onChange={(e) => {
              setTerm(e.target.value);
              }}/>
              <br></br>
	  	      <select name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
                  <option value="us">United States of America</option>
                  <option value="gb">United Kingdom</option>
                  <option value="al">Albania</option>
                  <option value="dz">Algeria</option>
                  <option value="ao">Angola</option>
                  <option value="ai">Anguilla</option>
                  <option value="ag">Antigua and Barbuda</option>
                  <option value="ar">Argentina</option>
                  <option value="am">Armenia</option>
                  <option value="au">Australia</option>
                  <option value="at">Austria</option>
                  <option value="az">Azerbaijan</option>
                  <option value="bs">Bahamas</option>
                  <option value="bh">Bahrain</option>
                  <option value="bb">Barbados</option>
                  <option value="by">Belarus</option>
                  <option value="be">Belgium</option>
                  <option value="bz">Belize</option>
                  <option value="bj">Benin</option>
                  <option value="bm">Bermuda</option>
                  <option value="bt">Bhutan</option>
                  <option value="bo">Bolivia</option>
                  <option value="bw">Botswana</option>
                  <option value="br">Brazil</option>
                  <option value="vg">British Virgin Islands</option>
                  <option value="bn">Brunei Darussalam</option>
                  <option value="bg">Bulgaria</option>
                  <option value="bf">Burkina-Faso</option>
                  <option value="kh">Cambodia</option>
                  <option value="ca">Canada</option>
                  <option value="cv">Cape Verde</option>
                  <option value="ky">Cayman Islands</option>
                  <option value="td">Chad</option>
                  <option value="cl">Chile</option>
                  <option value="cn">China</option>
                  <option value="co">Colombia</option>
                  <option value="cr">Costa Rica</option>
                  <option value="hr">Croatia</option>
                  <option value="cy">Cyprus</option>
                  <option value="cz">Czech Republic</option>
                  <option value="cg">Democratic Republic of the Congo</option>
                  <option value="dk">Denmark</option>
                  <option value="dm">Dominica</option>
                  <option value="do">Dominican Republic</option>
                  <option value="ec">Ecuador</option>
                  <option value="eg">Egypt</option>
                  <option value="sv">El Salvador</option>
                  <option value="ee">Estonia</option>
                  <option value="fm">Federated States of Micronesia</option>
                  <option value="fj">Fiji</option>
                  <option value="fi">Finland</option>
                  <option value="fr">France</option>
                  <option value="gm">Gambia</option>
                  <option value="de">Germany</option>
                  <option value="gh">Ghana</option>
                  <option value="gr">Greece</option>
                  <option value="gd">Grenada</option>
                  <option value="gt">Guatemala</option>
                  <option value="gw">Guinea Bissau</option>
                  <option value="gy">Guyana</option>
                  <option value="hn">Honduras</option>
                  <option value="hk">Hong Kong</option>
                  <option value="hu">Hungary</option>
                  <option value="is">Iceland</option>
                  <option value="in">India</option>
                  <option value="id">Indonesia</option>
                  <option value="ie">Ireland</option>
                  <option value="il">Israel</option>
                  <option value="it">Italy</option>
                  <option value="jm">Jamaica</option>
                  <option value="jp">Japan</option>
                  <option value="jo">Jordan</option>
                  <option value="kz">Kazakhstan</option>
                  <option value="ke">Kenya</option>
                  <option value="kg">Krygyzstan</option>
                  <option value="kw">Kuwait</option>
                  <option value="la">Laos</option>
                  <option value="lv">Latvia</option>
                  <option value="lb">Lebanon</option>
                  <option value="lr">Liberia</option>
                  <option value="lt">Lithuania</option>
                  <option value="lu">Luxembourg</option>
                  <option value="mo">Macau</option>
                  <option value="mk">Macedonia</option>
                  <option value="mg">Madagascar</option>
                  <option value="mw">Malawi</option>
                  <option value="my">Malaysia</option>
                  <option value="ml">Mali</option>
                  <option value="mt">Malta</option>
                  <option value="mr">Mauritania</option>
                  <option value="mu">Mauritius</option>
                  <option value="mx">Mexico</option>
                  <option value="md">Moldova</option>
                  <option value="mn">Mongolia</option>
                  <option value="ms">Montserrat</option>
                  <option value="mz">Mozambique</option>
                  <option value="na">Namibia</option>
                  <option value="np">Nepal</option>
                  <option value="nl">Netherlands</option>
                  <option value="nz">New Zealand</option>
                  <option value="ni">Nicaragua</option>
                  <option value="ne">Niger</option>
                  <option value="ng">Nigeria</option>
                  <option value="no">Norway</option>
                  <option value="om">Oman</option>
                  <option value="pk">Pakistan</option>
                  <option value="pw">Palau</option>
                  <option value="pa">Panama</option>
                  <option value="pg">Papua New Guinea</option>
                  <option value="py">Paraguay</option>
                  <option value="pe">Peru</option>
                  <option value="ph">Philippines</option>
                  <option value="pl">Poland</option>
                  <option value="pt">Portugal</option>
                  <option value="qa">Qatar</option>
                  <option value="tt">Republic of Trinidad and Tobago</option>
                  <option value="ro">Romania</option>
                  <option value="ru">Russia</option>
                  <option value="kn">Saint Kitts and Nevis</option>
                  <option value="lc">Saint Lucia</option>
                  <option value="vc">Saint Vincent and the Grenadines</option>
                  <option value="st">Sao Tome e Principe</option>
                  <option value="sa">Saudi Arabia</option>
                  <option value="sn">Senegal</option>
                  <option value="sc">Seychelles</option>
                  <option value="sl">Sierra Leone</option>
                  <option value="sg">Singapore</option>
                  <option value="sk">Slovakia</option>
                  <option value="si">Slovenia</option>
                  <option value="sb">Soloman Islands</option>
                  <option value="za">South Africa</option>
                  <option value="kr">South Korea</option>
                  <option value="es">Spain</option>
                  <option value="lk">Sri Lanka</option>
                  <option value="sr">Suriname</option>
                  <option value="sz">Swaziland</option>
                  <option value="se">Sweden</option>
                  <option value="ch">Switzerland</option>
                  <option value="tw">Taiwan</option>
                  <option value="tj">Tajikistan</option>
                  <option value="tz">Tanzania</option>
                  <option value="th">Thailand</option>
                  <option value="tn">Tunisia</option>
                  <option value="tr">Turkey</option>
                  <option value="tm">Turkmenistan</option>
                  <option value="tc">Turks and Caicos Islands</option>
                  <option value="ug">Uganda</option>
                  <option value="ua">Ukraine</option>
                  <option value="ae">United Arab Emirates</option>
                  <option value="gb">United Kingdom</option>
                  <option value="us">United States of America</option>
                  <option value="uy">Uruguay</option>
                  <option value="uz">Uzbekistan</option>
                  <option value="ve">Venezuela</option>
                  <option value="vn">Vietnam</option>
                  <option value="ye">Yemen</option>
                  <option value="zw">Zimbabwe</option>
	  	      </select>
            <br></br>
	  	      <input type="submit" className="submit" value="Search"/>
	        </form>
        </div>
        { 
          searchResult.length !== 0 ?
          searchResult.map(collection => <img key={collection.id} width={60} height={60} src={collection.images[0].url} alt={collection.name + ' - ' + collection.artists[0].name} onClick={handleClickAlbum}/>)
          :
          <></>
        }
      </div>
      <div style={{ marginTop: '1em' }}>
        <h5>사용방법: desktop 탑스터와 비슷합니다.</h5>
        <h5>SetGrid와 Set42는 반드시 reset후에 설정해주시기 바랍니다.</h5>
        <h5>Chrome 브라우저에서 정상 작동합니다.</h5>
        <h5>이미지를 클릭하면 새로운 앨범을 <br></br>검색하고 추가할 수 있습니다.</h5>
        <h5>문의: bldolphin96@gmail.com</h5>
      </div>
    </div>
  );
}

export default App;

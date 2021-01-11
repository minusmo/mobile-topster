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
import { config } from 'process';
import { username, password } from './credentials';

let initAlbums = {
  'row1': {
    isShow: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      showCol: false,
  }),
},
  'row2': {
    isShow: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      showCol: false,
  }),
},
  'row3': {
    isShow: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      showCol: false,
  }),
},
  'row4': {
    isShow: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      showCol: false,
  }),
},
  'row5': {
    isShow: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      showCol: false,
  }),
},
  'row6': {
    isShow: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      showCol: false,
  }),
},
  'row7': {
    isShow: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      showCol: false,
  }),
},
  'row8': {
    isShow: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      showCol: false,
  }),
},
  'row9': {
    isShow: false,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      showCol: false,
  }),
},
  'row10': {
    isShow: true,
    cols: new Array(10).fill({
      src: smallblank,
      alt: "",
      showCol: false,
  }),
},
}

// console.log(initAlbums['row1']['cols'])
initAlbums['row1']['cols'].splice(9,1,{
  src: smallblank,
  alt: "",
  showCol: true,
});
initAlbums['row2']['cols'].splice(9,1,{
  src: smallblank,
  alt: "",
  showCol: true,
});
initAlbums['row3']['cols'].splice(9,1,{
  src: smallblank,
  alt: "",
  showCol: true,
});
initAlbums['row4']['cols'].splice(9,1,{
  src: smallblank,
  alt: "",
  showCol: true,
});
initAlbums['row5']['cols'].splice(9,1,{
  src: smallblank,
  alt: "",
  showCol: true,
});
initAlbums['row6']['cols'].splice(9,1,{
  src: smallblank,
  alt: "",
  showCol: true,
});
initAlbums['row7']['cols'].splice(9,1,{
  src: smallblank,
  alt: "",
  showCol: true,
});
initAlbums['row8']['cols'].splice(9,1,{
  src: smallblank,
  alt: "",
  showCol: true,
});
initAlbums['row9']['cols'].splice(9,1,{
  src: smallblank,
  alt: "",
  showCol: true,
});
initAlbums['row10']['cols'].splice(9,1,{
  src: smallblank,
  alt: "",
  showCol: true,
});

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
  const [ rows, setRows ] = useState(9);
  const [ columns, setColumns] = useState(9);
  const [ albumWidth, setAlbumWidth ] = useState("10%");
  const [ titles, setTitles ] = useState(initTitles);

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

    const selectedRow = selected.slice(0, 4);
    const selectedCol = Number.parseInt(selected.slice(5));
    const newAlbums = _.assign({}, albums);
    
    // console.log(selectedRow);
    // console.log(selectedCol);
    // console.log(newAlbums[selectedRow].cols[selectedCol]);
    newAlbums[selectedRow].cols.splice(selectedCol, 1, { src: e.target.src, alt: e.target.alt, showCol: false });

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
  //   const showingColumns = newAlbums.row1.cols.filter(album => album.showCol === false);

  //     if (curColumns === showingColumns.length) {
  //       return
  //     }
  //     else if (curColumns > showingColumns.length) {
  //       // 새로운 칼럼이 기존보다 더 많을 경우
  //       for (let row of Object.values(newAlbums)) {
  //         for (let i = showingColumns.length; i < curColumns; i++) {
  //           row[i].showCol = '';
  //         }

  //       }
  //     }
  //     else {
  //       // 새로운 칼럼이 기존보다 더 적을 경우
  //       // for (let row of Object.values(newAlbums)) {
  //       //   for (let i = curColumns; i < showingColumns.length; i++) {
  //       //     row[i].showCol = 'none';
  //       //   }
  //       // }
  //       // for (let key of _.keys(albums)) {
  //       //   // const toUpdate = _.takeRight(newAlbums[key].cols, diff);
  //       //   // const updated = toUpdate.map(each => {
  //       //   //   const newOne = { ...each, showCol: true };
  //       //   //   return newOne
  //       //   // })
  //       //   // const dropped = _.dropRight(newAlbums[key], diff);
  //       //   // const merged = _.concat(dropped, updated);
  //       //   // newAlbums[key].cols = merged;
  
  //       //   // const last = _.nth(newAlbums[key].cols);
  //       //   // console.log(last);
  //       //   // last.showCol = true;
  //       //   // newAlbums[key].cols.splice(newAlbums[key].cols.length - 1, 1, last);
  //       //   newAlbums[key].cols[showingColumns.length - 1].showCol = true;
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

  const handleSave = () => {
    const topCon = document.getElementById('topCon');
    topCon.style.width = '1700px';

    const options = {
      pixelRatio: 1,
    }
    htmlToImage.toBlob(topCon, options)
    .then(data => {
      saveAs(data, 'topster-mobile.png');
      topCon.style.width = '100vw';
    })
    .catch(err => console.warn(err));
  }

  const handleSetGrid = (curRows, curColumns) => {
    // console.log('handling set grid');
    
    let newAlbums = { ...albums };
    const showingColumns = newAlbums.row1.cols.filter(album => album.showCol === false);

    const hideCol = (row, differ) => {
      const theRow = newAlbums[row];
      const toUpdate = _.takeRight(theRow.cols, differ);
      // console.log(toUpdate);
     
      const updated = _.map(toUpdate, each => ({ ...each, showCol: true}));
      const dropped = _.dropRight(theRow.cols, differ);
      // console.log(dropped);
      const merged = _.concat(dropped, updated);
      newAlbums[row].cols = merged;

    }
    
    const showCol = (row, differ) => {
      const theRow = newAlbums[row];
      const toUpdate = _.take(theRow.cols, differ);
      console.log(toUpdate);

      const updated = _.map(toUpdate, each => ({ ...each, showCol: false}));
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

    console.log('handling rows');

    let count = 0;
    for (let row of Object.values(newAlbums)) {
      if (row.isShow === false) {
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
          newAlbums[key].isShow = false;
        }
      })
    }
    else {
      // 새로운 로우가 기존보다 적을 경우
      Object.keys(newAlbums).forEach((key, index) => {
        if (index >= curRows) {
          newAlbums[key].isShow = true;
        }
      })
    }

    // console.log(newAlbums);
    setAlbums(newAlbums);

    // console.log(curColumns);
    const newImgWidth = `${Math.floor(95 / curColumns)}%`;
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

  return (
    <div className="App">
      <button onClick={handleShowOptions}>Options</button>
      <button onClick={handleSave}>Save</button>
      {/* 탑스터  */}
      <div id="topCon" className="topCon" style={{ backgroundColor: backgroundColor }}>
        <div className="row" id="row1" hidden={albums['row1'].isShow}>
          {albums['row1']['cols'].map((album, index) => {
            return (<img key={`row1-${index}`} hidden={album.showCol} style={{ width: albumWidth, }} id={`row1-${index}`} src={album.src} alt={album.alt} onClick={handleClickTopster}/>)
            })}
           {/* <ImgWithCaption id={0} src={albums[0].src} alt={albums[0].alt}/>
           <ImgWithCaption id={1} src={albums[1].src} alt={albums[1].alt}/>
           <ImgWithCaption id={2} src={albums[2].src} alt={albums[2].alt}/>
           <ImgWithCaption id={3} src={albums[3].src} alt={albums[3].alt}/>
           <ImgWithCaption id={4} src={albums[4].src} alt={albums[4].alt}/>
           <ImgWithCaption style={{ display: 'none' }} id={5} src={albums[5].src]} alt={albums[5].alt}/> */}
        </div>
        <div className="row" id="row2" hidden={albums['row2'].isShow}>
          {albums['row2']['cols'].map((album, index) => {
            return (<img key={`row2-${index}`} hidden={album.showCol} style={{ width: albumWidth, }} id={`row2-${index}`} src={album.src} alt={album.alt} onClick={handleClickTopster}/>)
            })}
           {/* <ImgWithCaption id={6} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={7} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={8} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={9} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={10} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption style={{ display: 'none' }} id={11} src={"/smallblank.png"} alt={""}/> */}
        </div>
        <div className="row" id="row3" hidden={albums['row3'].isShow}>
          {albums['row3']['cols'].map((album, index) => {
            return (<img key={`row3-${index}`} hidden={album.showCol} style={{ width: albumWidth, }} id={`row3-${index}`} src={album.src} alt={album.alt} onClick={handleClickTopster}/>)
            })}
           {/* <ImgWithCaption id={12} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={13} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={14} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={15} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={16} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption style={{ display: 'none' }} id={17} src={"/smallblank.png"} alt={""}/> */}
        </div>
        <div className="row" id="row4" hidden={albums['row4'].isShow}>
          {albums['row4']['cols'].map((album, index) => {
            return (<img key={`row4-${index}`} hidden={album.showCol} style={{ width: albumWidth, }} id={`row4-${index}`} src={album.src} alt={album.alt} onClick={handleClickTopster}/>)
            })}
           {/* <ImgWithCaption id={18} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={19} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={20} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={21} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={22} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption style={{ display: 'none' }} id={23} src={"/smallblank.png"} alt={""}/> */}
        </div>
        <div className="row" id="row5" hidden={albums['row5'].isShow}>
          {albums['row5']['cols'].map((album, index) => {
            return (<img key={`row5-${index}`} hidden={album.showCol} style={{ width: albumWidth, }} id={`row5-${index}`} src={album.src} alt={album.alt} onClick={handleClickTopster}/>)
            })}
           {/* <ImgWithCaption id={24} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={25} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={26} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={27} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption id={28} src={"/smallblank.png"} alt={""}/>
           <ImgWithCaption style={{ display: 'none' }} id={29} src={"/smallblank.png"} alt={""}/> */}
        </div>
        <div className="row" id="row6" hidden={albums['row6'].isShow}>
          {albums['row6']['cols'].map((album, index) => {
            return (<img key={`row6-${index}`} hidden={album.showCol} style={{ width: albumWidth, }} id={`row6-${index}`} src={album.src} alt={album.alt} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row7" hidden={albums['row7'].isShow}>
          {albums['row7']['cols'].map((album, index) => {
            return (<img key={`row7-${index}`} hidden={album.showCol} style={{ width: albumWidth, }} id={`row7-${index}`} src={album.src} alt={album.alt} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row8" hidden={albums['row8'].isShow}>
          {albums['row8']['cols'].map((album, index) => {
            return (<img key={`row8-${index}`} hidden={album.showCol} style={{ width: albumWidth, }} id={`row8-${index}`} src={album.src} alt={album.alt} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row9" hidden={albums['row9'].isShow}>
          {albums['row9']['cols'].map((album, index) => {
            return (<img key={`row9-${index}`} hidden={album.showCol} style={{ width: albumWidth, }} id={`row9-${index}`} src={album.src} alt={album.alt} onClick={handleClickTopster}/>)
            })}
        </div>
        <div className="row" id="row10" hidden={albums['row10'].isShow}>
          {albums['row10']['cols'].map((album, index) => {
            return (<img key={`row10-${index}`} hidden={album.showCol} style={{ width: albumWidth, }} id={`row10-${index}`} src={album.src} alt={album.alt} onClick={handleClickTopster}/>)
            })}
        </div>

        <div style={ showAlbumTitle ? { display: '' } : { display: 'none' } }>
          <ul>
            {titles['row1'].map((title,index) => <li key={`row1-${index}-title`} >{title}</li>)}
            <br></br>
            {titles['row2'].map((title,index) => <li key={`row2-${index}-title`} >{title}</li>)}
            <br></br>
            {titles['row3'].map((title,index) => <li key={`row3-${index}-title`} >{title}</li>)}
            <br></br>
            {titles['row4'].map((title,index) => <li key={`row4-${index}-title`} >{title}</li>)}
            <br></br>
            {titles['row5'].map((title,index) => <li key={`row5-${index}-title`} >{title}</li>)}
            <br></br>
            {titles['row6'].map((title,index) => <li key={`row6-${index}-title`} >{title}</li>)}
            <br></br>
            {titles['row7'].map((title,index) => <li key={`row7-${index}-title`} >{title}</li>)}
            <br></br>
            {titles['row8'].map((title,index) => <li key={`row8-${index}-title`} >{title}</li>)}
            <br></br>
            {titles['row9'].map((title,index) => <li key={`row9-${index}-title`} >{title}</li>)}
            <br></br>
            {titles['row10'].map((title,index) => <li key={`row10-${index}-title`} >{title}</li>)}
          </ul>
        </div>
      </div>
      <div style={{ display: showOptions }}>
        <input type="checkbox" checked={showAlbumTitle} onChange={(e) => setShowAlbumTitle(!showAlbumTitle)}/> 
        <label>album titles </label>
        <br></br>
        <label>Background: </label>
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
      </div>
         {/* 검색창  */}
      <div id="framecontainer" style={{ display: showSearch, position: 'absolute', width: '100%', top: '20px', left: 0, backgroundColor: 'transparent', overflow: 'auto'}}>
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
      <div>
        <h5>사용방법: desktop 탑스터와 비슷합니다.</h5>
        <h5>이미지를 클릭하면 새로운 앨범을 <br></br>검색하고 추가할 수 있습니다.</h5>
        <h5>문의: bldolphin96@gmail.com</h5>
      </div>
    </div>
  );
}

export default App;
